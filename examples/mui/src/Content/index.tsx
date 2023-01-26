import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Stack } from "@mui/system";
import React from "react";
import ContentBody from "./ContentBody";
import ContentTitle from "./ContentTitle";

export default function Content() {
    return (
        <Card>
            <CardMedia
                sx={{ height: 180 }}
                image="https://picsum.photos/id/34/2048/300"
            />
            <CardContent>
                <Stack spacing={2}>
                    <ContentTitle />
                    <ContentBody />
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
