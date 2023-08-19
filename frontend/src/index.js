import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { theme, light, dark } from "./theme";
import { Provider } from 'react-redux';
import { store } from "../src/redux/store";
import { ThemeCtxProvider, useThemeMode } from "./contexts/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Root = () => {
	const { darkMode } = useThemeMode();
	let outerTheme = React.useMemo(() => {
	  return createTheme({
		...theme,
		...(darkMode ? dark : light),
	  });
	}, [darkMode]);
  
	return (
	  <ThemeProvider theme={outerTheme}>
			<CssBaseline />
			<App />
	   </ThemeProvider>
	);
  };

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ThemeCtxProvider>
					<Root />
				</ThemeCtxProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// reportWebVitals();

