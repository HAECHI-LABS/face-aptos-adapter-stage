import './App.css';

import React from 'react';

import { ReactComponent as Logo } from './assets/logo.svg';
import AccountInformation from './components/AccountInformation';
import ConnectAptosAdapter from './components/boxs/ConnectAptosAdapter';
import InitializeNetwork from './components/boxs/InitializeNetwork';
import SignMessage from './components/boxs/SignMessage';
import Transaction from './components/boxs/Transaction';
import AptosAdapter from './components/common/AptosAdapter';

function App() {
  return (
    <div className="App">
      <Logo />
      <AccountInformation />
      <div className="wrapper">
        <InitializeNetwork />
        <AptosAdapter>
          <ConnectAptosAdapter />
          <SignMessage />
          <Transaction />
        </AptosAdapter>
      </div>
    </div>
  );
}

export default App;
