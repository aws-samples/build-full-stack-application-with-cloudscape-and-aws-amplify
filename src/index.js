// ui
import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/index.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify'

import App from './App';

// amplify configuration
import config from "./aws-exports";
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
