import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Card} from 'react-bootstrap';
import { useProfileMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useProfileMutation();

  const dispatch = useDispatch();

  const calculateOrderAmount = (membershipType) => {
    if (membershipType === "Regular") {
      return '$30.00';
    }
    if (membershipType === "Student") {
      return '$15.00';
    }
    if (membershipType === "Corporate") {
      return '$100.00';
    }
    if (membershipType === "Free") {
      return 'Free Tier'
    }
    return 'unknown';
  };

  const membershipCost = calculateOrderAmount(userInfo.membership.membershipType);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* User Profile Section */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input
              id="name"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </form>
      </div>

      {/* My Membership Section */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">My Membership</h2>
        <Card>
            <div className="mt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Membership Type:</h3>
                    <p>{userInfo.membership.membershipType}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-2xl font-bold">{membershipCost}</h4>
                    {membershipCost === "Free Tier" ? null
                    : <p className="text-sm text-gray-500 dark:text-gray-400">per year</p>
                    }
                    
                  </div>
                </div>
                <div className="grid gap-1">
                  {userInfo.membership.membershipExpiry ? <div><label>Expiration Date:</label>
                    <div className="text-sm font-medium">{userInfo.membership.membershipExpiry}</div></div> : null}
                  
                </div>
              </div>
            </div>
          </Card>
      </div>
    </div>
    
  );
};

export default ProfileScreen;
