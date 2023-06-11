import {
  getPlatFormCoinDecimalByBlockchain,
  isEthlikeBlockchain,
  Network,
  networkToBlockchain,
} from '@haechi-labs/face-types';
import { BigNumber, utils } from 'ethers';

export function formatPlatformCoin(balance: BigNumber, network: Network) {
  const blockchain = networkToBlockchain(network);
  if (isEthlikeBlockchain(blockchain)) {
    return utils.formatEther(balance);
  } else {
    return utils.formatUnits(balance, getPlatFormCoinDecimalByBlockchain(blockchain));
  }
}
