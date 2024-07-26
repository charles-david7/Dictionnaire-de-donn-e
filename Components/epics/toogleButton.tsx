"use client";
import React, { useState } from 'react';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


interface GenreToggleProps {
    value: string;
    onChange: (newValue: string) => void;
}

export const GenreToggle: React.FC <GenreToggleProps>= ({ value, onChange }) => {


    return (
        <Stack gap={1} direction={"row"} alignItems={"center"}>
            <Typography
             fontSize={16}
            >
                Genre
            </Typography>
            <Button
                onClick={() => {
                    const newGenre = value === 'feminin' ? 'masculin' : 'feminin';
                    onChange(newGenre);
                }}
                className="relative"
            >
                <FemaleOutlinedIcon
                    className={`transition-transform duration-300 ${value === 'feminin' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
                />
                <MaleOutlinedIcon
                    className={`absolute transition-transform duration-300 ${value === 'masculin' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
                />
                <span className="sr-only">changer de Genre</span>
            </Button>
        </Stack>
    );
};