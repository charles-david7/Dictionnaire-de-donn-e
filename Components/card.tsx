"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
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
import AccordionActions from "@mui/material/AccordionActions";
import DehazeIcon from '@mui/icons-material/Dehaze';
import {FC, useEffect} from "react";
import {randomId} from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type ObjetMetier = {
    id: string,
    genre: string;
    nomInitial: string;
    description: string;
    contrainte: string | null;
    donnee: string
    exemple: string | number | null
    type: string

}

export type ObjetMetierInformation = {
    id: string,
    titre: string;
    "genre": string
    "nomInitial": string
    "contrainte": string
    attributObjetMetierList: ObjetMetier[]
}


type DetailsObjetMetierProps = {
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

         setRows((oldRows) => [...oldRows, {id, contrainte: 'toto', type: 'Int', description: 'description', Example:'exemple',nomInitial: 'nom', isNew: true}]);
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




    /* creer une varible de meme type qu'une row quand j'annule l'edition je reprend cette meme variable et je retrouve le meme resultat */
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
        setSelectedRow(rows.find(r => r.donnee == id))
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => {
        return ()=>{
            setRowModesModel({
                ...rowModesModel,
                [id]: {mode: GridRowModes.View, ignoreModifications: true},
            });

            if (selectedRow) {
                const index = rows.findIndex(r => r.donnee === id)
                if (index !== -1){
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
            field: 'contrainte',
            headerName: 'Contrainte',
            width: 150,
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        {
            field: 'example',
            headerName: 'Example',
            width: 150,
            editable: true,
        },
        {
            field: 'nomInitial',
            headerName: 'Nom Initial',
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
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={Math.random().toString()}
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(params.id)}
                        />,
                        <GridActionsCellItem
                            key={params.id}
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.id)}
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
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={params.id}
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick((params.id))}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    return (
        <div>
            <Box>
                <DataGrid
                    getRowId={(row: ObjetMetier) => row.id}
                    columns={columns}
                    rows={rows}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={(params) => {
                        const editedRow = rows.find((row) => row.donnee === params.id);
                        if (editedRow) {
                            handleDeleteClick(params.id as string);
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
            </Box>

        </div>
    );
}


type ObjetsMetierListe = {
    objets: ObjetMetierInformation[]
};

const ObjetsMetierList: FC<ObjetsMetierListe> = ({objets}) => {
    return (
        <Grid container sx={{display: 'inline-grid',}}>
            {objets.map((objetMetier) => {
                    return (
                        <div key={objetMetier.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<DehazeIcon/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    {objetMetier.titre}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <DetailsObjetMetierAccordion objets={objetMetier.attributObjetMetierList}/>
                                </AccordionDetails>
                            </Accordion>

                            <AccordionActions>

                            </AccordionActions>

                        </div>
                    )
                }
            )
            }
        </Grid>
    )

}

export default ObjetsMetierList;