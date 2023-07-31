import React from "react";
import MessagesBG from "../../assets/img/messages.png";
import { theme } from "../../theme";
import { io } from "socket.io-client";

// Material UI Components
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

const mainChat = () => {
  return (
    <Grid sx={{ height: "100%" }}>
      <Grid
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Avatar />
        <Grid sx={{ flex: 1, paddingLeft: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Room Name
          </Typography>
        </Grid>
        <Grid>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        sx={{
          flex: 1,
          // backgroundImage: `url(${MessagesBG})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          padding: "30px",
          height: "76%",
        }}
      >
        {/* Received Message */}
        <p
          style={{
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "rgba(239, 239, 239, 0.8)",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-15px",
              fontWeight: 800,
              fontSize: "xx-small",
            }}
          >
            Sonny
          </span>
          This is a message
          <span style={{ marginLeft: "10px", fontSize: "xx-small" }}>
            {new Date().toUTCString()}
          </span>
        </p>

        {/* Sent Message */}
        <p
          style={{
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: theme.palette.primary.light,
            marginLeft: "auto",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-15px",
              fontWeight: 800,
              fontSize: "xx-small",
            }}
          >
            Sonny
          </span>
          This is a message
          <span style={{ marginLeft: "10px", fontSize: "xx-small" }}>
            {new Date().toUTCString()}
          </span>
        </p>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
          borderTop: "1px solid lightgray",
          background: "rgba(239, 239, 239, 0.9)"
        }}
      >
        <InsertEmoticonIcon
          style={{
            color: "gray",
            margin: "10px",
          }}
        />
        <form
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <input
            placeholder="Type a message"
            type="text"
            style={{
              flex: 1,
              display: "flex",
              borderRadius: "30px",
              padding: "10px",
              border: "none",
            }}
          />
          <button type="submit" style={{ display: "none" }}>
            Send a message
          </button>
        </form>
        <MicIcon
          style={{
            color: "gray",
            margin: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default mainChat;
