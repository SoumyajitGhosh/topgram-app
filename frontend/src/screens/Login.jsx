import React, { useState, /*useContext*/ } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AuthenticationContext from "../contexts/auth/Auth.context";
import { LOGIN_URL } from "../service/apiCalls";
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
import { useTheme } from "@mui/material";
import { fetchCookies } from "../utils/fetchCookies";

const Login = () => {
	const theme = useTheme();
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formatValidation, setFormatValidation] = useState(false);
	const [authValidation, setAuthValidation] = useState(false);

	const handleInputChanges = (e) => {
		switch (e.target.name) {
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
		if (EmailRegex.test(email)) {
			// axios.post(LOGIN_URL, { password, email })
			// 	.then((res) => {
			// 		const data = res.data;
			// 		if (data.error) {
			// 			setFormatValidation(false);
			// 			setAuthValidation(true);
			// 		} else {
			// 			// we store our generated token in order to use it to access protected endpoints
			// 			localStorage.setItem("jwt", data.token);
			// 			// we also store the user details
			// 			localStorage.setItem("user", JSON.stringify(data.user));
			// 			dispatch({ type: FETCH_USER_DATA, payload: data.user });
			// 			// we redirect the user to home page
			// 			history("/");
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		// that should be changed in Production
			// 		// TODO : Make an error handler
			// 		console.log(err);
			// 	});
			LOGIN_URL({ password, email })
				.then((res) => {
					// we also store the user details
					localStorage.setItem("user", JSON.stringify(res.user));
					// we store our generated token in order to use it to access protected endpoints
					localStorage.setItem("jwt", fetchCookies("token"));
					// we redirect the user to home page
					history("/");		
					// }
				})
				.catch((err) => {
					// that should be changed in Production
					// TODO : Make an error handler
					console.log(err);
				});
			
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};

	return (
		<Grid 
			container 
			component={motion.div}
			initial="hidden"
			animate="visible"
			exit={{ opacity: 0, transition: { duration: 0.5 } }}
		>
			<Grid sx={theme.imageStyle} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Grid sx={theme.paper}>
						<Typography variant="h2" gutterBottom /*sx={{ fontFamily: "Grand Hotel, cursive"}}*/>
							TopGram
						</Typography>
						{formatValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{authValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid given Email/Password — check it out!
							</Alert>
						) : null}
						<form sx={theme.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								// autoComplete="email"
								autoFocus
								value={email}
								onChange={handleInputChanges}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={handleInputChanges}
							/>

							<Button
								fullWidth
								variant={email !== "" && password !== "" ? "contained": "outlined"}
								color="primary"
								sx={theme.submit}
								disabled={email !== "" && password !== "" ? false : true}
								onClick={handlePostData}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link to="/reset" style={{ textDecoration: "none" }}>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link to="/signup" style={{ textDecoration: "none" }}>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</Grid>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default Login;
