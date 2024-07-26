"use client";
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardForm from "@/Components/epics/formulaire";
import {CardData} from "@/types/types-objets-metiers/CardData";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "12px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type BasicModalProps = {
    onClose: () => void;
    open: boolean;
    onAdd: (card: CardData) => void;
    initialValues?: any;
}


const BasicModal: FC<BasicModalProps> = (props: BasicModalProps) => {
    const handleAjouterCard = (
        genre: string,
        titre: string,
        nomInitial: string,
        contrainte: string,
    ) => {
        const nextId = Math.random()
        props.onAdd({id: nextId, genre, titre, nomInitial: nomInitial, contrainte: contrainte})
        props.onClose()
    };

    return (
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CardForm onAddCard={handleAjouterCard}></CardForm>
                </Box>
            </Modal>
    );
}

export default BasicModal;