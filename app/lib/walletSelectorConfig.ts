import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

export async function initWalletSelector() {
  return setupWalletSelector({
    network: "testnet",
    modules: [
      setupWalletConnect({
        projectId: "06f1c9ed927a54cc4a5f9dde0f520bf4",
        metadata: {
          name: "Umbra NEAR App",
          description: "Privacy-focused NEAR application",
          url: "https://umbra.app",
          icons: ["https://avatars.githubusercontent.com/u/37784886"],
        },
        chainId: "near:testnet",
      }),
    ],
  });
}
