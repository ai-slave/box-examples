import { TheBox } from '@decent.xyz/the-box';
import { parseUnits } from 'viem';
import { Layout } from '@/components/Layouts/Layout';
import { CodeBlock, P } from '@/components/common';
import { ActionType, ChainId } from '@decent.xyz/box-common';

import '@decent.xyz/the-box/index.css';

export default function ExamplePage() {
  return (
    <Layout>
      <h1 className={'font-semibold text-2xl mb-2'}>The Box Example</h1>
      <P>Note: to properly load the styles, be sure to include:</P>
      <CodeBlock>{`import '@decent.xyz/the-box/index.css';`}</CodeBlock>
      <TheBox
        className="rounded-lg border shadow-md bg-white dark"
        paymentButtonText="MINT ME"
        actionType={ActionType.NftMint}
        actionConfig={{
          contractAddress: '0x3007E0eB44222AC69E1D3c93A9e50F9CA73F53a1',
          chainId: ChainId.ARBITRUM,
          cost: {
            isNative: true,
            amount: parseUnits('0.00005', 18),
          },
        }}
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      />
    </Layout>
  );
}
