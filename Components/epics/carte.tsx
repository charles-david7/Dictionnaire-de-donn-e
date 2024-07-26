"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid, Snackbar,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, IconButton} from "@mui/material";
import {
    DataGrid, GridActionsCellItem,
    GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp, GridSlots,
    GridToolbarContainer
} from '@mui/x-data-grid';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {FC, SyntheticEvent, useEffect, useState} from "react";
import {randomId} from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ObjetMetierInformation, ObjetMetier} from "@/types/types-objets-metiers/objet-metier"

export type DetailsObjetMetierProps = {
    objets: ObjetMetier[]
}


interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const {setRows, setRowModesModel} = props;

    const handleClick = () => {
        const id = randomId();

        setRows((oldRows) => [...oldRows, {
            id,
            contrainte: '',
            type: '',
            description: '',
            exemple: '',
            nomInitial: ''
        }]);
        /*setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'titre'},
        }));*/
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Ajouter une ligne
            </Button>
        </GridToolbarContainer>
    );
}

function DetailsObjetMetierAccordion(props: DetailsObjetMetierProps) {
    const [rows, setRows] = React.useState(props.objets);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [selectedRow, setSelectedRow] = React.useState<ObjetMetier>()

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rowToDelete, setRowToDelete] = React.useState<ObjetMetier | null>(null);

    const handleOpenDialog = (row: ObjetMetier) => {
        setRowToDelete(row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setRowToDelete(null);
    };

    const confirmDelete = () => {
        if (rowToDelete) {
            setRows(rows.filter((row) => row.id !== rowToDelete.id));
            handleCloseDialog();
        }
    };

    /* creer une varible de meme type qu'une row quand j'annule l'edition je reprend cette meme variable et je retrouve le meme resultat */
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditerClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
        setSelectedRow(rows.find(r => r.donnee == id))
    };

    const handleSauvergarderClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
        const updatedRow = rows.find(row => row.id === id);
        if (updatedRow) {
            axios.put(`http://localhost:3000/objets-metiers/${updatedRow.id}`, updatedRow)
                .then(response => {
                    console.log("Nouvelle ligne ajoutée:", response.data);
                    setRows((prevRows) => prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
                    setSnackbarMessage('Bravo! Ligne ajoutée avec succès.');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                })
                .catch(error => {
                    console.error("Erreur lors de la mise à jour de la ligne:", error);
                    setSnackbarMessage('Erreur lors de l\'ajout de la ligne.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });

            // Mettre à jour l'état local des lignes
            setRows((prevRows) => prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
        }
    };


    const handleSupprimerClick = (id: GridRowId) => () => {
        const rowToDelete = rows.find(row => row.id === id);
        if (rowToDelete) {
            handleOpenDialog(rowToDelete);
        }
    };

    const handleAnnulerClick = (id: GridRowId) => {
        return () => {
            setRowModesModel({
                ...rowModesModel,
                [id]: {mode: GridRowModes.View, ignoreModifications: true},
            });

            if (selectedRow) {
                const index = rows.findIndex(r => r.donnee === id)
                if (index !== -1) {
                    rows[index].nomInitial = selectedRow.nomInitial
                    rows[index].type = selectedRow.type
                    rows[index].contrainte = selectedRow.contrainte
                    rows[index].exemple = selectedRow.exemple
                }
            }
        }
    }

    const processRowUpdate = (newRow: ObjetMetier) => {
        const updatedRow = {...newRow};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns: GridColDef<ObjetMetier>[] = [
        {
            field: 'nomInitial',
            headerName: 'Nom Initial',
            flex:0.2,
            width: 150,
            editable: true,
        },
        {
            field: 'contrainte',
            headerName: 'Contrainte',
            flex:0.2,
            width: 150,
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Type',
            flex:0.2,
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 0.5,
            width: 150,
            editable: true,
        },
        {
            field: 'exemple',
            headerName: 'Exemple',
            flex:0.2,
            width: 150,
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            renderCell: (params: GridRenderCellParams) => {
                const editionMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

                if (editionMode) {
                    return [
                        <GridActionsCellItem
                            key={Math.random().toString()}
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSauvergarderClick(params.id)}
                        />,
                        <GridActionsCellItem
                            key={params.id}
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleAnnulerClick(params.id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={Math.random().toString()}
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditerClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={params.id}
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleSupprimerClick((params.id))}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                getRowId={(row: ObjetMetier) => row.id}
                columns={columns}
                rows={rows}
                getRowHeight={() => 'auto'}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={(params) => {
                    const editedRow = rows.find((row) => row.donnee === params.id);
                    if (editedRow) {
                        handleSupprimerClick(params.id as string);
                    }
                }}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel},
                }}

            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>{"Confirmation de suppression"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer cette ligne ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}


type ObjetsMetierListe = {
    editing: boolean
    handleDelete: (objet: ObjetMetierInformation) => void;
    objets: ObjetMetierInformation[];
};

const ObjetsMetierList: FC<ObjetsMetierListe> = ({objets, handleDelete, editing}) => {
    const [hoveredAccordion, setHoveredAccordion] = useState<string | null>(null);
    const [edition, setEdition] = useState<boolean>(false);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
    const [openAccordionDialog, setOpenAccordionDialog] = useState(false);
    const [accordionToDelete, setAccordionToDelete] = useState<ObjetMetierInformation | null>(null);


    const handleEditionObjetsMetiers = ()=>{
        setEdition(prevState => !prevState)
    }
    const handleOpenAccordionDialog = (accordion: ObjetMetierInformation) => {
        setAccordionToDelete(accordion);
        setOpenAccordionDialog(true);
    };

    const handleCloseAccordionDialog = () => {
        setOpenAccordionDialog(false);
        setAccordionToDelete(null);
    };

    const confirmAccordionDelete = () => {
        if (accordionToDelete) {
            handleDelete(accordionToDelete);
            handleCloseAccordionDialog();
        }
    };

    const deleteObjet = (objet: ObjetMetierInformation) => {
        return (event: SyntheticEvent)=>{
            event.stopPropagation()
            event.preventDefault()
            handleDelete(objet)
        }
    }
    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? panel : null);
    };

    console.log("Objets métiers: ", objets)
    return (
        <Grid container sx={{display: 'inline-grid'}} gap={2}>
            {objets.map((objetMetier) => {
                const isExpanded = expandedAccordion === objetMetier.id;
                    return (
                        <Accordion
                            sx={{ boxShadow: 'none' }}
                            key={objetMetier.id}
                            expanded={isExpanded}
                            onChange={handleAccordionChange(objetMetier.id)}
                            onMouseEnter={() => setHoveredAccordion(objetMetier.id)}
                            onMouseLeave={() => setHoveredAccordion(null)}>
                            <AccordionSummary
                                expandIcon={
                                    edition && hoveredAccordion === objetMetier.id ? (
                                        <IconButton onClick={deleteObjet(objetMetier)} color={editing ? "error" : "primary"}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    ) : (
                                        <ExpandMoreIcon />
                                    )
                                }
                                sx={{ boxShadow: 'none' }}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                {objetMetier.titre}
                                {hoveredAccordion === objetMetier.id && edition &&  (
                                    <Button
                                        startIcon={<EditIcon />}
                                        color={"error"}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleEditionObjetsMetiers();
                                        }}
                                    >
                                    </Button>
                                )}
                            </AccordionSummary>
                                <AccordionDetails>
                                    {isExpanded && (
                                        <DetailsObjetMetierAccordion objets={objetMetier.attributObjetMetierList} />
                                    )}
                                </AccordionDetails>

                        </Accordion>

                    )
                }
            )
            }
            <Dialog
                open={openAccordionDialog}
                onClose={handleCloseAccordionDialog}
            >
                <DialogTitle>{"Confirmation de suppression"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer cet accordéon ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAccordionDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmAccordionDelete} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}

export default ObjetsMetierList;