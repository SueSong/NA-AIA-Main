import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.js';
import LoginScreen from './screens/LoginScreen.jsx';
import AboutUsScreen from './screens/AboutUsScreen';
import MembershipScreen from './screens/MembershipScreen';
import EventScreen from './screens/EventScreen.jsx';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegisterScreen'
import ShowcaseScreen from './screens/ShowcaseScreen.jsx'
import store from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CreateEventScreen from './screens/CreateEventScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegistrationScreen />} />
      <Route path='/membership' element={<MembershipScreen />} />
      <Route path='/events' element={<EventScreen />} />
      <Route path='/about-us' element={<AboutUsScreen />} />
      <Route path="/showcase" element={<ShowcaseScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>         
         <Route path='/profile' element={<ProfileScreen />} />
         <Route path='/admin' element={<CreateEventScreen />} />        
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

