"use client";

import React, { useState, useEffect } from "react";
import {
  getSignedMessage,
  signInWithWallet,
} from "@/app/third-party/services/auth";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (
      event: string,
      callback: (accounts: string[]) => void
    ) => void;
  };
}

const MetaMaskConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //   const [googleAcessToken, setGoogleAccessToken] = useState<string | null>(
  //     null
  //   );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectMetaMask = async () => {
    const ethWindow = window as EthereumWindow;

    if (!ethWindow.ethereum) {
      console.error("MetaMask not found!");
      alert("MetaMask not detected");
      return;
    }
    console.log("✅ MetaMask detected!");

    setLoading(true);
    setError(null);

    try {
      // cpnnect metamask and get wallet address
      const accounts = await ethWindow.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts || accounts.length === 0)
        throw new Error("Failed to get wallet address");
      const publicAddress = accounts[0];
      setAccount(publicAddress);

      // get message + nonce
      const signMessageData = await getSignedMessage(publicAddress);
      const { message, nonce } = signMessageData.data;

      console.log("mes", message);
      console.log("nonce", nonce);
      console.log("pa", publicAddress);
      // sign message
      let signature;
      try {
        console.log("🔹 Requesting MetaMask to sign message...");
        signature = await ethWindow.ethereum.request({
          method: "personal_sign",
          params: [message, publicAddress],
        });
        console.log("✅ Signature received:", signature);
      } catch (err) {
        console.error("Error signing message:", err);
        alert("Signing failed: " + err.message);
        return;
      }
      // test
      console.log("sig", signature);
      console.log("nonce", nonce);
      console.log("pa", publicAddress);
      // sign in with signature
      const signInData = await signInWithWallet(
        signature,
        nonce,
        publicAddress,
        97
      );
      console.log("Sign-in response:", signInData);
      setAccessToken(signInData.data.accessToken);
      alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ethWindow = window as EthereumWindow;
    if (ethWindow.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      };

      ethWindow.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged);
      ethWindow.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        ethWindow.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else {
      setError("MetaMask not detected");
    }
  }, []);

  return (
    <div>
      {account ? (
        <>
          <p>Connected Account: {account}</p>
          {accessToken && <p>Access Token: {accessToken}</p>}
        </>
      ) : (
        <>
          <button
            onClick={connectMetaMask}
            disabled={loading}
            className="p-3 rounded-2xl text-white bg-amber-600 hover:bg-amber-700"
          >
            {loading ? "Connecting..." : "Connect MetaMask"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default MetaMaskConnect;
