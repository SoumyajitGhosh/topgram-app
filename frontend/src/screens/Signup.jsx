import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_URL } from "../service/apiCalls";
import Copyright from "../components/Copyright";
import { EmailRegex } from "../utils/regex";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import { useTheme } from "@mui/system";

const Signup = () => {
	const history = useNavigate();
	const theme = useTheme();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [formatValidation, setFormatValidation] = useState(false);
	const [authValidation, setAuthValidation] = useState(false);
	const [confirmValidation, setConfirmValidation] = useState(false);

	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handleInputChanges = (e) => {
		switch (e.target.name) {
			case "username":
				setName(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	const handlePostData = () => {
		// Here we check just if the given email has a correct format
		if (EmailRegex.test(email)) {
			// axios.post(SIGNUP_URL, {
			// 	name,
			// 	password,
			// 	email,
			// })
			// 	.then((res) => {
			// 		const data = res.data;
			// 		if (data.error) {
			// 			setFormatValidation(false);
			// 			setAuthValidation(true);
			// 		} else {
			// 			// show the confirmation message
			// 			setConfirmValidation(true);
			// 			// set a timeOut before redirecting the user to login page
			// 			timerRef.current = setTimeout(() => {
			// 				history("/login");
			// 			}, 2800);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			SIGNUP_URL({
				name,
				password,
				email,
			})
				.then((res) => {
					const data = res.data;
					if (data.error) {
						setFormatValidation(false);
						setAuthValidation(true);
					} else {
						// show the confirmation message
						setConfirmValidation(true);
						// set a timeOut before redirecting the user to login page
						timerRef.current = setTimeout(() => {
							history("/login");
						}, 2800);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};

	return (
		<Container  maxWidth="xs" component={motion.div}
		initial="hidden"
		animate="visible"
		exit={{ opacity: 0, transition: { duration: 0.5 } }}>
			<Grid sx={theme.paper}>
				<CssBaseline />
				<Typography sx={theme.Logo} variant="h2">
					TopGram
				</Typography>
				{/*  Check the format of the Email */}
				{formatValidation ? (
					<Alert variant="outlined" severity="error">
						Invalid Email format — check it out!
					</Alert>
				) : null}
				{/*  Check the if the Email already Exist */}
				{authValidation ? (
					<Alert variant="outlined" severity="error">
						This Email is already token — check it out!
					</Alert>
				) : null}
				{/* Success notification */}
				{confirmValidation ? (
					<Alert variant="outlined" severity="success">
						Your account has been created successfully — check it out!
					</Alert>
				) : null}
				<form sx={theme.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="UserName"
								name="username"
								variant="outlined"
								required
								fullWidth
								label="User Name"
								autoFocus
								value={name}
								onChange={handleInputChanges}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={handleInputChanges}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={handleInputChanges}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid> */}
					</Grid>
					<Button
						fullWidth
						color="primary"
						sx={theme.submit}
						variant={email !== "" && password !== "" ? "contained": "outlined"}
						disabled={email !== "" && password !== "" ? false : true}
						onClick={handlePostData}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" style={{ textDecoration: "none" }}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</Grid>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Signup;
