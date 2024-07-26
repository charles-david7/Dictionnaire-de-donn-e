/*"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import {FC, ReactNode, useState} from "react";


interface AppBarLabelProps {
    label: string;
}

const  AppBarLabel : FC<AppBarLabelProps> = ({label}): ReactNode => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = ()=>{
        setOpen(true)
    }

    return (
        <Toolbar>
            <Button

                onClick={handleOpen}
            >
                <AddIcon color={'secondary'} />
            </Button>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, justifyContent: 'center',}}>
                {label}
            </Typography>
        </Toolbar>
    );
}

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#304352',
        },
    },
});

export default function Bar() {
    return (
        <Stack spacing={2} sx={{flexGrow: 1}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{borderRadius: 5}}>
                </AppBar>
            </ThemeProvider>
        </Stack>
    );
}*/