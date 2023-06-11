import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import nacl from 'tweetnacl';

import { faceAtom, loginStatusAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import Field from '../common/Field';
import Message from '../common/Message';

const title = 'Sign Message';

function SignMessage() {
  const face = useRecoilValue(faceAtom);
  const isLoggedIn = useRecoilValue(loginStatusAtom);

  const [message, setMessage] = useState('');
  const [nonce, setNonce] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const wallet = useWallet();

  const aptosSignMessage = async () => {
    setSignedMessage('');

    if (!message) {
      alert('Please set message');
      return;
    }

    if (!wallet) {
      return;
    }

    const response = await wallet.signMessage({ message, nonce });
    console.group('Aptos Sign Message');
    console.log(response);
    console.groupEnd();

    if (!response) {
      return;
    }

    const verified = nacl.sign.detached.verify(
      Buffer.from(response.fullMessage),
      Buffer.from((response.signature as string).slice(2), 'hex'),
      Buffer.from(wallet.account!.publicKey.slice(2) as string, 'hex')
    );

    setSignedMessage(JSON.stringify(response));

    console.group('[Sign Information]');
    console.log('address: ' + wallet.account?.address);
    console.log('Signed message:', response);
    console.log('Verified:', verified);
    console.groupEnd();
  };

  const handleSignMessage = async () => {
    try {
      await aptosSignMessage();
    } catch (error) {
      console.error('Failed to sign message: ', error);
    }
  };

  if (!face) {
    if (signedMessage) {
      setSignedMessage('');
    }
    return (
      <Box title={title}>
        <Message type="danger">You must initialize Face Wallet first.</Message>
      </Box>
    );
  }
  if (!isLoggedIn) {
    if (signedMessage) {
      setSignedMessage('');
    }
    return (
      <Box title={title}>
        <Message type="danger">You must connect Aptos Adapter first.</Message>
      </Box>
    );
  }

  return (
    <Box title={title}>
      <Field label="Message">
        <input className="input" value={message} onChange={(e) => setMessage(e.target.value)} />
      </Field>
      <Field label="Nonce">
        <input className="input" value={nonce} onChange={(e) => setNonce(e.target.value)} />
      </Field>
      <Button onClick={handleSignMessage}>Sign Message</Button>
      {signedMessage && (
        <Message type="info" className="has-text-left">
          <h4 className="has-text-weight-bold">Signed message</h4>
          <div>{signedMessage}</div>
          <br />
        </Message>
      )}
    </Box>
  );
}

export default SignMessage;
