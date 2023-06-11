import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { faceAtom, loginStatusAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import Field from '../common/Field';
import Message from '../common/Message';

const title = 'Default Sign Message';

function SignMessage() {
  const face = useRecoilValue(faceAtom);
  const isLoggedIn = useRecoilValue(loginStatusAtom);
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const { signMessage } = useWallet();

  const handleSignMessage = async (message: string, nonce: string) => {
    const signed = await signMessage({ message, nonce });
    setSignedMessage(signed!.signature as string);
  };

  if (!face) {
    return (
      <Box title={title}>
        <Message type="danger">You must connect to the network first.</Message>
      </Box>
    );
  }
  if (!isLoggedIn) {
    return (
      <Box title={title}>
        <Message type="danger">You must connect Aptos Adapter first.</Message>
      </Box>
    );
  }

  return (
    <Box title={title}>
      <Field label="Message">
        <textarea
          className="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>
      <Button onClick={() => handleSignMessage(message, '123123')}>Sign Message</Button>

      {signedMessage && (
        <Message type="info" className="has-text-left">
          <h4 className="has-text-weight-bold">Signed message</h4>
          <div>{signedMessage}</div>
        </Message>
      )}
    </Box>
  );
}

export default SignMessage;
