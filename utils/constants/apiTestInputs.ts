import {
  ActionType,
  BoxActionRequest,
  ChainId,
  SwapDirection,
} from '@decent.xyz/box-common';
import { zeroAddress, parseUnits, Address } from 'viem';
import { argGenerators } from '@/utils/argGenerators';
import { ApiTests } from '@/utils/types';

const ARB_INBOX_PROXY = '0x37e60f80d921dc5e7f501a7130f31f6548dba564';

const apiTestInputs: Record<ApiTests, BoxActionRequest> = {
  [ApiTests.SWAP_ARB_TO_OP]: {
    sender: '',
    srcChainId: ChainId.ARBITRUM,
    srcToken: zeroAddress,
    dstChainId: ChainId.OPTIMISM,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: ChainId.OPTIMISM,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_BASE_TO_OP]: {
    sender: '',
    srcChainId: ChainId.BASE,
    srcToken: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    // srcToken: zeroAddress,
    dstChainId: ChainId.OPTIMISM,
    // dstToken: zeroAddress,
    dstToken: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    slippage: 1,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: ChainId.OPTIMISM,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.0002', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_OP_SEPOLIA_TO_RARI_TESTNET]: {
    sender: '',
    srcChainId: 11155420 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 1918988905 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1918988905 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_ARB_SEPOLIA_TO_RARI_TESTNET]: {
    sender: '',
    srcChainId: 421614 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 1918988905 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1918988905 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.0001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_RARI_TESTNET_TO_ARB_SEPOLIA]: {
    sender: '',
    srcChainId: 1918988905 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 11155420 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 421614 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_ARB_TO_RARI]: {
    sender: '',
    srcChainId: ChainId.ARBITRUM,
    srcToken: zeroAddress,
    dstChainId: 1380012617 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1380012617 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.SWAP_RARI_TO_ARB]: {
    sender: '',
    srcChainId: 1380012617 as ChainId,
    srcToken: zeroAddress,
    dstChainId: ChainId.ARBITRUM,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: ChainId.ARBITRUM,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  [ApiTests.MULTI_HOP_OP_ARB_RARI]: {
    sender: '',
    srcChainId: ChainId.OPTIMISM, // any source
    srcToken: zeroAddress, // can let users select any token on source chain with DeFi liquidity
    dstChainId: ChainId.ARBITRUM, // always ARB
    dstToken: zeroAddress, // must be Ethereum to call next function
    slippage: 1,
    actionType: ActionType.NftMint,
    actionConfig: {
      chainId: ChainId.ARBITRUM,
      contractAddress: ARB_INBOX_PROXY,
      cost: {
        // this cost should be configurable based on maxSubmissionCost + (maxFeePerGas*gasLimit)
        amount: parseUnits('0.00035', 18),
        isNative: true,
      },
      signature: `function createRetryableTicket(address to,uint256 l2CallValue, uint256 maxSubmissionCost,address excessFeeRefundAddress,address callValueRefundAddress,uint256 gasLimit,uint256 maxFeePerGas,bytes calldata data)`,
    },
  },
  [ApiTests.MULTI_HOP_OP_BASE_DEGEN]: {
    sender: '',
    srcChainId: ChainId.OPTIMISM, // any source
    srcToken: zeroAddress, // can let users select any token on source chain with DeFi liquidity
    dstChainId: ChainId.BASE,
    dstToken: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed', // must be Ethereum to call next function
    slippage: 1,
    actionType: ActionType.NftMint,
    actionConfig: {
      chainId: ChainId.BASE,
      contractAddress: '0xe12209d7ABe986aE24A2c1A82Fa287e94B66CC88',
      cost: {
        // this cost should be configurable based on maxSubmissionCost + (maxFeePerGas*gasLimit)
        amount: parseUnits('0.00035', 18),
        isNative: false,
        tokenAddress: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
      },
      signature: `function createRetryableTicket(address to,uint256 l2CallValue,uint256 maxSubmissionCost,address excessFeeRefundAddress,address callValueRefundAddress,uint256 gasLimit,uint256 maxFeePerGas,uint256 tokenTotalFeeAmount,bytes calldata data)`,
    },
  },
};

export const createBoxActionRequest = async (
  sender: Address,
  apiTest: ApiTests,
): Promise<BoxActionRequest> => {
  const request = apiTestInputs[apiTest];
  const args = await argGenerators[apiTest]?.(sender);
  return {
    ...request,
    sender,
    actionConfig: {
      ...request.actionConfig,
      args,
    }
  }
}