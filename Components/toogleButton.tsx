"use client";
import React, { useState } from 'react';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const GenreToggle: React.FC = () => {
    const [genre, setGenre] = useState<string>('feminin');

    return (
        <Box>
        <Button
            onClick={() => {
                setGenre(genre === 'feminin' ? 'masculin' : 'feminin');
            }}
            className="relative"
        >
            <FemaleOutlinedIcon
                className={`transition-transform duration-300 ${genre === 'feminin' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
            />
            <MaleOutlinedIcon
                className={`absolute transition-transform duration-300 ${genre === 'masculin' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
            />
            <span className="sr-only">Toggle Genre</span>
        </Button>
        </Box>
    );
};
