import GoogleLogin from "@/context/useGoogle";
import UseThirdWebLogin from "@/context/useThirdParty";
import MetaMaskConnect from "@/context/useWallet";
import Link from "next/link";
import React from "react";

export default async function page() {
  return (
    <div className="grid grid-cols-2 text-center text-3xl mt-32">
      <div className="hover:bg-amber-300">
        <Link href="/tab1">Tab1</Link>
      </div>
      <div className="hover:bg-amber-300">
        <Link href="/tab2">Tab2</Link>
      </div>
      <div className="p-3 col-span-2 mt-16">
        <MetaMaskConnect />
      </div>
      <div className="p-3 col-span-2 mt-16">
        <GoogleLogin />
      </div>
      <div className="p-3 col-span-2 mt-16">
        <UseThirdWebLogin />
      </div>
    </div>
  );
}
