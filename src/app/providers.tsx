"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import type { ReactNode } from "react";
import { constants, Provider } from "starknet";

export function Providers({ children }: { children: React.ReactNode }) {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  return (
    <CacheProvider>
      <ChakraProvider>
        <StarknetConfig
          defaultProvider={
            new Provider({
              sequencer: { network: constants.NetworkName.SN_GOERLI },
            })
          }
          autoConnect
          connectors={connectors}
        >
          {children}
        </StarknetConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}
