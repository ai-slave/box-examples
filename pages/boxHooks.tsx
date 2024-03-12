import { Layout } from '@/components/Layouts/Layout';
import { useState } from 'react';
import {
  BoxHooksContextProvider,
  useBoxAction,
  UseBoxActionArgs,
  useBridgeReceipt,
} from '@decent.xyz/box-hooks';

import {
  EstimateGasParameters,
  Hex,
  parseUnits,
  TransactionReceipt,
} from 'viem';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { ClientRendered } from '@decent.xyz/box-ui';
import {
  getAccount,
  getPublicClient,
  sendTransaction,
  waitForTransaction,
} from '@wagmi/core';
import { Button, CodeBlock, H1, H2, P } from '@/components/common';
import {
  ActionType,
  bigintSerializer,
  ChainId,
  EvmTransaction,
  getChainExplorerTxLink,
} from '@decent.xyz/box-common';

export const prettyPrint = (obj: any) =>
  JSON.stringify(obj, bigintSerializer, 2);

export const BoxActionUser = ({
  getActionArgs,
}: {
  getActionArgs: UseBoxActionArgs;
}) => {
  const { actionResponse, isLoading, error } = useBoxAction(getActionArgs);
  const [hash, setHash] = useState<Hex>();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();
  const bridgeId = actionResponse?.bridgeId;
  const { srcChainId, dstChainId } = getActionArgs;
  const [srcTxReceipt, setSrcTxReceipt] = useState<TransactionReceipt>();
  const { receipt: _dstTxReceipt } = useBridgeReceipt({
    bridgeId,
    srcChainId,
    dstChainId,
    srcTxHash: hash,
  });
  const dstTxReceipt = _dstTxReceipt as TransactionReceipt;

  if (error) {
    return <CodeBlock>Error fetching: {prettyPrint(error)}</CodeBlock>;
  }
  if (isLoading || !actionResponse) {
    return <CodeBlock>Fetching box action...</CodeBlock>;
  }

  return (
    <div className={'max-w-4xl'}>
      <CodeBlock className={'mb-4'}>{prettyPrint(actionResponse)}</CodeBlock>
      <Button
        onClick={async () => {
          try {
            const account = getAccount();
            const publicClient = getPublicClient();
            if (chain?.id !== srcChainId) {
              await switchNetworkAsync?.(srcChainId);
            }
            const tx = actionResponse.tx as EvmTransaction;
            const gas = await publicClient.estimateGas({
              account,
              ...tx,
            } as unknown as EstimateGasParameters);
            const { hash } = await sendTransaction({
              ...tx,
              gas,
            });
            setHash(hash);
            // catch viem polygon error
            try {
              const receipt = await waitForTransaction({ hash });
              setSrcTxReceipt(receipt);
            } catch (e) {}
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Send This Tx!
      </Button>
      {hash && (
        <div className={'mt-6'}>
          <H2>TX Hash:</H2>
          <CodeBlock>
            {srcTxReceipt ? hash : 'Waiting for tx confirmation...'}
          </CodeBlock>
          <a
            href={getChainExplorerTxLink(srcChainId, hash)}
            className={'text-blue-500'}
          >
            view on explorer
          </a>
        </div>
      )}
      {srcTxReceipt && srcChainId !== dstChainId && (
        <div className={'mt-6'}>
          <H2>Bridged TX Hash:</H2>
          <CodeBlock>
            {dstTxReceipt
              ? dstTxReceipt.transactionHash
              : 'Waiting for bridged tx confirmation...'}
          </CodeBlock>
          {dstTxReceipt?.transactionHash && (
            <a
              href={getChainExplorerTxLink(
                dstChainId,
                dstTxReceipt?.transactionHash
              )}
              className={'text-blue-500'}
            >
              view on explorer
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export const Usage = () => {
  const { address: sender } = useAccount();

  const getActionArgs: UseBoxActionArgs = {
    actionType: ActionType.NftMint,
    actionConfig: {
      contractAddress: '0x9f87bf13af201d5dc894647577f7c694fa2412d9',
      chainId: ChainId.AVALANCHE,
      cost: {
        isNative: false,
        amount: 100000n,
        tokenAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E'
      },
      signature: "function purchase(uint256[] _values,address[] _recipients,address[] _referrers,address[] _keyManagers,bytes[] _data) payable returns (uint256[] tokenIds)",
      args: [
        [100000n],
        ["0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232"],
        ["0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232"],
        ["0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232"],
        ["0x"]
      ]
    },
    srcChainId: ChainId.AVALANCHE,
    sender: sender!,
    slippage: 1, // 1%
    srcToken: '0x0000000000000000000000000000000000000000',
    dstToken: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC
    dstChainId: ChainId.AVALANCHE,
  };

  return (
    <>
      <H2>Action Args</H2>
      <CodeBlock>{prettyPrint(getActionArgs)}</CodeBlock>
      <div className={'mt-10'}>
        <H2>Action Response</H2>
        <BoxActionUser getActionArgs={getActionArgs} />
      </div>
    </>
  );
};

export default function ExamplePage() {
  const { address: sender } = useAccount();

  return (
    <Layout>
      <ClientRendered>
        <BoxHooksContextProvider
          apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
        >
          <div className={'max-w-5xl '}>
            <H1>Box Hooks</H1>
            <P>Below you can see the usage of the box hooks.</P>
            {sender ? <Usage /> : <P>Please Connect your wallet</P>}
          </div>
        </BoxHooksContextProvider>
      </ClientRendered>
    </Layout>
  );
}
