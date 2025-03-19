const BASE_URL = "https://auth-api.luban.dev/api/v1/auth";

export const getSignedMessage = async (publicAddress: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/sign-message?publicAddress=${publicAddress}`
    );
    if (!response.ok) throw new Error("Failed to get signed message");
    return await response.json();
  } catch (error) {
    console.error("Error in getSignedMessage:", error);
    throw error;
  }
};

export const signInWithWallet = async (
  signature: string,
  nonce: string,
  publicAddress: string,
  chainId: number
) => {
  try {
    const response = await fetch(`${BASE_URL}/sign-in/wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature,
        nonce,
        publicAddress,
        chainId,
      }),
    });

    if (!response.ok) throw new Error("Sign-in failed");
    return await response.json();
  } catch (error) {
    console.error("Error in signInWithWallet:", error);
    throw error;
  }
};

// export const signInWithGoogle = async (token: string) => {
//   try {
//     const response = await fetch(`${BASE_URL}/sign-in/google`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         token,
//       }),
//     });

//     if (!response.ok) throw new Error("Sign-in failed");
//     return await response.json();
//   } catch (error) {
//     console.error("Error in signInWithWallet:", error);
//     throw error;
//   }
// };
