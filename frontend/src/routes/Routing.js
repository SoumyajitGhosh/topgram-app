import React, { useEffect } from "react";
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';

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
import {AnimatePresence} from "framer-motion/dist/framer-motion";
import Messages from "../screens/Messages";

const Routing = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const jwt = localStorage.getItem('jwt');
	const isUserAuthenticated = !!jwt; // Check if the user is authenticated (logged in)

	const Authenticate = (children) => {
		if(isUserAuthenticated){
			return children;
		}
		else 
			return <Login />
	}


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
		  element:  Authenticate(<SubscribePost />)
		},
		{
		  path: "/explore",
		  element: Authenticate(<Home />)
		},
		{
		  path: "/create",
		  element: Authenticate(<CreatePost />)
		},
		{
		  path: "/profile",
		  element: Authenticate(<Profile />)
		},
		{
		  path: "/profile/:userid",
		  element: Authenticate(<UserProfile />)
		},
		{
		  path: "/messages",
		  element: Authenticate(<Messages />)
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
