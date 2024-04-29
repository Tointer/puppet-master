// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

struct Order{
    address receiver;
    address tokenIn;
    address tokenOut;
    uint32 chainIn;
    uint32 chainOut;
    uint256 amountIn;
    uint256 minAmountOut;
    uint64 deadline;
}

contract PuppetHub is OApp {

    mapping(uint => Order) public orders;
    uint public nextOrderId;

    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) Ownable(_owner) {}

    function _lzReceive(
        Origin calldata _origin, // struct containing info about the message sender
        bytes32 _guid, // global packet identifier
        bytes calldata payload, // encoded message payload being received
        address _executor, // the Executor address.
        bytes calldata _extraData // arbitrary data appended by the Executor
    ) internal override {
        (uint orderId, uint minAmount, address token, address to, address payReceiver) = abi.decode(payload, (uint, uint, address, address, address));

        Order memory order = orders[orderId];
        bool isNotExpired = order.deadline > block.timestamp;
        bool isMinAmountSame = order.minAmountOut == minAmount;
        bool isTokenSame = order.tokenOut == token;
        bool isChainSame = order.chainOut == _origin.srcEid;
        bool isReceiverSame = order.receiver == to;

        if (isNotExpired && isMinAmountSame && isTokenSame && isChainSame && isReceiverSame) {
            IERC20(order.tokenIn).transfer(payReceiver, order.amountIn);
            delete orders[orderId];
        }

        //not reverting to not block LZ execution, resolvers should calculate possible failures
    }

     function lockAndInitiateOrder(Order memory order) public {
        IERC20(order.tokenIn).transferFrom(msg.sender, address(this), order.amountIn);
        orders[nextOrderId] = order;
        nextOrderId++;
    }

    function withdrawOrder(uint256 orderIndex) public {
        Order memory order = orders[orderIndex];
        require(order.deadline < block.timestamp, "Order not expired");
        address token = order.tokenIn; 

        IERC20(token).transfer(msg.sender, order.amountIn); //will revert if order not initialized
        delete orders[orderIndex];
    }

    function depositFor(uint _orderId, address _payReceiver, uint256 _amount, bytes calldata _lzOptions) public {
        Order memory order = orders[_orderId];
        require(order.deadline > block.timestamp, "Order expired");
        require(_amount >= order.minAmountOut, "Amount less than minAmount");

        IERC20 token = IERC20(order.tokenOut);
        token.transferFrom(msg.sender, order.receiver, _amount);

        _send(order.tokenIn, order.receiver, _payReceiver, order.chainOut, _amount, _lzOptions);

        delete orders[_orderId];
    }

    // Sends a message from the source to destination chain.
    function _send(
        address _token,
        address _from,
        address _to,
        uint32 _destId,
        uint _amount,
        bytes calldata _options
    ) internal {
        bytes memory _payload = createPayload(_token, _from, _to, _amount);
        _lzSend(
            _destId, // Destination chain's endpoint ID.
            _payload, // Encoded message payload being sent.
            _options, // Message execution options (e.g., gas to use on destination).
            MessagingFee(msg.value, 0), // Fee struct containing native gas and ZRO token.
            payable(msg.sender) // The refund address in case the send call reverts.
        );
    }

    
    function createPayload(
        address _token,
        address _from,
        address _to,
        uint amount
    ) public view returns (bytes memory) {
        return abi.encode(_token, _from, _to, amount);
    }
    
}
