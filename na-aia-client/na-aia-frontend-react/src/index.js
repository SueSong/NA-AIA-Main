import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import BookScreen from './screens/unused/BookScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/unused/RegisterScreen.jsx';
import AboutUsScreen from './screens/AboutUsScreen';
import MembershipScreen from './screens/MembershipScreen';
import EventScreen from './screens/EventScreen';
import ShippingScreen from './screens/unused/ShippingScreen.jsx';
import PaymentScreen from './screens/unused/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/unused/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckOutScreen';
import RegistrationScreen from './screens/RegistrationScreen'
import ShowcaseScreen from './screens/ShowcaseScreen'
import store from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/book/:id' element={<BookScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegistrationScreen />} />
      <Route path='/membership' element={<MembershipScreen />} />
      <Route path='/events' element={<EventScreen />} />
      <Route path='/about-us' element={<AboutUsScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
         <Route path='/shipping' element={<ShippingScreen />} />
         <Route path='/payment' element={<PaymentScreen />} />
         <Route path='/placeorder' element={<PlaceOrderScreen />} />
         <Route path='/order/:id' element={<OrderScreen />} />
         <Route path='/profile' element={<ProfileScreen />} />
         <Route path='/checkout' element={<CheckoutScreen />} />
         <Route path='/checkout/:membershipType' element={<CheckoutScreen />} />
         <Route path="/showcase" element={<ShowcaseScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} className="scroll-mt-20">
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

