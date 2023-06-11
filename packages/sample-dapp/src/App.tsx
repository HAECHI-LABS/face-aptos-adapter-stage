import './App.css';

import React from 'react';

import { ReactComponent as Logo } from './assets/logo.svg';
import AccountInformation from './components/AccountInformation';
import ConnectAptosAdapter from './components/boxs/ConnectAptosAdapter';
import ConnectNetwork from './components/boxs/ConnectNetwork';
import SignMessage from './components/boxs/SignMessage';
import AptosAdapter from './components/common/AptosAdapter';

function App() {
  return (
    <div className="App">
      <Logo />
      <AccountInformation />
      <div className="wrapper">
        <ConnectNetwork />
        <AptosAdapter>
          <ConnectAptosAdapter />
          <SignMessage />
        </AptosAdapter>
      </div>
    </div>
  );
}

export default App;
