import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
