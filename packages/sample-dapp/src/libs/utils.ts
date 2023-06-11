import { Network } from '@haechi-labs/face-sdk';

export function getProvider(network: Network) {
  switch (network) {
    case Network.ROPSTEN:
      return 'https://eth-ropsten.alchemyapi.io/v2/UghLajTzDNBAO9EByRXWmIqduze2_jJ2';
    case Network.GOERLI:
      return 'https://ethereum-goerli-rpc.allthatnode.com';
    case Network.ETHEREUM:
      return 'https://mainnet.infura.io/v3/';
    case Network.MUMBAI:
      return 'https://matic-mumbai.chainstacklabs.com';
    case Network.POLYGON:
      return 'https://polygon-rpc.com/';
    case Network.BNB_SMART_CHAIN:
      return 'https://bsc-dataseed.binance.org/';
    case Network.BNB_SMART_CHAIN_TESTNET:
      return 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    case Network.KLAYTN:
      return 'https://public-node-api.klaytnapi.com/v1/cypress';
    case Network.BAOBAB:
      return 'https://api.baobab.klaytn.net:8651/';
    case Network.BORA:
      return 'https://tn.henesis.io/bora/mainnet?clientId=6e290e01ee92e21de4e52c0344bff48c';
    case Network.BORA_TESTNET:
      return 'https://tn.henesis.io/bora/testnet?clientId=6e290e01ee92e21de4e52c0344bff48c';
    case Network.SOLANA_DEVNET:
      return 'https://api.devnet.solana.com';
    case Network.SOLANA:
      return 'https://api.mainnet-beta.solana.com';
    case Network.NEAR:
      return 'https://near-mainnet.infura.io/v3/c36d434dfda34fb5b7382de82565be43';
    case Network.NEAR_TESTNET:
      return 'https://near-testnet.infura.io/v3/c36d434dfda34fb5b7382de82565be43';
    case Network.APTOS:
      return 'https://fullnode.mainnet.aptoslabs.com/v1';
    case Network.APTOS_TESTNET:
      return 'https://fullnode.testnet.aptoslabs.com/v1';
    case Network.MEVERSE:
      return 'https://rpc.meversemainnet.io';
    case Network.MEVERSE_TESTNET:
      return 'https://rpc.meversetestnet.io';
    case Network.PSM_TESTNET:
      return 'https://tn.henesis.io/maplenet/testnet?clientId=815fcd01324b8f75818a755a72557750';
    default:
      throw Error(`cannot resolve provider with network : ${network}`);
  }
}
