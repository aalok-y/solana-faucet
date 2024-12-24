import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [msgSignature, setMsgSignature] = useState("");
  
  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    const message = document.getElementById("message").value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    setMsgSignature(bs58.encode(signature));
    console.log(msgSignature);
    
  }

  return (
    <div>
      <input id="message" type="text" placeholder="Message" />
      <button style={{marginLeft: '10px'}} onClick={onClick}>Sign Message</button>
      <br />
      {msgSignature && <p style={{marginTop: '20px'}}>{`Successfully Signed Message ${document.getElementById("message").value}, Message Signature: ${msgSignature}`}</p>}
    </div>
  );
}
