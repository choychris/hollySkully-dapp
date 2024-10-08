/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  approved: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;
export type ApprovalForAll = ContractEventLog<{
  owner: string;
  operator: string;
  approved: boolean;
  0: string;
  1: string;
  2: boolean;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;

export interface Contract extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Contract;
  clone(): Contract;
  methods: {
    MAX_SUPPLY(): NonPayableTransactionObject<string>;

    approve(
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    balanceOf(owner: string): NonPayableTransactionObject<string>;

    baseURI(): NonPayableTransactionObject<string>;

    getApproved(
      tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    hiddenMetadataUri(): NonPayableTransactionObject<string>;

    initialize(
      _hiddenMetadataUri: string,
      _revealedTime: number | string | BN,
      _preSaleStartTime: number | string | BN
    ): NonPayableTransactionObject<void>;

    isApprovedForAll(
      owner: string,
      operator: string
    ): NonPayableTransactionObject<boolean>;

    maxMintAmountPerTx(): NonPayableTransactionObject<string>;

    maxWhiteListMint(): NonPayableTransactionObject<string>;

    mint(_mintAmount: number | string | BN): PayableTransactionObject<void>;

    mintForAddress(
      _mintAmount: number | string | BN,
      _receiver: string
    ): NonPayableTransactionObject<void>;

    name(): NonPayableTransactionObject<string>;

    numberMinted(owner: string): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    ownerOf(tokenId: number | string | BN): NonPayableTransactionObject<string>;

    paused(): NonPayableTransactionObject<boolean>;

    preSaleCost(): NonPayableTransactionObject<string>;

    preSaleStartTime(): NonPayableTransactionObject<string>;

    publicSaleCost(): NonPayableTransactionObject<string>;

    publicSaleStart(): NonPayableTransactionObject<boolean>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    revealedTime(): NonPayableTransactionObject<string>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: number | string | BN,
      _data: string | number[]
    ): NonPayableTransactionObject<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean
    ): NonPayableTransactionObject<void>;

    setBaseURI(uri: string): NonPayableTransactionObject<void>;

    setHiddenMetadataUri(
      _hiddenMetadataUri: string
    ): NonPayableTransactionObject<void>;

    setMaxMintAmountPerTx(
      _maxMintAmountPerTx: number | string | BN
    ): NonPayableTransactionObject<void>;

    setMaxWhiteListMint(
      _maxWhiteListMint: number | string | BN
    ): NonPayableTransactionObject<void>;

    setMerkleRoot(
      _merkleRoot: string | number[]
    ): NonPayableTransactionObject<void>;

    setPaused(_state: boolean): NonPayableTransactionObject<void>;

    setPreSaleCost(
      _preSaleCost: number | string | BN
    ): NonPayableTransactionObject<void>;

    setPreSaleTime(
      _preSaleStartTime: number | string | BN
    ): NonPayableTransactionObject<void>;

    setPublicSaleCost(
      _publicSaleCost: number | string | BN
    ): NonPayableTransactionObject<void>;

    setPublicSaleTime(
      _publicSaleStart: boolean
    ): NonPayableTransactionObject<void>;

    setRevealTime(
      _revealedTime: number | string | BN
    ): NonPayableTransactionObject<void>;

    setUriSuffix(_uriSuffix: string): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    symbol(): NonPayableTransactionObject<string>;

    tokenByIndex(
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenOfOwnerByIndex(
      owner: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenURI(
      _tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    uriSuffix(): NonPayableTransactionObject<string>;

    walletOfOwner(_owner: string): NonPayableTransactionObject<string[]>;

    whiteListMint(
      _mintAmount: number | string | BN,
      _merkleProof: (string | number[])[]
    ): PayableTransactionObject<void>;

    withdraw(): NonPayableTransactionObject<void>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    ApprovalForAll(cb?: Callback<ApprovalForAll>): EventEmitter;
    ApprovalForAll(
      options?: EventOptions,
      cb?: Callback<ApprovalForAll>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "ApprovalForAll", cb: Callback<ApprovalForAll>): void;
  once(
    event: "ApprovalForAll",
    options: EventOptions,
    cb: Callback<ApprovalForAll>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
