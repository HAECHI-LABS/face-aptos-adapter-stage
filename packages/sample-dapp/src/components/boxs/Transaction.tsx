import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, Types } from 'aptos';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getProvider } from '../../libs/utils';
import { faceAtom, loginStatusAtom, networkAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import Field from '../common/Field';
import Message from '../common/Message';

const title = 'Aptos Transaction';

function AptosTransaction() {
  const face = useRecoilValue(faceAtom);
  const isLoggedIn = useRecoilValue(loginStatusAtom);
  const network = useRecoilValue(networkAtom)!;
  const wallet = useWallet();
  const [txHash, setTxHash] = useState('');
  const [receiver, setReceiver] = useState(
    '0x1138393532fb9d6de7807168f0c2c93240b7a88461cd9aea6b79b5c93f8063ab'
  );
  const [amount, setAmount] = useState('0');

  const singleAgentTransaction = async () => {
    setTxHash('');

    if (!receiver) {
      alert('Please enter contract address');
      return;
    }

    const transaction = {
      arguments: [receiver, ethers.utils.parseUnits(amount, 8).toString()],

      function: '0x1::coin::transfer',

      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };
    const response = await wallet.signAndSubmitTransaction(transaction);

    if (!response) {
      return;
    }

    setTxHash(response.hash);

    console.group('[Transaction Information]');
    console.log('Transaction signature', response.hash);
    console.groupEnd();
  };

  const signSingleAgentTransaction = async () => {
    setTxHash('');

    if (!receiver) {
      alert('Please enter contract address');
      return;
    }

    const transaction = {
      arguments: [receiver, ethers.utils.parseUnits(amount, 8).toString()],

      function: '0x1::coin::transfer',

      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };

    const submitTransactionRequest = await wallet.signTransaction(transaction);
    const aptosClient = new AptosClient(getProvider(network));

    const pendingTransaction = await aptosClient.submitTransaction(
      Buffer.from(
        (
          (submitTransactionRequest.signature as Types.AccountSignature_Ed25519Signature)
            .signature as string
        ).slice(2),
        'hex'
      )
    );
    await aptosClient.waitForTransaction(pendingTransaction.hash);
    setTxHash(pendingTransaction.hash);

    if (!submitTransactionRequest) {
      return;
    }

    console.group('[Transaction Information]');
    console.log('SubmitTransactionRequest: ', submitTransactionRequest);
    console.groupEnd();
  };

  const handleSingleAgentTransaction = async () => {
    try {
      await singleAgentTransaction();
    } catch (error) {
      console.error('Failed to send transaction: ', error);
    }
  };

  const handleSignSingleAgentTransaction = async () => {
    try {
      await signSingleAgentTransaction();
    } catch (error) {
      console.error('Failed to sign transaction: ', error);
    }
  };

  if (!face) {
    if (txHash) {
      setTxHash('');
    }
    return (
      <Box title={title}>
        <Message type="danger">You must initialize Face Wallet first.</Message>
      </Box>
    );
  }
  if (!isLoggedIn) {
    if (txHash) {
      setTxHash('');
    }
    return (
      <Box title={title}>
        <Message type="danger">You must connect Aptos Adapter first.</Message>
      </Box>
    );
  }

  return (
    <Box title={title}>
      <Field label="Receiver">
        <input className="input" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
      </Field>
      <Field label="Amount">
        <input
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
      </Field>
      <Button onClick={handleSignSingleAgentTransaction}>Sign SingleAgent Transaction</Button>
      <Button onClick={handleSingleAgentTransaction}>Send SingleAgent Transaction</Button>
      {txHash && (
        <>
          <Message type="info">Hash: {txHash}</Message>
          <Message type="info">
            <a
              href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
              rel="noopener noreferrer"
              target="_blank">
              Explorer Link
            </a>
          </Message>
        </>
      )}
    </Box>
  );
}

export default AptosTransaction;
