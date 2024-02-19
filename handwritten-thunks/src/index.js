import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import { worker } from './api/server';
import { Provider } from 'react-redux';
import './index.css';

const start = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

start();

