import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Web3 from "web3";
import abi from "../contract.json";
import { ChangeEvent, useEffect, useState } from "react";
import profilePic from "../public/img/4.jpeg";
import { Contract } from "../types/web3-v1-contracts/contract";
import { Spinner } from "../components/atom/spinner";

const address = "0xbC3eE26e3Ff1BEAf5a6c03D777de9C9D72af8716";

const Home: NextPage = () => {
  // connect network and wallet
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [walletError, setWalletError] = useState<string | null>(
    "Connect wallet to mint"
  );
  const [networkError, setNetworkError] = useState<string | null>();
  // contract
  const [contract, setContract] = useState<Contract>();
  const [supplyInfo, setSupplyInfo] =
    useState<{ current: number; max: number }>();
  // transactions (mint)
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>();
  const [txError, setTxError] = useState<boolean | null>();

  const listeners = async () => {
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setWalletAddress(accounts[0]);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  };

  const getContract = async () => {
    const web3 = new Web3(window.ethereum);
    const contract: Contract = new web3.eth.Contract(
      abi as any,
      address
    ) as any;
    setContract(contract);

    try {
      const maxSupply = await contract?.methods.MAX_SUPPLY().call();
      const totalSupply = await contract?.methods.totalSupply().call();
      setSupplyInfo({ max: Number(maxSupply), current: Number(totalSupply) });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      listeners();
      getContract();
    } else {
      setWalletError("You need MetaMask to connect Ethereum.");
    }
  }, []);

  const onConnectClick = async () => {
    if (!window.ethereum) {
      setWalletError("You need MetaMask to connect Ethereum.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setWalletError(null);
    } catch (e: any) {
      setWalletError(e.message);
    }

    try {
      const networkId = await window.ethereum.request({
        method: "net_version",
      });

      if (networkId !== "4") {
        setNetworkError(
          "You need to be in Rinkeby Test Network (4) to mint Holy Skully."
        );
      } else {
        setNetworkError(undefined);
      }
    } catch (e: any) {
      setNetworkError(e.message);
    }
  };

  // const onWhiteListMintClick = async () => {

  // };

  // const onTokenQueryClick = async () => {
  //   try {
  //   const uri = await contract?.methods.tokenURI(0).call();
  //   setTokenURI(uri);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  // const myTokens = async () => {
  //   try {
  //     if(walletAddress) {
  //       const tokens = await contract?.methods.walletOfOwner(walletAddress).call();
  //       setWallet(tokens);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  // const presaleMint = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/whitelist?address=${walletAddress}`
  //     );
  //     const data: { root: string; proof: string[] } = await res.json();
  //     if (data?.proof?.length > 0) {
  //       const mint = await contract?.methods.whiteListMint(1, data.proof).send({
  //         to: address,
  //         from: walletAddress,
  //         // cost in wei
  //         value: 50000000000000000,
  //       });
  //       console.log(mint);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  const publicMint = async () => {
    if (!contract || !walletAddress) {
      return;
    }

    setConfirming(true);

    const amount = new Web3().utils.toWei(
      (0.05 * mintAmount).toString(),
      "ether"
    );

    contract?.methods
      ?.mint(Number(mintAmount))
      .send({
        to: address,
        from: walletAddress,
        // cost in wei
        value: amount,
      })
      .on("transactionHash", (hash) => {
        setTxHash(hash);
      })
      .on("error", () => {
        setTxError(true);
        setConfirming(false);
      })
      .on("receipt", () => {
        setTxError(false);
        setConfirming(false);
      });
  };

  const onMintInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val: number = e?.currentTarget?.value as any;
    if (val < 0) {
      setMintAmount(1);
      return;
    }

    if (val > 5) {
      setMintAmount(5);
      return;
    }

    setMintAmount(val);
  };

  return (
    <div className="min-h-screen flex-col flex">
      <Head>
        <title>Holy Skully NFT</title>
        <meta name="description" content="Holy Skully NFT in Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-16 justify-between items-center flex flex-none h-24 bg-amber-600">
        <h3>Holy Skully</h3>
        <div>
          {walletAddress ? (
            <p className="text-white text-sm border border-white px-1 rounded-sm">
              {`Connected: ${walletAddress.substring(0, 10)}...`}
            </p>
          ) : (
            <button
              onClick={onConnectClick}
              className="border border-white p-2 text-white rounded-sm hover:border-green-700 hover:text-green-700"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <main className="pt-12 pb-24 container mx-auto flex-col flex grow justify-around items-center">
        <h1 className="text-5xl">Mint Holy Skully</h1>
        <p className="text-xl">
          Supply: {`${supplyInfo?.current || "-"} / ${supplyInfo?.max || "-"}`}
        </p>
        <Image
          alt=""
          src={profilePic}
          width={200}
          height={200}
          className="rounded-md"
        />
        {walletError ? (
          <p>{walletError}</p>
        ) : networkError ? (
          <p>{networkError}</p>
        ) : (
          <div>
            <input
              onChange={onMintInputChange}
              value={mintAmount}
              placeholder="1"
              type="number"
              className="border-b border-gray-300 mx-8 w-16 pl-7"
              max={5}
              min={1}
            />
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={confirming ? () => null : publicMint}
                disabled={confirming}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                <Spinner loading={confirming} />
                {confirming ? "Confirming" : "Mint"}
              </button>
            </span>
          </div>
        )}
        {txError === true && (
          <span>
            <p className="text-red-700 text-center">Mint failed</p>
            {txHash && (
              <>
                <p className="text-sm">You can check your transaction here: </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-700"
                  href={`https://rinkeby.etherscan.io/tx/${txHash}`}
                >{`https://rinkeby.etherscan.io/tx/${txHash}`}</a>
              </>
            )}
          </span>
        )}

        {txError === false && (
          <span>
            <p className="text-green-700 text-center">Mint Succeeded</p>
            <p className="text-sm">You can check your transaction here: </p>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-700"
              href={`https://rinkeby.etherscan.io/tx/${txHash}`}
            >{`https://rinkeby.etherscan.io/tx/${txHash}`}</a>
          </span>
        )}
      </main>
    </div>
  );
};

export default Home;
