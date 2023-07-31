import React, { useEffect, useState } from "react";
import {Buffer} from 'buffer';

// Material UI Components
import { Avatar, Grid, Typography } from "@mui/material";
import { FIND_USERS } from "../../service/apiCalls";

const SideChat = ({ chats }) => {
  const [chatPartners, setChatPartners] = useState([]);
  useEffect(() => {
    if (chats?.length) {
      FIND_USERS({ id: chats.join() }).then((res) =>
        setChatPartners(res?.data)
      );
    }
  }, [chats]);

  // console.log("Chat Partners:", Buffer.from(chatPartners[0]?.profilepic).toString("base64"));

  return chatPartners.map((chat, idx) => (
    <Grid
      key={idx}
      sx={{
        display: "flex",
        padding: "20px",
        cursor: "pointer",
        borderBottom: "1px solid #f6f6f6",
        "&:hover": {
          backgroundColor: "#ebebeb",
        },
      }}
    >
      <Avatar />
      <Grid sx={{ marginLeft: "15px" }}>
        <Typography
          variant="h6"
          style={{ fontSize: "1rem", fontWeight: 900, marginBottom: "8px" }}
        >
          {chat.name}
        </Typography>
        <Typography variant="p">This is the last message</Typography>
      </Grid>
    </Grid>
  ));
};

export default SideChat;
