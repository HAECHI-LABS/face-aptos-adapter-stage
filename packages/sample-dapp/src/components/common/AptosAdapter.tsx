import { AptosWalletAdapterProvider, Wallet } from '@aptos-labs/wallet-adapter-react';
import { FaceWallet } from 'face-aptos-adapter-plugin';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';

import { faceAtom, loginProvidersAtom } from '../../store';

const autoConnectLocalStorageKey = 'AptosWalletAutoConnect';

function AptosAdapter({ children }: { children?: ReactNode }) {
  const loginProviders = useRecoilValue(loginProvidersAtom);
  const { autoConnect } = useAutoConnect();
  const face = useRecoilValue(faceAtom);

  const aptosWallets: Wallet<string>[] = useMemo(
    () => (face ? [new FaceWallet(face, loginProviders) as Wallet] : []),
    [face, loginProviders]
  );

  if (!face) {
    return <>{children}</>;
  }

  return (
    <AutoConnectProvider>
      <AptosWalletAdapterProvider key={Date.now()} plugins={aptosWallets} autoConnect={autoConnect}>
        {children}
      </AptosWalletAdapterProvider>
    </AutoConnectProvider>
  );
}

interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

const AutoConnectContext = createContext<AutoConnectContextState>({} as AutoConnectContextState);

function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext);
}

const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [autoConnect, setAutoConnect] = useState<boolean>(() => {
    try {
      const isAutoConnect = localStorage.getItem(autoConnectLocalStorageKey);
      if (isAutoConnect) return JSON.parse(isAutoConnect);
    } catch (e: any) {
      if (typeof window !== 'undefined') {
        console.error(e);
      }
    }
  });

  useEffect(() => {
    try {
      if (!autoConnect) {
        localStorage.removeItem(autoConnectLocalStorageKey);
      } else {
        localStorage.setItem(autoConnectLocalStorageKey, JSON.stringify(autoConnect));
      }
    } catch (error: any) {
      if (typeof window !== 'undefined') {
        console.error(error);
      }
    }
  }, [autoConnect]);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};

export default AptosAdapter;
