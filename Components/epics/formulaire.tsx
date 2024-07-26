import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";
import {GenreToggle} from "@/Components/epics/toogleButton";
import Button from "@mui/material/Button";


interface CardFormulaireProps {
    onAddCard: (
        genre: string,
        nomInitial: string,
        contrainte: string,
        titre: string,
    ) => void;
    initialValues?: {
        genre: string;
        nomInitial: string;
        contrainte: string;
        titre: string;
    };

}

const CardFormulaire: React.FC<CardFormulaireProps> = ({onAddCard, initialValues}) => {
    const [titre, setTitre] = useState(initialValues?.titre || '');
    const [genre, setGenre] = useState(initialValues?.genre || 'feminin');
    const [nomInitial, setNominitial] = useState(initialValues?.nomInitial || '');
    const [contrainte, setContrainte] = useState(initialValues?.contrainte || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCard(genre, nomInitial, contrainte, titre);
        resetFields();
    };

    const resetFields = (): void => {
        setGenre('feminin');
        setNominitial('');
        setContrainte('');
        setTitre('');
    }



    return (
        <Stack gap={1.5} component={"form"} onSubmit={handleSubmit}>
            <GenreToggle
                value={genre}
                onChange={(newValue) => setGenre(newValue)}
            />

            <TextField id="outlined-basic" label="Titre" variant="outlined" value={titre}
                       onChange={(e) => setTitre(e.target.value)}
                       required/>
            <TextField id="outlined-basic" label="Nom initial" variant="outlined" value={nomInitial}
                       onChange={(e) => setNominitial(e.target.value)}
                       required/>
            <TextField id="outlined-basic" label="Contrainte" variant="outlined" value={contrainte}
                       onChange={(e) => setContrainte(e.target.value)}/>
            <Button type="submit">Sauvegarder</Button>
        </Stack>
    );
};

export default CardFormulaire;
