// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";
//import { IOAppOptionsType3 } from "@layerzero-v2/oapp/interfaces/IOAppOptionsType3.sol";

contract TokenHolder is OApp  {
    uint32 public immutable destId;

    //token address => user address => balance
    mapping(address => mapping(address => uint)) public balances;
    mapping(bytes32 => bool) public processed;

    constructor(address _endpoint, address _owner, uint16 _destId) OApp(_endpoint, _owner) {
        destId = _destId;
    }

    function depositFor(address _token, address _to, address _payReceiver, uint256 _amount, uint _minAmount, uint _orderId, bytes calldata _lzOptions) public {
        bytes32 orderHash = keccak256(abi.encode(_orderId, _minAmount, _token));
        require(processed[orderHash] == false, "Order already processed");
        processed[orderHash] = true;

        IERC20 token = IERC20(_token);
        token.transferFrom(msg.sender, address(this), _amount);
        balances[_token][_to] += _amount;

        _send(_orderId, _minAmount, _token, _payReceiver, _lzOptions);
    }

    /* @dev Quotes the gas needed to pay for the full omnichain transaction.
    * @return nativeFee Estimated gas fee in native gas.
    * @return lzTokenFee Estimated gas fee in ZRO token.
    */
    function quote(
        uint _orderId,
        uint256 _minAmount,
        address _token,
        address _payReceiver,
        bytes32 _orderSalt,
        bytes calldata _options // Message execution options
    ) public view returns (uint256 nativeFee) {
        bytes memory _payload = createPayload(_orderId, _minAmount, _token, _payReceiver);
        MessagingFee memory fee = _quote(destId, _payload, _options, false);
        return fee.nativeFee;
    }

    // Sends a message from the source to destination chain.
    function _send(
        uint _orderId,
        uint256 _minAmount,
        address _token,
        address _payReceiver,
        bytes calldata _options
    ) internal {
        bytes memory _payload = createPayload(_orderId, _minAmount, _token, _payReceiver);
        _lzSend(
            destId, // Destination chain's endpoint ID.
            _payload, // Encoded message payload being sent.
            _options, // Message execution options (e.g., gas to use on destination).
            MessagingFee(msg.value, 0), // Fee struct containing native gas and ZRO token.
            payable(msg.sender) // The refund address in case the send call reverts.
        );
    }

    function _lzReceive(
        Origin calldata _origin, // struct containing info about the message sender
        bytes32 _guid, // global packet identifier
        bytes calldata payload, // encoded message payload being received
        address _executor, // the Executor address.
        bytes calldata _extraData // arbitrary data appended by the Executor
    ) internal override {
        //todo
    }

    function createPayload(
        uint _orderId,
        uint256 _minAmount,
        address _token,
        address _payReceiver
    ) public view returns (bytes memory) {
        return abi.encode(_orderId, _minAmount, _token, _payReceiver);
    }
}