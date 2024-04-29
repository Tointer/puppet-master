import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// puppetHub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const puppetHubAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPayload',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_orderId', internalType: 'uint256', type: 'uint256' },
      { name: '_payReceiver', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_lzOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'depositFor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'order',
        internalType: 'struct Order',
        type: 'tuple',
        components: [
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'chainIn', internalType: 'uint32', type: 'uint32' },
          { name: 'chainOut', internalType: 'uint32', type: 'uint32' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'lockAndInitiateOrder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextOrderId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'orders',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'chainIn', internalType: 'uint32', type: 'uint32' },
      { name: 'chainOut', internalType: 'uint32', type: 'uint32' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'orderIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawOrder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

export const puppetHubAddress =
  '0xc7A101CF053cDA6442f8eB29b29944e381cc85BD' as const

export const puppetHubConfig = {
  address: puppetHubAddress,
  abi: puppetHubAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// scrollMockToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const scrollMockTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_decimals', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

export const scrollMockTokenAddress =
  '0xef1F6669249C8DD5b6704dBd3F166a22A20750EA' as const

export const scrollMockTokenConfig = {
  address: scrollMockTokenAddress,
  abi: scrollMockTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tokenHolder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenHolderAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_destId', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'composeMsgSender',
    outputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_orderId', internalType: 'uint256', type: 'uint256' },
      { name: '_minAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_payReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'createPayload',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_payReceiver', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_minAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_orderId', internalType: 'uint256', type: 'uint256' },
      { name: '_lzOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'depositFor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'destId',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'processed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_orderId', internalType: 'uint256', type: 'uint256' },
      { name: '_minAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_payReceiver', internalType: 'address', type: 'address' },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'quote',
    outputs: [{ name: 'nativeFee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__
 */
export const useReadPuppetHub = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"allowInitializePath"`
 */
export const useReadPuppetHubAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"composeMsgSender"`
 */
export const useReadPuppetHubComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'composeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"createPayload"`
 */
export const useReadPuppetHubCreatePayload =
  /*#__PURE__*/ createUseReadContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'createPayload',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"endpoint"`
 */
export const useReadPuppetHubEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"nextNonce"`
 */
export const useReadPuppetHubNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"nextOrderId"`
 */
export const useReadPuppetHubNextOrderId = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'nextOrderId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"oAppVersion"`
 */
export const useReadPuppetHubOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"orders"`
 */
export const useReadPuppetHubOrders = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'orders',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"owner"`
 */
export const useReadPuppetHubOwner = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"peers"`
 */
export const useReadPuppetHubPeers = /*#__PURE__*/ createUseReadContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__
 */
export const useWritePuppetHub = /*#__PURE__*/ createUseWriteContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"depositFor"`
 */
export const useWritePuppetHubDepositFor = /*#__PURE__*/ createUseWriteContract(
  { abi: puppetHubAbi, address: puppetHubAddress, functionName: 'depositFor' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"lockAndInitiateOrder"`
 */
export const useWritePuppetHubLockAndInitiateOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'lockAndInitiateOrder',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useWritePuppetHubLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWritePuppetHubRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useWritePuppetHubSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"setPeer"`
 */
export const useWritePuppetHubSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWritePuppetHubTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"withdrawOrder"`
 */
export const useWritePuppetHubWithdrawOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'withdrawOrder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__
 */
export const useSimulatePuppetHub = /*#__PURE__*/ createUseSimulateContract({
  abi: puppetHubAbi,
  address: puppetHubAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"depositFor"`
 */
export const useSimulatePuppetHubDepositFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'depositFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"lockAndInitiateOrder"`
 */
export const useSimulatePuppetHubLockAndInitiateOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'lockAndInitiateOrder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useSimulatePuppetHubLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulatePuppetHubRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useSimulatePuppetHubSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"setPeer"`
 */
export const useSimulatePuppetHubSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulatePuppetHubTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link puppetHubAbi}__ and `functionName` set to `"withdrawOrder"`
 */
export const useSimulatePuppetHubWithdrawOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    functionName: 'withdrawOrder',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link puppetHubAbi}__
 */
export const useWatchPuppetHubEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: puppetHubAbi, address: puppetHubAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link puppetHubAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchPuppetHubOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link puppetHubAbi}__ and `eventName` set to `"PeerSet"`
 */
export const useWatchPuppetHubPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: puppetHubAbi,
    address: puppetHubAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__
 */
export const useReadScrollMockToken = /*#__PURE__*/ createUseReadContract({
  abi: scrollMockTokenAbi,
  address: scrollMockTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadScrollMockTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadScrollMockTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadScrollMockTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadScrollMockTokenDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadScrollMockTokenName = /*#__PURE__*/ createUseReadContract({
  abi: scrollMockTokenAbi,
  address: scrollMockTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadScrollMockTokenNonces = /*#__PURE__*/ createUseReadContract(
  {
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'nonces',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadScrollMockTokenSymbol = /*#__PURE__*/ createUseReadContract(
  {
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'symbol',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadScrollMockTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__
 */
export const useWriteScrollMockToken = /*#__PURE__*/ createUseWriteContract({
  abi: scrollMockTokenAbi,
  address: scrollMockTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteScrollMockTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteScrollMockTokenBurn = /*#__PURE__*/ createUseWriteContract(
  {
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'burn',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteScrollMockTokenMint = /*#__PURE__*/ createUseWriteContract(
  {
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'mint',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteScrollMockTokenPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteScrollMockTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteScrollMockTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__
 */
export const useSimulateScrollMockToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateScrollMockTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateScrollMockTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateScrollMockTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateScrollMockTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateScrollMockTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateScrollMockTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link scrollMockTokenAbi}__
 */
export const useWatchScrollMockTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchScrollMockTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link scrollMockTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchScrollMockTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: scrollMockTokenAbi,
    address: scrollMockTokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__
 */
export const useReadTokenHolder = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"allowInitializePath"`
 */
export const useReadTokenHolderAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenHolderAbi,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTokenHolderBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"composeMsgSender"`
 */
export const useReadTokenHolderComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenHolderAbi,
    functionName: 'composeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"createPayload"`
 */
export const useReadTokenHolderCreatePayload =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenHolderAbi,
    functionName: 'createPayload',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"destId"`
 */
export const useReadTokenHolderDestId = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'destId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"endpoint"`
 */
export const useReadTokenHolderEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"nextNonce"`
 */
export const useReadTokenHolderNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"oAppVersion"`
 */
export const useReadTokenHolderOAppVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenHolderAbi,
    functionName: 'oAppVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTokenHolderOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"peers"`
 */
export const useReadTokenHolderPeers = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"processed"`
 */
export const useReadTokenHolderProcessed = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'processed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"quote"`
 */
export const useReadTokenHolderQuote = /*#__PURE__*/ createUseReadContract({
  abi: tokenHolderAbi,
  functionName: 'quote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__
 */
export const useWriteTokenHolder = /*#__PURE__*/ createUseWriteContract({
  abi: tokenHolderAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteTokenHolderDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: tokenHolderAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"depositFor"`
 */
export const useWriteTokenHolderDepositFor =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenHolderAbi,
    functionName: 'depositFor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useWriteTokenHolderLzReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenHolderAbi,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTokenHolderRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenHolderAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useWriteTokenHolderSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenHolderAbi,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"setPeer"`
 */
export const useWriteTokenHolderSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenHolderAbi,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTokenHolderTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenHolderAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__
 */
export const useSimulateTokenHolder = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenHolderAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateTokenHolderDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"depositFor"`
 */
export const useSimulateTokenHolderDepositFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'depositFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useSimulateTokenHolderLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTokenHolderRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useSimulateTokenHolderSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"setPeer"`
 */
export const useSimulateTokenHolderSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenHolderAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTokenHolderTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenHolderAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenHolderAbi}__
 */
export const useWatchTokenHolderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tokenHolderAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenHolderAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTokenHolderOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenHolderAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenHolderAbi}__ and `eventName` set to `"PeerSet"`
 */
export const useWatchTokenHolderPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenHolderAbi,
    eventName: 'PeerSet',
  })
