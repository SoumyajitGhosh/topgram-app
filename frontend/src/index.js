import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { theme } from "./theme";
import { Provider } from 'react-redux';
import { store } from "../src/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
						<App />
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// reportWebVitals();

