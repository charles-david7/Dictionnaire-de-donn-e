"use client";
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardForm from "@/Components/addButton";
import {CardData} from "@/types/CardData";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type BasicModalProps = {
    onClose: () => void;
    open: boolean;
    onAdd: (card: CardData) => void;
}


const BasicModal: FC<BasicModalProps> = (props: BasicModalProps) => {
    const handleAddCard = (
        genre: string,
        titre: string,
        nomInitial: string,
        contrainte: string,
    ) => {
        const nextId = Math.random()
        const newCard: CardData = {id: nextId, genre, titre, nomInitial: nomInitial, contrainte: contrainte};
        props.onAdd(newCard)
        props.onClose();
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CardForm onAddCard={handleAddCard}></CardForm>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;