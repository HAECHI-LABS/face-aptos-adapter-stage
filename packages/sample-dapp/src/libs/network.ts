import { Env, Network } from '@haechi-labs/face-types';

export function getNetwork(env: Env) {
  switch (env) {
    case Env.Local:
    case Env.Dev:
    case Env.StageTest:
    case Env.ProdTest:
      return Network.APTOS_TESTNET;
    case Env.StageMainnet:
    case Env.ProdMainnet:
      return Network.APTOS;
  }
}
