import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { FaceWalletName } from '@haechi-labs/face-aptos-adapter-plugin';
import { Env, LoginProvider } from '@haechi-labs/face-types';
import { AptosClient, CoinClient } from 'aptos';
import { BigNumber } from 'ethers';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getNetwork } from '../../libs/network';
import { getProvider } from '../../libs/utils';
import { accountAtom, faceAtom, loginProvidersAtom, loginStatusAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import CheckboxList from '../common/CheckboxList';
import Message from '../common/Message';

const defaultEnv = Env.StageTest;
const title = 'Aptos Adapter';

function ConnectAptosAdapter() {
  const [loginProviders, setLoginProviders] = useRecoilState(loginProvidersAtom);
  const face = useRecoilValue(faceAtom);

  if (!face) {
    return (
      <Box title={title}>
        <Message type="danger">You must initialize Face Wallet first.</Message>
      </Box>
    );
  }

  return (
    <Box title={title}>
      <CheckboxList
        items={Object.values(LoginProvider).map((p) => ({ key: p }))}
        state={loginProviders}
        setState={setLoginProviders as React.Dispatch<React.SetStateAction<string[]>>}
      />
      <AptosAdapterButtons />
    </Box>
  );
}

const AptosAdapterButtons = () => {
  const { connect, connected, disconnect, account } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStatusAtom);
  const setAccount = useSetRecoilState(accountAtom);

  useEffect(() => {
    if (connected) {
      setIsLoggedIn(true);
    }
  }, [connected, setIsLoggedIn]);

  const handleConnect = () => {
    try {
      connect(FaceWalletName);
    } catch (error) {
      console.error('Failed to connect: ', error);
      disconnect();
      setIsLoggedIn(false);
    }
  };

  const handleDisconnect = useCallback(() => {
    try {
      disconnect();
      setIsLoggedIn(false);
      setAccount({});
    } catch (error) {
      console.error('Failed to disconnect: ', error);
    }
  }, [disconnect, setAccount, setIsLoggedIn]);

  const getAccountInfoCallback = useCallback(async () => {
    try {
      if (!isLoggedIn || !connected) {
        return null;
      }
      const address = account?.address;
      if (!address) {
        throw `Failed to get address. Might not be logged in yet.`;
      }

      const network = getNetwork(defaultEnv)!;
      const aptosNodeUrl = getProvider(network);
      const balance = await getBalance(address, aptosNodeUrl);
      console.group('[Account Information]');
      console.log('Address:', account?.address);
      console.groupEnd();

      setAccount({ address: account?.address, balance: balance, user: undefined });
    } catch (error) {
      console.error('Failed to get account: ', error);
      handleDisconnect();
    }
  }, [account?.address, connected, handleDisconnect, isLoggedIn, setAccount]);

  const handleAccount = useCallback(async () => {
    await getAccountInfoCallback();
  }, [getAccountInfoCallback]);

  useEffect(() => {
    if (isLoggedIn) {
      handleAccount();
    }
  }, [connected, handleAccount, isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Message type="info">Connect succeed</Message>
          <Button onClick={getAccountInfoCallback}>Get account information</Button>
        </>
      ) : (
        <Button onClick={handleConnect} disabled={isLoggedIn}>
          Connect Aptos Adapter
        </Button>
      )}
      <Button onClick={handleDisconnect} disabled={!isLoggedIn}>
        Disconnect
      </Button>
    </>
  );
};

const getBalance = async (address: string, nodeUrl: string): Promise<BigNumber> => {
  const aptosClient = new AptosClient(nodeUrl);
  const coinClient = new CoinClient(aptosClient);
  return await coinClient
    .checkBalance(address)
    .then((balance) => BigNumber.from(balance))
    .catch(() => BigNumber.from(0));
};

export default ConnectAptosAdapter;
