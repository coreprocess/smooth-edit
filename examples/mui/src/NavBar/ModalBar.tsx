import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useCallback, useContext } from "react";
import { SmoothEditContext } from "smooth-edit";

export default function ModalBar() {
    const { deactivateEditMode } = useContext(SmoothEditContext);

    const onCloseClick = useCallback(() => {
        deactivateEditMode();
    }, [deactivateEditMode]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Edit Post
                    </Typography>
                    <IconButton
                        onClick={onCloseClick}
                        size="large"
                        edge="end"
                        color="inherit"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
