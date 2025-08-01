import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <NavBar />
      <main>
        <div>
          <Outlet  />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
