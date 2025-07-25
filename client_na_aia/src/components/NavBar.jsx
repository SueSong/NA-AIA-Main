import React, { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux'; 
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"; // Update path if needed
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const routeList = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about-us",
    label: "About Us",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/membership",
    label: "Membership",
  },
  {
    href: "/showcase",
    label: "Showcase",
  },
];


export const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth); // Correctly use useSelector

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className='navbar-custom' style={{ height: '90px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {routeList.map(({ href, label }) => (
              <Nav.Link as={Link} to={href} key={href} className="nav-link" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {label}
              </Nav.Link>
            ))}
          </Nav>
          
          {userInfo ? (
            <Nav>
              <Nav.Link as={Link} to="/admin" className="nav-link" style={{ fontSize: '1.2rem' }}>
                Admin
              </Nav.Link>
              <Nav.Link to="/profile" className="flex items-center">
                <span>Profile</span>
              </Nav.Link>
              <Nav.Link onClick={logoutHandler} className="flex items-center">
                <span>Log out</span>
              </Nav.Link>
            </Nav> 
          ) : (
            <Nav>
            <Nav.Link as={Link} to="/login" className="nav-link" style={{ fontSize: '1.2rem' }}>
              <Button variant="outline-primary">Login</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="nav-link" style={{ fontSize: '1.2rem' }}>
              <Button variant="outline-success">Register</Button>
            </Nav.Link>
          </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
