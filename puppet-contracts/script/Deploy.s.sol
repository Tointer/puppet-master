// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {TokenHolder} from "../src/TokenHolder.sol";
import {PuppetHub, Order} from "../src/PuppetHub.sol";
import {ERC20Mock} from "../test/mocks/ERC20Mock.sol";
import { OApp, Origin, MessagingFee } from "@layerzero-v2/oapp/OApp.sol";

contract DeployScript is Script {

    //testnets
    uint32 public scrollEndpointId = 40170;
    address public scrollEndpointAddress = address(0x6EDCE65403992e310A62460808c4b910D972f10f);

    uint32 public arbitrumEndpointId = 40231;
    address public arbitrumEndpointAddress = address(0x6EDCE65403992e310A62460808c4b910D972f10f);

    function setUp() public {

    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address myAddress = address(0x0851cf50ba227dFC6baE3BE616eF953D813a3a62);
 
        vm.startBroadcast(deployerPrivateKey);

        ERC20Mock token = new ERC20Mock("Test Token", "TST", 18);
        token.mint(myAddress, 1e19);
        PuppetHub puppetHub = new PuppetHub(scrollEndpointAddress, address(this));

        Order memory order = Order(myAddress, address(token), address(token), scrollEndpointId, arbitrumEndpointId, 1e18, 1e18, uint64(block.timestamp + 10 days));
        token.approve(address(puppetHub), 1e18);
        puppetHub.lockAndInitiateOrder(order);

        
        vm.stopBroadcast();

        console2.log("PuppetHub address: ", address(puppetHub));
        console2.log("Token address: ", address(token));
    }
}