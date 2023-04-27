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
        paddingTop: '200px'
    },
    imageStyle: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random?social-media,people,social,instruments,singing,dancing,dogs,cats,nature,city,night-life,movies,anime,sports)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "100vh",
	},
    Logo: {
		fontFamily: "Grand Hotel, cursive",
		marginBottom: "42px",
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
})

export const theme = responsiveFontSizes(lightTheme);
