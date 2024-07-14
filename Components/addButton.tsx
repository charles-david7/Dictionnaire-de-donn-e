import React, { useState } from 'react';
import {TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";
import {GenreToggle} from "@/Components/toogleButton";


interface CardFormProps {
    onAddCard: (
                  genre: string,
                  nomInitial: string,
                  contrainte: string,
                  titre : string,
    ) => void;
}

const CardForm: React.FC<CardFormProps> = ({ onAddCard }) => {
    const [titre, setTitre] = useState('');
    const [genre, setGenre] = useState('');
    const [nomInitial, setNominitial] = useState('');
    const [contrainte, setContrainte] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCard(genre, nomInitial, contrainte, titre);
        setGenre('');
        setNominitial('');
        setContrainte('');
        setTitre('');
    };
    const [formData, setFormData] = useState({
        genre: '',
        nomInitial: '',
        contrainte: '',
        titre : '',

    })

    return (

        <>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <GenreToggle id="outlined-basic"
                                 value={genre}
                                 onChange={(e: {
                                     target: { value: React.SetStateAction<string>; };
                                 }) => setGenre(e.target.value)}
                                 label="Genre" variant={"ghost"} required size={"sm"}
                                 sx={{justifyContent: 'flex-start'}}/>
                    <TextField id="outlined-basic" label="titre" variant="outlined" value={titre}
                               onChange={(e) => setTitre(e.target.value)}
                               required/>
                    <TextField id="outlined-basic" label="nom Initial" variant="outlined" value={nomInitial}
                               onChange={(e) => setNominitial(e.target.value)}
                               required/>
                    <TextField id="outlined-basic" label="Contrainte" variant="outlined" value={contrainte}
                               onChange={(e) => setContrainte(e.target.value)}/>
                    <button type="submit">Ajouter</button>
                </Stack>
            </form>

        </>
    );
};

export default CardForm;
