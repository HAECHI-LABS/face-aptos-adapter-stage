import { Face } from '@haechi-labs/face-sdk';
import { atom } from 'recoil';

export const faceAtom = atom<Face | null>({
  key: 'faceAtom',
  default: null,
  dangerouslyAllowMutability: true,
});
