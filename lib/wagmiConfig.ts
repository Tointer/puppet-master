import { default as puppetHubAbi } from './PuppetHub.json';
import { default as tokenHolderAbi } from './TokenHolder.json';
import { Abi, erc20Abi } from 'viem';
import { createConfig, http } from 'wagmi';
import { scrollSepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';
import { type } from 'os';

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [scrollSepolia],
    transports: {
      [scrollSepolia.id]: http(scrollSepolia.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId: '',

    // Required App Info
    appName: 'Your App Name',
    ssr: true,

    // Optional App Info
    appDescription: 'Puppet Master',
  })
);

declare module 'wagmi' {
    interface Register {
      config: typeof config;
    }
  }
  

export type AddrString = `0x${string}`;

const typelessContracts = {
    scrollMockToken: { abi: erc20Abi, address: "0xef1F6669249C8DD5b6704dBd3F166a22A20750EA" as AddrString},
    puppetHub: { abi: puppetHubAbi.abi as any, address: "0xc7A101CF053cDA6442f8eB29b29944e381cc85BD" as AddrString},
    tokenHolder: { abi: tokenHolderAbi.abi as any },
};

type ContractsRecord = {
  [P in keyof typeof typelessContracts]: {
    abi: Abi;
    address?: AddrString;
  };
};

export const contracts: ContractsRecord = typelessContracts;
