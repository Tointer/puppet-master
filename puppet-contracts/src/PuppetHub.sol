// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";

contract PuppetHub is OApp {
    struct Order{
        address tokenIn;
        address tokenOut;
        uint32 chainIn;
        uint32 chainOut;
        uint256 amountIn;
        uint256 minAmountOut;
        uint64 deadline;
    }

    mapping(address => uint) public userOrdersIds;
    mapping(uint => Order) public orders;

    function _lzReceive(
        Origin calldata _origin, // struct containing info about the message sender
        bytes32 _guid, // global packet identifier
        bytes calldata payload, // encoded message payload being received
        address _executor, // the Executor address.
        bytes calldata _extraData // arbitrary data appended by the Executor
    ) internal override {
        (uint orderId, uint minAmount, address token) = abi.decode(payload, (uint, uint, address));

        Order memory order = orders[orderId];
        bool isNotExpired = order.deadline > block.timestamp;
        bool isMinAmountSame = order.minAmountOut == minAmount;
        bool isTokenSame = order.tokenOut == token;
        bool isChainSame = order.chainOut == _origin.chainId;

        if (isNotExpired && isMinAmountSame && isTokenSame && isChainSame) {
            IERC20(order.tokenIn).transfer(_origin.sender, order.amountIn);
            delete orders[orderId];
        }

        //not reverting to not block LZ execution, resolvers should calculate possible failures
    }

    function lockAndInitiateOrder(Order memory order) public {
        IERC20(order.tokenIn).transferFrom(msg.sender, address(this), order.amountIn);
        orders[order.tokenIn].push(order);
    }

    function withdrawOrder(address token, uint256 index) public {
        require(orders[token][index].deadline < block.timestamp, "Order not expired");

        Order memory order = orders[token][index];
        IERC20(token).transfer(msg.sender, order.amountIn);
        userOrdersIds[msg.sender][index] = userOrdersIds[msg.sender][userOrdersIds[msg.sender].length - 1];
        userOrdersIds[msg.sender].pop();
    }

    function getOrdersLength(address user) public view returns (uint256) {
        return orders[user].length;
    }
}
