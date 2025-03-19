"use client";
import React, { useState, useEffect } from "react";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (
      event: string,
      callback: (accounts: string[]) => void
    ) => void;
  };
}

const MetaMaskConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = () => {
    const ethWindow = window as EthereumWindow;
    if (ethWindow.ethereum) {
      ethWindow.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAccount(accounts[0]);
          setError(null);
        })
        .catch(() => setError("Failed to connect MetaMask"));
    } else {
      setError("MetaMask not detected");
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
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <>
          <button
            onClick={connectMetaMask}
            className="p-3 rounded-2xl text-white bg-amber-600 hover:bg-amber-700"
          >
            Connect MetaMask
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default MetaMaskConnect;
