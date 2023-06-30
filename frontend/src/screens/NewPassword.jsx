import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_PWD_URL } from "../service/apiCalls";
import Copyright from "../components/Copyright";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';

// General Styles
const useStyles = makeStyles((theme) => ({
	root: {
		height: "-webkit-fill-available",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	},
	container: {
		margin: " auto 0px",
	},
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "40px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const NewPass = () => {
	const classes = useStyles();
	const history = useNavigate();
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);

	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handlePostData = () => {
		// axios.post(NEW_PWD_URL, { password, token })
		// 	.then((res) => {
		// 		const data = res.data;
		// 		if (data.error) {
		// 			setSuccessMsg(false);
		// 			setErrorMsg(true);
		// 		} else {
		// 			setErrorMsg(false);
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
		NEW_PWD_URL({ password, token })
			.then((res) => {
				const data = res.data;
				if (data.error) {
					setSuccessMsg(false);
					setErrorMsg(true);
				} else {
					setErrorMsg(false);
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
	};
	return (
		<Grid container className={classes.root}>
			<Grid className={classes.image} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6} className={classes.container}>
				<Container component="main" maxWidth="xs" style={{ paddingBottom: "64px" }}>
					<CssBaseline />
					<div className={classes.paper}>
						<Typography
							className={classes.Logo}
							variant="h2"
							gutterBottom
							style={{ fontFamily: "Grand Hotel, cursive " }}
						>
							TopGram
						</Typography>
						{/* Check Password */}
						{password !== "" && confirmPassword !== "" ? (
							password !== confirmPassword ? (
								<Alert variant="outlined" severity="error">
									Confirm password doesn't match the password — check it out !
								</Alert>
							) : null
						) : null}
						{/* Handle Error Notification if there is any */}
						{errorMsg ? (
							<Alert variant="outlined" severity="error">
								Session expired ! Try Again with a new Request — check it Again !
							</Alert>
						) : null}
						{/* Handle Success Notification */}
						{successMsg ? (
							<Alert variant="outlined" severity="success">
								Password Updated successfully — check it out !
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="Confirm password"
								label="Confirm Password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={password !== "" && confirmPassword !== "" ? false : true}
								onClick={handlePostData}
							>
								Submit The New Password
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

export default NewPass;
