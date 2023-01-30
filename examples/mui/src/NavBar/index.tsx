import { Box } from "@mui/material";
import React from "react";
import { wrapSmoothEditNavBar } from "smooth-edit";
import { SmoothTransition } from "smooth-transition";
import MainBar from "./MainBar";
import ModalBar from "./ModalBar";

const NavBar = wrapSmoothEditNavBar(function ({ editMode, rootRef }) {
    return (
        <Box ref={rootRef} sx={{ flexGrow: 0, flexShrink: 0 }}>
            <SmoothTransition
                render={[() => <MainBar />, () => <ModalBar />]}
                active={!editMode ? 0 : 1}
                duration={500}
            />
        </Box>
    );
}, {});

export default NavBar;
