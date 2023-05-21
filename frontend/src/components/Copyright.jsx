
import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link to="/">TopGram</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Copyright;
