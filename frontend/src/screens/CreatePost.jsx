
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CREATE_POST_URL } from "../service/apiCalls";
import Navbar from "../components/Navbar";

// Material-UI deps
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Alert from '@mui/material/Alert';
// FilePond deps
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useTheme } from "@mui/system";

registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateType
);

const getSteps = () => {
	return ["Select you image", "Tag a Friend", "Submit the post"];
};

const CreatePoste = () => {
	const theme = useTheme();
	const history = useNavigate();
	const [files, setFiles] = useState([]);
	const [caption, setCaption] = useState("");
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const [query, setQuery] = useState("idle");
	const timerRef = useRef();

	// const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[]
	);

	const handlePostData = () => {
		// the Index 0 means the first file , we will add in the future the support of multiple
		// images upload , the max will be 10 images per post
		const photoEncode = files[0].getFileEncodeBase64String();
		const photoType = files[0].fileType;
		// Axios.post(
		// 	CREATE_POST_URL,
		// 	{
		// 		title: caption,
		// 		body: caption,
		// 		photoEncode,
		// 		photoType,
		// 	},
		// 	config
		// ).then((rep) => {
		// 	if (rep.data.message) {
		// 		setQuery("success");
		// 	}
		// });
		CREATE_POST_URL({
			title: caption,
			body: caption,
			photoEncode,
			photoType,
		})
		.then((rep) => {
			if (rep) {
				setQuery("success");
			}
		})
		.catch(err => console.log("Error in creating post:", err));
	};

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<div sx={theme.filesContainer}>
						<FilePond
							labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
							files={files}
							allowMultiple={false}
							onupdatefiles={setFiles}
							imageResizeTargetWidth={450}
							imageResizeTargetHeight={450}
							acceptedFileTypes={["image/jpeg", "image/png", "images/gif"]}
							required={true}
						/>
						<TextField
							sx={{ margin: "10px 0px" }}
							id="outlined-search"
							label="Caption"
							type="text"
							variant="outlined"
							fullWidth="true"
							multiline="true"
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>
					</div>
				);
			case 1:
				return "This functionality isn't available for the moment";
			case 2:
				return;
			default:
				return "Unknown step";
		}
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleClickQuery = () => {
		clearTimeout(timerRef.current);
		if (query !== "idle") {
			setQuery("idle");
			return;
		}
		setQuery("progress");
		timerRef.current = setTimeout(() => {
			history("/");
		}, 4000);
	};

	const handleSubmit = () => {
		handleNext();
		handleClickQuery();
		handlePostData();
	};

	return (
		<>
			<Navbar />
			<div sx={{ 	
				width: "70%",
				margin: "40px auto"
				}}>
				<Stepper component={Paper} elevation={3} activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								<Typography>{getStepContent(index)}</Typography>
								<div sx={theme.actionsContainer}>
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{
												marginTop: theme.spacing(1),
												marginRight: theme.spacing(1),
											}}
										>
											Back
										</Button>
										<Button
											disabled={files.length === 0 || caption === ""}
											variant="contained"
											color="primary"
											onClick={
												activeStep === steps.length - 1
													? handleSubmit
													: handleNext
											}
											sx={{
												marginTop: theme.spacing(1),
												marginRight: theme.spacing(1),
											}}
										>
											{activeStep === steps.length - 1 ? "Submit" : "Next"}
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					))}
					{activeStep === steps.length && (
						<Paper square elevation={0} sx={{
							padding: "6px 24px",
						}}>
							<div sx={theme.finishStyle}>
								{query === "success" ? (
									<Alert variant="outlined" severity="success">
										Your post has been successfully submitted — check it out!
									</Alert>
								) : (
									<Fade
										sx={theme.finishStyle}
										in={query === "progress"}
										style={{
											transitionDelay:
												query === "progress" ? "100ms" : "0ms",
										}}
										unmountOnExit
									>
										<CircularProgress />
									</Fade>
								)}
							</div>
						</Paper>
					)}
				</Stepper>
			</div>
		</>
	);
};

export default CreatePoste;
