import { createTheme, responsiveFontSizes } from "@mui/material";

const defaultTheme = createTheme(); //accessing old theme in new create theme

let lightTheme = createTheme({
    typography: {
       h2: {
           fontFamily: "Grand Hotel, cursive"
       }
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '20vh'
    },
    imageStyle: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		// backgroundImage: "url(https://source.unsplash.com/)",
		backgroundImage: "url(https://source.unsplash.com/random?social-media,people,social,instruments,singing,dancing,dogs,cats,nature,city,night-life,movies,anime,sports)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "100vh",
	},
    Logo: {
		fontFamily: "Grand Hotel, cursive",
		// marginBottom: "42px",
		width: "fit-content",
        marginBottom: defaultTheme.spacing(3),
	},
	avatar: {
		margin: defaultTheme.spacing(1),
		backgroundColor: defaultTheme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: defaultTheme.spacing(3),
	},
	submit: {
		margin: defaultTheme.spacing(3, 0, 2),
	},
    container: {
		margin: " auto 0px",
	},
	search: {
		position: "relative",
		borderRadius: defaultTheme.shape.borderRadius,
		backgroundColor: "rgba(0, 0, 0, 0.075)",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.03)",
		},
		marginRight: defaultTheme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[defaultTheme.breakpoints.up("sm")]: {
			marginLeft: defaultTheme.spacing(3),
			width: "auto",
		},
		margin: "0px auto",
	},
	searchIcon: {
		padding: defaultTheme.spacing(0, 2),
		height: "100%",
		// position: "absolute",
		marginTop: '10px',
		pointerEvents: "none",
		// display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "rgba(0, 0, 0, 0.54)",
	},
	title: {
		// display: "none",
		// [defaultTheme.breakpoints.up("sm")]: {
		display: "block",
		// },
		fontFamily: "Grand Hotel, cursive",
		color: "rgba(0, 0, 0, 0.54)",
	},
	sectionDesktop: {
		display: "none",
		[defaultTheme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[defaultTheme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	modalStyle: {
		// top: `50%`,
		// left: `50%`,
		transform: `translate(50%, 50%)`,
		border: "1px solid rgba(0, 0, 0, 0.015)",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		transition: defaultTheme.transitions.create("width"),
		width: "100%",
		// [defaultTheme.breakpoints.up("sm")]: {
		// 	width: "30ch",
		// },
		color: "#000000",
	},
	filesContainer: { 
		maxWidth: "500px", 
		margin: "auto" 
	},
	actionsContainer: {
		width: "30%",
		margin: "auto",
		marginBottom: defaultTheme.spacing(2),
	},
	finishStyle: {
		width: "fit-content",
		margin: "auto",
	},
	dialogContainer: {
		"& .MuiDialog-paperWidthSm": {
			width: "80%",
			maxWidth: "900px",
		},
	},
	homePageRoot: {
		maxWidth: 500,
		margin: "20px auto",
		"& .MuiTextField-root": {
			width: "100%",
		},
		"& .MuiOutlinedInput-multiline": {
			paddingTop: "8px",
			paddingBottom: "8px",
			marginTop: "5px",
			marginLeft: "5px",
			marginRight: "5px",
		},
		"& .MuiCardContent-root:last-child": {
			paddingBottom: "10px",
		},
		"& .MuiDivider-middle": {
			marginBottom: "4px",
		},
		"& .MuiListItem-root": {
			padding: "0px 16px",
		},
		"& .MuiCardContent-root": {
			paddingTop: "0px",
			paddingBottom: "5px",
		},
		// "& .MuiIconButton-root:focus": {
		// 	backgroundColor: "rgba(0, 0, 0, 0)",
		// },
	},
	likeBar: {
		height: "25px",
		paddingTop: "0px",
		marginTop: "8px",
		marginLeft: "2px",
		paddingLeft: "0px",
		paddingBottom: "4px",
	},
	comments: {
		display: "flex",
		paddingTop: "0px",
		paddingLeft: "12px",
		paddingRight: "0px",
	},
})

export const theme = responsiveFontSizes(lightTheme);

export const light = {
	palette: {
		mode: "light"
	}
}

export const dark = {
	palette: {
		mode: "dark"
	}
}