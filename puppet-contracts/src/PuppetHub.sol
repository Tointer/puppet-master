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

    mapping(address => uint[]) public userOrdersIds;
    mapping(uint => Order) public orders;
    uint public nextOrderId;

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
        bool isChainSame = order.chainOut == _origin.srcEid;

        if (isNotExpired && isMinAmountSame && isTokenSame && isChainSame) {
            IERC20(order.tokenIn).transfer(address(bytes20(_origin.sender)), order.amountIn);
            delete orders[orderId];
        }

        //not reverting to not block LZ execution, resolvers should calculate possible failures
    }

    function lockAndInitiateOrder(Order memory order) public {
        IERC20(order.tokenIn).transferFrom(msg.sender, address(this), order.amountIn);
        orders[nextOrderId] = order;
        nextOrderId++;
    }

    function withdrawOrder(uint256 userIndex) public {
        uint index = userOrdersIds[msg.sender][userIndex];
        Order memory order = orders[index];
        require(order.deadline < block.timestamp, "Order not expired");
        address token = orders[index].tokenIn; 

        IERC20(token).transfer(msg.sender, order.amountIn); //will revert if order not initialized
        userOrdersIds[msg.sender][userIndex] = userOrdersIds[msg.sender][userOrdersIds[msg.sender].length - 1];
        userOrdersIds[msg.sender].pop();
    }

    function getUserOrdersLength(address user) public view returns (uint256) {
        return userOrdersIds[user].length;
    }

    function getUserOrderByIndex(address user, uint256 index) public view returns (Order memory) {
        uint orderId = userOrdersIds[user][index];
        return orders[orderId];
    }

    function getOrderIndexByUserIndex(address user, uint256 index) public view returns (uint256) {
        return userOrdersIds[user][index];
    }
}
