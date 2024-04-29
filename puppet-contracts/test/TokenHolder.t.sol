// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TokenHolder} from "../src/TokenHolder.sol";
import {PuppetHub, Order} from "../src/PuppetHub.sol";
import {ERC20Mock} from "./mocks/ERC20Mock.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";

contract TokenHolderTest is Test {
    TokenHolder public tokenHolder;
    PuppetHub public puppetHub;
    ERC20Mock public token;

    address endpointAddress = address(0xe);
    address sendingOAPPMockAddress = address(0xf);
    address receiverAddress = address(0x10);

    function setDelegate(address _delegate) external {
        uint a;
    }

    function createPayloadFromOrigin(
        address _token,
        address _from,
        address _to,
        uint amount
    ) public view returns (bytes memory) {
        return abi.encode(_token, _from, _to, amount);
    }

    function createPayloadFromRemote(
        uint _orderId,
        uint256 _minAmount,
        address _token,
        address _to,
        address _payReceiver
    ) public view returns (bytes memory) {
        return abi.encode(_orderId, _minAmount, _token, _to, _payReceiver);
    }

    function setUp() public {
        tokenHolder = new TokenHolder(address(this), address(this), 1);
        puppetHub = new PuppetHub(address(this), address(this));
        token = new ERC20Mock("Test Token", "TST", 18);
    }

    function test_remote_receive() public {

        token.mint(address(this), 1000);
        token.approve(address(tokenHolder), 1000);
        tokenHolder.deposit(address(token), address(this), 1000);

        
        Origin memory origin = Origin(1, bytes32(bytes20(sendingOAPPMockAddress)), 1);
        bytes32 guid = bytes32("guid");
        bytes memory payload = createPayloadFromOrigin(address(token), address(this), receiverAddress, 1000);
        address executor = address(0);
        bytes memory extraData = "";

        tokenHolder.setPeer(1, bytes32(bytes20(sendingOAPPMockAddress)));

        tokenHolder.lzReceive(origin, guid, payload, executor, extraData);

        uint receiverBalance = token.balanceOf(receiverAddress);
        assertEq(receiverBalance, 1000);
    }

    // struct Order{
    //     address receiver;
    //     address tokenIn;
    //     address tokenOut;
    //     uint32 chainIn;
    //     uint32 chainOut;
    //     uint256 amountIn;
    //     uint256 minAmountOut;
    //     uint64 deadline;
    // }

    function test_source_receive() public {

        token.mint(address(this), 1000);
        token.approve(address(puppetHub), 1000);

        Order memory order = Order(receiverAddress, address(token), address(token), 1, 1, 1000, 1000, 1000);
        puppetHub.lockAndInitiateOrder(order);

        Origin memory origin = Origin(1, bytes32(bytes20(sendingOAPPMockAddress)), 1);
        bytes32 guid = bytes32("guid");
        bytes memory payload = createPayloadFromRemote(0, 1000, address(token), receiverAddress, receiverAddress);
        address executor = address(0);
        bytes memory extraData = "";

        puppetHub.setPeer(1, bytes32(bytes20(sendingOAPPMockAddress)));

        puppetHub.lzReceive(origin, guid, payload, executor, extraData);

        uint receiverBalance = token.balanceOf(receiverAddress);
        assertEq(receiverBalance, 1000);
    }
}
