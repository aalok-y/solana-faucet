import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const getBalance = async (wallet, connection) => {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }
  const balance = await connection.getBalance(wallet.publicKey);
  return balance;
};

export function GetBalance() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet.publicKey) {
        setBalance(null);
        setError("Please connect your wallet.");
        return;
      }

      try {
        const data = await getBalance(wallet, connection);
        setBalance(data);
        setError("");
      } catch (err) {
        setBalance(null);
        setError(`Unable to
          fetch balance: ${err.message}`);
      }
    };

    fetchBalance();
  }, [wallet, connection]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{display: 'flex'}}>
      {balance !== null ? (
        <div>Current Balance: {balance / LAMPORTS_PER_SOL} SOL</div>
      ) : (
        <div>Loading balance...</div>
      )}
    </div>
  );
}
