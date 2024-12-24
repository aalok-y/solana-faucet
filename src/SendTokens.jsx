import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from "react";

export function SendTokens(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendTokens(to,amount) {
        const transaction =  new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: to,
            lamports: amount*LAMPORTS_PER_SOL
        }));

       try {
            const response = await wallet.sendTransaction(transaction,connection);
            console.log(response);
            
       } catch (error) {
            console.error(error);
       }
        alert(`sent ${amount} SOL to ${to}`)

    }

    const to = useRef(null);
    const amount = useRef(null);

    function handleClick(){
        const receiver = to.current.value;
        const amt = amount.current.value;

        sendTokens(receiver,amt);
    }

    return (
        <div style={{margin: '10px'}}>
            <input style={{marginLeft: '10px'}} type="text" ref={to} placeholder="To" />
            <input style={{marginLeft: '10px'}} type="number"  ref={amount} placeholder="Amount" />
            <button style={{marginLeft: '10px'}} onClick={handleClick}>Send Tokens</button>
        </div>
    )
}