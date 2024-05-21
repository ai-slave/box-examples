import { Layout } from '@/components/Layouts/Layout';
import { ClientRendered } from '@decent.xyz/box-ui';
import { ChainId, nativeTokenInfoLookup } from '@decent.xyz/box-common';
import { SwapModal, BoxThemeProvider } from '@decent.xyz/the-box';
import '@decent.xyz/the-box/index.css';
import { wagmiConfig } from '@/utils/wagmiConfig';

const Swap = () => {

  return (
    <Layout>
      <ClientRendered>
        <SwapModal
          apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
          chainIds={[
            ChainId.ETHEREUM,
            ChainId.EDGELESS,
            ChainId.OPTIMISM,
            ChainId.BASE,
            ChainId.ARBITRUM,
            ChainId.ZORA,
            ChainId.POLYGON,
            ChainId.RARIBLE,
          ]}
          selectedSrcToken={{
            chainId: ChainId.ETHEREUM,
            tokenInfo: nativeTokenInfoLookup[ChainId.ETHEREUM],
          }}
          selectedDstToken={{
            chainId: ChainId.EDGELESS,
            tokenInfo: nativeTokenInfoLookup[ChainId.EDGELESS],
          }}
          wagmiConfig={wagmiConfig}
        />
      </ClientRendered>
    </Layout>
  );
};

export default Swap;
