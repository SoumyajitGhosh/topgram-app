import React, { useEffect, useContext } from "react";
import { Routes, Route, useRoutes, useLocation } from 'react-router-dom';

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
	// const { state } = useContext(AuthContext);

	// check if we are already authenticated
	// useEffect(() => {
	// 	state.isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />;
	// });

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

	  const location = useLocation();

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
