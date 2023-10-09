import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useAccount, useConnectors } from "@starknet-react/core";
import type { FC } from "react";
import { useMemo, useState } from "react";

import { cropAddress } from "@/lib/services/address.service";

import ConnectWalletModal from "./connect-wallet-modal";

const ConnectButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { status, address } = useAccount();
  const { disconnect } = useConnectors();
  const [isConnectModalOpen, setConnectModalOpen] = useState<boolean>(false);

  const handleClickConnect = () => {
    setConnectModalOpen(true);
  };

  const isConnected = useMemo(
    () => status === "connected" && !!address,
    [status, address]
  );

  return (
    <>
      <Button
        colorScheme="orange"
        size="xs"
        px="6"
        onClick={isConnected ? disconnect : handleClickConnect}
        {...props}
      >
        {isConnected
          ? cropAddress(address || "")
          : children || "Wallet Connect"}
      </Button>

      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
};

export default ConnectButton;
