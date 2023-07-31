import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { theme } from "../../theme";
import { motion } from "framer-motion";
import SideChat from "./sideChat";
import MainChat from "./mainChat";

//Material UI imports
import { Grid } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Messages = () => {
  const user = JSON.parse(localStorage?.getItem('user'));
  const [chats, setChats] = useState([]);

  const fetchUnique = (user) => {
    const uniqueSet = new Set([...user?.Followers, ...user?.Following]);
    const uniqueArray = Array.from(uniqueSet);
    setChats(uniqueArray);
  }

  useEffect(() => {
    fetchUnique(user);
  }, [])


  return (
    <>
      <Navbar />
      {/* <Toolbar /> */}
      <Grid
        container
        sx={{
          height: "100vh",
          overflow: "auto",
          paddingTop: "70px",
        }}
      >
        <Grid item xs={4} lg={3}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f6f6f6",
              height: "80px",
              padding: "10px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                width: "100%",
                height: "35px",
                borderRadius: "20px",
              }}
            >
              <SearchOutlinedIcon style={{ color: "gray", margin: "10px" }} />
              <input
                placeholder="Start or search new chat"
                type="text"
                style={{ width: "100%", outlineWidth: 0, border: "none" }}
              />
            </Grid>
          </Grid>
          <Grid sx={{
            flex: 1,
            backgroundColor: "white",
            overflow: "scroll"
          }}>
            <SideChat chats={chats} />
          </Grid>
        </Grid>
        <Grid item xs={8} lg={9}>
          <MainChat />
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
