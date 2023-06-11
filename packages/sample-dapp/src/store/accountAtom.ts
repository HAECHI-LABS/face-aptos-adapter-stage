import { FaceLoginResponse } from '@haechi-labs/face-types';
import { BigNumber } from 'ethers';
import { atom } from 'recoil';

type Account = {
  address?: string;
  balance?: BigNumber;
  user?: FaceLoginResponse;
};

export const accountAtom = atom<Account>({
  key: 'accountAtom',
  default: {},
});
