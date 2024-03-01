import React from 'react';
import ReactDOM from 'react-dom/client';
import { EnsureKontentAsParent } from "./customElement/EnsureKontentAsParent";
import { IntegrationApp } from './IntegrationApp';
import { CustomElementContext } from './customElement/CustomElementContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Cannot find the root element. Please, check your html.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <EnsureKontentAsParent>
      <CustomElementContext height={500}>
        <IntegrationApp />
      </CustomElementContext>
    </EnsureKontentAsParent>
  </React.StrictMode>
);
