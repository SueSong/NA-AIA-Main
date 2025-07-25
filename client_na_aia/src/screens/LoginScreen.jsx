import React from 'react';
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SignIn from './light/web_light_rd_SI.png';
import signInImg from '../assets/signInUp.jpg';

import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        const verify = async (token) => {
            if (token) {
                try {
                    console.log("google login")
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const userProfile = {
                        name: decodedToken.name,
                        email: decodedToken.email,
                    // Add other fields as needed
                    };
                    //console.log(userProfile.name+" --- "+userProfile.email);
                    // Dispatch user profile to the Redux store
                    try {
                        console.log(userProfile.email)
                        const res = await login({ email: userProfile.email, password: "Google_OpenID" }).unwrap();
                        console.log(res);
                        dispatch(setCredentials({ ...res }));
                        navigate(redirect);
                    } catch (err) {
                        errorToast(5000, err?.data?.message || err.error);
                    }
                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
        }
        const token = sp.get('token');
        //console.log("login >>> "+token);

        verify(token);
        
    }, [dispatch, search, navigate]);

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const errorToast = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
    };
    
    const onSubmit = async (values) => {
        setButtonLoading(true);
        try {
            const { email, password } = values;
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            errorToast(5000, err?.data?.message || err.error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 d-none d-md-block">
                    <img src={signInImg} className="img-fluid" alt="Sign In" />
                </div>
                
                <div className="col-md-6">
                    <Form onSubmit={form.handleSubmit(onSubmit)}>
                        <h2 className="mb-4">Sign In</h2>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="email"
                                    placeholder="Enter email"
                                    {...form.register("email")}
                                />
                            </InputGroup>
                        </Form.Group>
    
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    {...form.register("password")}
                                />
                            </InputGroup>
                        </Form.Group>
    
                        <Button variant="primary" type="submit" className="mt-4" disabled={buttonLoading}>
                            {buttonLoading ? <Spinner as="span" animation="border" size="sm" /> : "Sign In"}
                        </Button>
                    </Form>
    
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                        <hr />
                        <Button variant="outline-secondary" className="mt-3">
                            <a href="http://new.na-aia.org/auth/google">
                                <img src={SignIn} alt="Sign in with Google" style={{ width: '100%' }} />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default LoginScreen;