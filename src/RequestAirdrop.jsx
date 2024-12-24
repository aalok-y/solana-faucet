import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [error, setError] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  function requestAirdrop() {
    // Clear previous error messages
    setError(null);
    setIsRequesting(true);

    if (!wallet.connected) {
      setError("Please connect your wallet first.");
      setIsRequesting(false);
      return;
    }

    const publicKey = wallet.publicKey;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      setIsRequesting(false);
      return;
    }

    // Request airdrop
    connection
      .requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL)
      .then((transactionId) => {
        console.log("Airdrop successful, transaction ID:", transactionId);
        alert(`Airdrop requested successfully! Tx ID: ${transactionId}`);
        setIsRequesting(false);
      })
      .catch((err) => {
        console.error("Airdrop failed:", err);
        setError(`Airdrop failed: ${err.message || err}`);
        setIsRequesting(false);
      });
  }

  return (
    <div>
      <input type="number" id="amount" placeholder="Amount.." />
      <button onClick={requestAirdrop} disabled={isRequesting} style={{marginLeft: '10px'}}>
        {isRequesting ? "Requesting Airdrop..." : "Request Airdrop"}
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}
