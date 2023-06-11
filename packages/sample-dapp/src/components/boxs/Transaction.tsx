import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { accountAtom, faceAtom, loginStatusAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import Field from '../common/Field';
import Message from '../common/Message';

const title = 'Aptos Transaction';

interface Signature {
  type: string;
  public_key: string;
  signature: string;
}

interface AptosSignature {
  signature: Signature;
}

function AptosTransaction() {
  const face = useRecoilValue(faceAtom);
  const account = useRecoilValue(accountAtom);
  const isLoggedIn = useRecoilValue(loginStatusAtom);
  const wallet = useWallet();
  const [txHash, setTxHash] = useState('');
  const [txSignature, setTxSignature] = useState('');
  const [receiver, setReceiver] = useState(
    '0x1138393532fb9d6de7807168f0c2c93240b7a88461cd9aea6b79b5c93f8063ab'
  );
  const [amount, setAmount] = useState('0');

  const singleAgentTransaction = async () => {
    setTxHash('');
    setTxSignature('');

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
    setTxSignature('');

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

    const response = await wallet.signTransaction(transaction);

    if (!response) {
      return;
    }

    const signature = JSON.parse(response) as AptosSignature;
    setTxSignature(JSON.stringify(signature.signature));

    console.group('[Transaction Information]');
    console.log('signed tx', response);
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
    if (txHash || txSignature) {
      setTxHash('');
      setTxSignature('');
    }
    return (
      <Box title={title}>
        <Message type="danger">You must initialize Face Wallet first.</Message>
      </Box>
    );
  }
  if (!isLoggedIn) {
    if (txHash || txSignature) {
      setTxHash('');
      setTxSignature('');
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
      {txSignature && (
        <>
          <Message type="info">Signature: {txSignature}</Message>
        </>
      )}
    </Box>
  );
}

export default AptosTransaction;
