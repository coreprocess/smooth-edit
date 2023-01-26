import { Box } from "@mui/material";
import React from "react";
import { wrapSmoothEditNavBar } from "smooth-edit";
import MainBar from "./MainBar";
import ModalBar from "./ModalBar";

const NavBar = wrapSmoothEditNavBar(function ({ editMode, rootRef }) {
    return (
        <Box ref={rootRef} sx={{ flexGrow: 0, flexShrink: 0 }}>
            {editMode ? <ModalBar /> : <MainBar />}
        </Box>
    );
}, {});

export default NavBar;
