import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import store from './redux/configureStore'
import { getUser } from './redux/userSlice';
import { getCustomers } from './redux/customerSlice';
import { getProducts } from './redux/productSlice';

store.dispatch(getUser)
store.dispatch(getCustomers)
store.dispatch(getProducts)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

