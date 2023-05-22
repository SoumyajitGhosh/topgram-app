
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RESET_PWD_URL } from "../service/apiCalls";
import { EmailRegex } from "../utils/regex";
import Copyright from "../components/Copyright";
// Material-UI Components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import { useTheme } from "@mui/material";

const Reset = () => {
	const history = useNavigate();
	const theme = useTheme();
	const [email, setEmail] = useState("");

	const [emailCheck, setEmailCheck] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);

	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handleInputChanges = (e) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;

			default:
				break;
		}
	};

	const handlePostData = () => {
		if (EmailRegex.test(email)) {
			// axios.post(RESET_PWD_URL, { email })
			// 	.then((res) => {
			// 		const data = res.data;
			// 		console.log(data);
			// 		if (data.error) {
			// 			setEmailCheck(false);
			// 			setErrorMsg(true);
			// 		} else {
			// 			// make sure to not display another Alert instead
			// 			setEmailCheck(false);
			// 			setErrorMsg(false);
			// 			// show the confirmation message
			// 			setSuccessMsg(true);
			// 			// set a time before we redirect the user to login page
			// 			timerRef.current = setTimeout(() => {
			// 				history("/login");
			// 			}, 3000);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			RESET_PWD_URL({ email })
				.then((res) => {
					const data = res.data;
					console.log(data);
					if (data.error) {
						setEmailCheck(false);
						setErrorMsg(true);
					} else {
						// make sure to not display another Alert instead
						setEmailCheck(false);
						setErrorMsg(false);
						// show the confirmation message
						setSuccessMsg(true);
						// set a time before we redirect the user to login page
						timerRef.current = setTimeout(() => {
							history("/login");
						}, 3000);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setErrorMsg(false);
			setEmailCheck(true);
		}
	};

	return (
		<Grid container sx={{ height: "-webkit-fill-available" }}>
			<Grid sx={theme.imageStyle} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6} sx={theme.container}>
				<Container component="main" maxWidth="xs" style={{ paddingBottom: "64px" }}>
					<CssBaseline />
					<div sx={theme.paper}>
						<Typography
							sx={theme.Logo}
							variant="h2"
							gutterBottom
							style={{ fontFamily: "Grand Hotel, cursive " }}
						>
							TopGram
						</Typography>
						{emailCheck ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{errorMsg ? (
							<Alert variant="outlined" severity="error">
								No User exists with that email — check it Again !
							</Alert>
						) : null}
						{successMsg ? (
							<Alert variant="outlined" severity="success">
								The reset password link has been sent — check out your email inbox !
							</Alert>
						) : null}
						<form sx={theme.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoFocus
								value={email}
								onChange={handleInputChanges}
							/>
							<Button
								fullWidth
								variant="outlined"
								color="primary"
								sx={theme.submit}
								disabled={email !== "" ? false : true}
								onClick={handlePostData}
							>
								Reset your Password
							</Button>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default Reset;
