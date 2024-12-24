import "./App.css";

// wallet adapter imports
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./RequestAirdrop";
import { GetBalance } from "./GetBalance";
import { SendTokens } from "./SendTokens";
import { SignMessage } from "./SignMessage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton style={{ marginBottom: "20px" }} />
            <WalletDisconnectButton style={{ marginBottom: "20px" }} />
            <GetBalance />
            <RequestAirdrop />
            <SendTokens />
            <SignMessage />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
