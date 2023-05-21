import React, { useEffect, useContext } from "react";
import { Routes, Route, useRoutes, useLocation, useNavigate } from 'react-router-dom';

import AuthContext from "../contexts/auth/Auth.context";
// import ProtectedRoute from "./ProtectedRoute";

// different routes
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost.jsx";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import SubscribePost from "../screens/SubscribePosts";
import Reset from "../screens/ResetPassword.jsx";
import NewPass from "../screens/NewPassword.jsx";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";

const Routing = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const jwt = localStorage.getItem('jwt');

	useEffect(() => {
		if(!Boolean(localStorage.getItem('jwt'))){
			navigate('/login');
		}
	}, [localStorage.getItem('jwt')])

	const element = useRoutes([
		{
		  path: "/signup",
		  element: <Signup />
		},
		{
		  path: "/login",
		  element: <Login />
		},
		{
		  path: "/reset",
		  element: <Reset />
		},
		{
		  path: "/reset/:token",
		  element: <NewPass />
		},
		{
		  path: "/",
		  element: <SubscribePost />
		},
		{
		  path: "/explore",
		  element: <Home />
		},
		{
		  path: "/create",
		  element: <CreatePost />
		},
		{
		  path: "/profile",
		  element: <Profile />
		},
		{
		  path: "/profile/:userid",
		  element: <UserProfile />
		}
	  ]);

		if (!element) return null;

	return (
			// <Switch>
			// 	{/* Public routes */}
			// 	<Route exact path="/login" component={Login} />
			// 	<Route exact path="/signup" component={Signup} />
			// 	<Route exact path="/reset" component={Reset} />
			// 	<Route exact path="/reset/:token" component={NewPass} />

			// 	{/* Separate the protected routes from public ones */}
			// 	<ProtectedRoute exact path="/" component={SubscribePost} />
			// 	<ProtectedRoute exact path="/explore" component={Home} />
			// 	<ProtectedRoute exact path="/create" component={CreatePost} />
			// 	<ProtectedRoute exact path="/profile" component={Profile} />
			// 	<ProtectedRoute exact path="/profile/:userid" component={UserProfile} />

			// 	{/* in case we want to handle the 404 page not found */}
			// 	{/* <Route component={NotFound} /> */}
			// </Switch>
			<>
				<AnimatePresence mode="wait">
			    	{React.cloneElement(element, { key: location.pathname })}
				</AnimatePresence>
			</>
	);
};

export default Routing;
