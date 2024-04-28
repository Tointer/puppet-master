// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TokenHolder} from "../src/TokenHolder.sol";
import {ERC20Mock} from "./mocks/ERC20Mock.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";

contract TokenHolderTest is Test {
    TokenHolder public tokenHolder;
    ERC20Mock public token;

    address endpointAddress = address(0xe);
    address sendingOAPPMockAddress = address(0xf);
    address receiverAddress = address(0x10);

    function setDelegate(address _delegate) external {
        uint a;
    }

    function createPayload(
        address _token,
        address _from,
        address _to,
        uint amount
    ) public view returns (bytes memory) {
        return abi.encode(_token, _from, _to, amount);
    }

    function setUp() public {
        tokenHolder = new TokenHolder(address(this), address(this), 1);
        token = new ERC20Mock("Test Token", "TST", 18);
    }

    function test_receive() public {

        token.mint(address(this), 1000);
        token.approve(address(tokenHolder), 1000);
        tokenHolder.deposit(address(token), address(this), 1000);

        
        Origin memory origin = Origin(1, bytes32(bytes20(sendingOAPPMockAddress)), 1);
        bytes32 guid = bytes32("guid");
        bytes memory payload = createPayload(address(token), address(this), receiverAddress, 1000);
        address executor = address(0);
        bytes memory extraData = "";

        tokenHolder.setPeer(1, bytes32(bytes20(sendingOAPPMockAddress)));

        tokenHolder.lzReceive(origin, guid, payload, executor, extraData);

        uint receiverBalance = token.balanceOf(receiverAddress);
        assertEq(receiverBalance, 1000);
    }
}
