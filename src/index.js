// ui
import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/index.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Analytics } from 'aws-amplify'

import App from './App';

// amplify configuration
import config from "./aws-exports";
Amplify.configure(config);

// analytics auto-tracker
Analytics.autoTrack('session', {
	enable: true,
	immediate: true
});

Analytics.autoTrack('pageView', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, by default is 'multiPageApp'
  // you need to change it to 'SPA' if your app is a single-page app like React
  type: 'SPA',
  immediate: true
});

Analytics.autoTrack('event', {
  enable: true,
  immediate: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
