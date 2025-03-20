"use client";

import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/app/third-party/config/thirdwebConfig";
import { useState } from "react";
import {
  getSignedMessage,
  signInWithWallet,
} from "@/app/third-party/services/auth";

export default function UseThirdWebLogin() {
  const { connect, isConnecting } = useConnect();
  const [walletAddress, setWalletAddress] = useState<string>(""); // Address as string
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const connectMetaMask = async () => {
    try {
      // Create MetaMask wallet instance
      const wallet = createWallet("io.metamask");

      // Connect the wallet and get the account
      const account = await wallet.connect({ client });
      const address = account.address; // Get the wallet address as a string
      setWalletAddress(address);

      // Fetch message and nonce from your backend
      const signMessageData = await getSignedMessage(address);
      const { message, nonce } = signMessageData.data;

      // Sign the message using Thirdweb's signMessage
      let signature;
      try {
        signature = await account.signMessage({ message });
        console.log("Signature:", signature);
      } catch (err) {
        console.error("Error signing message:", err);
        alert("Signing failed: " + err.message);
        return;
      }

      // Sign in with the signature
      const signInData = await signInWithWallet(signature, nonce, address, 97);
      setAccessToken(signInData.data.accessToken);
      alert("Login successful!");
    } catch (error) {
      console.error("MetaMask Connection Failed:", error);
      alert("Connection failed: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={connectMetaMask}
        disabled={isConnecting}
        className="p-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
      >
        {isConnecting ? "Connecting..." : "Connect MetaMask"}
      </button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
}
