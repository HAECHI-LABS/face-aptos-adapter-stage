import { LoginProviderType } from '@haechi-labs/face-types';
import { atom } from 'recoil';

export const loginProvidersAtom = atom<LoginProviderType[]>({
  key: 'loginProvidersAtom',
  default: [],
});
