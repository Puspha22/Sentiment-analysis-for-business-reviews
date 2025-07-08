import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import Routing from './routing/Routing';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer/>
      <ChakraProvider theme={theme}>
        {/* Consider adding an ErrorBoundary here for production robustness */}
        <Routing />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
