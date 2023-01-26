import { Container, CssBaseline, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { SmoothEditContainer } from "smooth-edit";
import Content from "./Content";
import NavBar from "./NavBar";
import ScrollArea from "./ScrollArea";

export default function App() {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <SmoothEditContainer>
                    <NavBar />
                    <ScrollArea>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Stack spacing={4}>
                                <Content />
                                <Content />
                            </Stack>
                        </Container>
                    </ScrollArea>
                </SmoothEditContainer>
            </Box>
        </>
    );
}
