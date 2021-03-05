import React from 'react';

import { CartContextProvider } from './Cart';
import { AlertContextProvider } from './Alert';

const ContextProvider = ({ children }) => (
  <AlertContextProvider>
    <CartContextProvider>
      {children}
    </CartContextProvider>
  </AlertContextProvider>
);

export default ContextProvider;
