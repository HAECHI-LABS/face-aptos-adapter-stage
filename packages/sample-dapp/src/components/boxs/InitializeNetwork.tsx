import { Face } from '@haechi-labs/face-sdk';
import { Env } from '@haechi-labs/face-types';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { API_KEY } from '../../config/apiKey';
import { getNetwork } from '../../libs/network';
import { faceAtom, networkAtom } from '../../store';
import Box from '../common/Box';
import Button from '../common/Button';
import Field from '../common/Field';
import Message from '../common/Message';

const defaultEnv = Env.StageTest;
const defaultIframeUrl = 'https://app.stage-test.facewallet.xyz';
const title = 'Initialize Network';

function InitializeNetwork() {
  const [face, setFace] = useRecoilState(faceAtom);
  const [apiKey, setApiKey] = useState<string>(API_KEY);
  const setNetwork = useSetRecoilState(networkAtom);

  const isFaceInitialized = !!face;

  const connectTo = () => {
    const defaultNetwork = getNetwork(defaultEnv);
    setNetwork(defaultNetwork);

    try {
      if (isFaceInitialized) {
        return;
      } else {
        const face = new Face({
          apiKey: apiKey,
          network: defaultNetwork,
          env: defaultEnv,
          iframeUrl: defaultIframeUrl,
        } as never);
        setFace(face);
      }
    } catch (e) {
      alert('Error occurred');
      console.error(e);
    }
  };

  return (
    <Box title={title}>
      {isFaceInitialized && (
        <Message type="info">
          <div className="has-text-weight-bold">Connected to Aptos Testnet</div>
          <div>Env: {defaultEnv}</div>
        </Message>
      )}
      <Field label="Env">
        <Field label={defaultEnv} />
      </Field>
      <Field label="API key">
        <input
          name="api-key"
          className="input"
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
          value={apiKey}
        />
      </Field>
      <Button onClick={() => connectTo()} disabled={isFaceInitialized}>
        Initialize Face Wallet
      </Button>
    </Box>
  );
}

export default InitializeNetwork;
