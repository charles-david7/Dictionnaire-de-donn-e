/*"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {
    DataGrid,
    GridActionsCellItem,
    GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp, GridSlots,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {randomId} from "@mui/x-data-grid-generator";
import {lime, pink, purple, red} from '@mui/material/colors';
import {border} from "@mui/system";
import {black} from "next/dist/lib/picocolors";
import {useMemo, useState} from "react";



type ObjetMetier = {
    genre: string;
    nomInitial: string;
    description: string;
    contrainte: string | null;
    donnee: string
    exemple: string | number | null
    type: string
}


type X = {
    id: string,
    titre: string;
    "genre": string
    "nomInitial": string
    "contrainte": string
    attributObjetMetierList: ObjetMetier[]
}




const rows: X[] = [
    {
        "id": "1",
        "titre": "Piece Comptable",
        "genre": "féminin",
        "nomInitial": "Pièce Comptable",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "id",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Identifiant unique de la pièce comptable",
                "exemple": 102030,
                "nomInitial": "ID de la pièce",
                "genre": "masculin"
            },
            {
                "donnee": "reference",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Numéro de référence unique de la pièce comptable",
                "exemple": "PC-2024-001",
                "nomInitial": "Référence de la pièce",
                "genre": "masculin"
            },
            {
                "donnee": "dateCreation",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de création de la pièce comptable",
                "exemple": "2024-02-20",
                "nomInitial": "Date de création",
                "genre": "féminin"
            },
            {
                "donnee": "dateModification",
                "contrainte": null,
                "type": "Date",
                "description": "Date de la dernière modification de la pièce comptable",
                "exemple": "2024-03-01",
                "nomInitial": "Date de modification",
                "genre": "féminin"
            },
            {
                "donnee": "statutPieceComptable",
                "contrainte": "@IsDefined, @IsEnum",
                "type": "StatutPieceComptable",
                "description": "Statut actuel de la pièce comptable (ex: Nouveau, Payé, Annulé)",
                "exemple": "Nouveau",
                "nomInitial": "Statut",
                "genre": "masculin"
            },
            {
                "donnee": "document",
                "contrainte": "@ManyToMany",
                "type": "Document",
                "description": "Ensemble des documents associés à cette pièce comptable",
                "exemple": null,
                "nomInitial": "Document",
                "genre": "féminin"
            }
        ]
    },
    {
        "id": "2",
        "titre": "Facture",
        "genre": "féminin",
        "nomInitial": "Facture",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "id",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Identifiant unique de la facture",
                "exemple": 123,
                "nomInitial": "ID de la facture",
                "genre": "masculin"
            },
            {
                "donnee": "idFactureOrigine",
                "contrainte": "",
                "type": "string",
                "description": "Numéro de la facture d'origine en cas d'avoir",
                "exemple": "FAC-2024-001-AV",
                "nomInitial": "Numéro de la Facture d'Origine",
                "genre": "féminin"
            },
            {
                "donnee": "type",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Type de la facture (380: Facture, 381: Avoir)",
                "exemple": "380",
                "nomInitial": "Type de Facture",
                "genre": "masculin"
            },
            {
                "donnee": "cadre",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Cadre de facturation (A1: Dépôt par un fournisseur d'une facture, A2: Dépôt par un fournisseur d'une facture déjà payée, etc.)",
                "exemple": "A1",
                "nomInitial": "Cadre",
                "genre": "masculin"
            },
            {
                "donnee": "dateEmissionFacture",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date d'émission de la facture",
                "exemple": "2024-01-15",
                "nomInitial": "Date d'Émission",
                "genre": "féminin"
            },
            {
                "donnee": "modePaiement",
                "contrainte": "@IsDefined",
                "type": "ModePaiement",
                "description": "Mode de paiement de la facture",
                "exemple": "Virement bancaire",
                "nomInitial": "Mode de Paiement",
                "genre": "masculin"
            },
            {
                "donnee": "dateReception",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de réception de la facture",
                "exemple": "2024-01-16",
                "nomInitial": "Date de Réception",
                "genre": "féminin"
            },
            {
                "donnee": "devise",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Devise de la facture (ISO 4217)",
                "exemple": "EUR",
                "nomInitial": "Devise",
                "genre": "féminin"
            },
            {
                "donnee": "montant",
                "contrainte": "@IsDefined",
                "type": "Montant",
                "description": "Montants de la facture",
                "exemple": null,
                "nomInitial": "Montants",
                "genre": "masculin"
            },
            {
                "donnee": "tva",
                "contrainte": "",
                "type": "TVA",
                "description": "Informations sur la TVA de la facture",
                "exemple": null,
                "nomInitial": "TVAs",
                "genre": "féminin"
            },
            {
                "donnee": "engagement",
                "contrainte": "",
                "type": "Engagement",
                "description": "Engagements associés à la facture",
                "exemple": null,
                "nomInitial": "Engagement",
                "genre": "masculin"
            },
            {
                "donnee": "ligneFacture",
                "contrainte": "",
                "type": "LigneFacture",
                "description": "Lignes de détail de la facture",
                "exemple": null,
                "nomInitial": "Lignes",
                "genre": "féminin"
            },
            {
                "donnee": "periodeFacture",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Période de facturation",
                "exemple": "M12",
                "nomInitial": "Période de la facture",
                "genre": "féminin"
            },
            {
                "donnee": "anneeFacture",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Année de la facture",
                "exemple": 2024,
                "nomInitial": "Année de la facture",
                "genre": "féminin"
            },
            {
                "donnee": "poles",
                "contrainte": "@ManyToMany",
                "type": "Pole",
                "description": "Pôles associés à la facture",
                "exemple": null,
                "nomInitial": "Pôles",
                "genre": "masculin"
            },
            {
                "donnee": "statutFacture",
                "contrainte": "@IsDefined",
                "type": "enum",
                "description": "Statut de la facture",
                "exemple": "Nouveau",
                "nomInitial": "Statut",
                "genre": "masculin"
            },
            {
                "donnee": "montantTTC",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la facture TTC",
                "exemple": 1500.0,
                "nomInitial": "Montant TTC",
                "genre": "masculin"
            },
            {
                "donnee": "montantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la facture HT",
                "exemple": 1250.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                "donnee": "tva",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la TVA",
                "exemple": 250.0,
                "nomInitial": "TVA",
                "genre": "masculin"
            },
            {
                "donnee": "dateCreation",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de création de la facture",
                "exemple": "2024-01-15",
                "nomInitial": "Date de création",
                "genre": "féminin"
            },
            {
                "donnee": "dateModification",
                "contrainte": "",
                "type": "Date",
                "description": "Date de la dernière modification de la facture",
                "exemple": "2024-01-20",
                "nomInitial": "Date de modification",
                "genre": "féminin"
            },
            {
                "donnee": "dateSuppression",
                "contrainte": "",
                "type": "Date",
                "description": "Date de suppression de la facture, si applicable",
                "exemple": null,
                "nomInitial": "Date de suppression",
                "genre": "féminin"
            },
            {
                "donnee": "commentaire",
                "contrainte": "@OneToMany",
                "type": "Commentaire",
                "description": "Remarques supplémentaires sur la prestation",
                "exemple": "La consultation a permis d'identifier plusieurs opportunités d'amélioration dans la gestion financière.",
                "nomInitial": "Commentaires",
                "genre": "féminin"
            }
        ]
    },
    {
        "id": "3",
        "titre": "ModePaiement",
        "genre": "masculin",
        "nomInitial": "Mode de Paiement",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "Code",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Code du mode de paiement (10: Cash, 20: Check, 30: Credit transfer, etc.)",
                "exemple": 30,
                "nomInitial": "Code",
                "genre": "masculin"
            },
            {
                "donnee": "Libelle",
                "contrainte": "",
                "type": "string",
                "description": "Libellé du mode de paiement",
                "exemple": "Virement bancaire",
                "nomInitial": "Libellé",
                "genre": "masculin"
            }
        ]
    },
    {
        "id": "4",
        "titre": "Montant",
        "genre": "masculin",
        "nomInitial": "Montants",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "montantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant hors taxes de la facture",
                "exemple": 1000.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                "donnee": "montantTTC",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant toutes taxes comprises de la facture",
                "exemple": 1200.0,
                "nomInitial": "Montant TTC",
                "genre": "masculin"
            },
            {
                "donnee": "montantNetAPayer",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant net à payer de la facture",
                "exemple": 1200.0,
                "nomInitial": "Montant Net à Payer",
                "genre": "masculin"
            }
        ]
    },
    {
        "id": "5",
        "titre": "TVA",
        "genre": "féminin",
        "nomInitial": "TVA",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "taux",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Taux de TVA appliqué",
                "exemple": 20.0,
                "nomInitial": "Taux",
                "genre": "masculin"
            },
            {
                "donnee": "baseHt",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Base hors taxes sur laquelle la TVA est calculée",
                "exemple": 1000.0,
                "nomInitial": "Base HT",
                "genre": "féminin"
            },
            {
                "donnee": "montantTVA",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant de la TVA",
                "exemple": 200.0,
                "nomInitial": "Montant TVA",
                "genre": "masculin"
            }
        ]
    },
    {
        "id": "6",
        "titre": "Engagement",
        "genre": "masculin",
        "nomInitial": "Engagement",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "numeroMarche",
                "contrainte": "",
                "type": "string",
                "description": "Numéro du marché associé à la facture",
                "exemple": "M12345",
                "nomInitial": "Numéro du Marché",
                "genre": "masculin"
            },
            {
                "donnee": "numeroEngagement",
                "contrainte": "",
                "type": "string",
                "description": "Numéro de l'engagement associé à la facture",
                "exemple": "E12345",
                "nomInitial": "Numéro d'Engagement",
                "genre": "masculin"
            }
        ]
    },
    {
        "id": "7",
        "titre": "LigneFacture",
        "genre": "féminin",
        "nomInitial": "Ligne de la Facture",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "ReferenceProduit",
                "contrainte": "",
                "type": "string",
                "description": "Référence du produit ou service",
                "exemple": "PRD001",
                "nomInitial": "Référence Produit",
                "genre": "féminin"
            },
            {
                "donnee": "PrixUnitaire",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Prix unitaire du produit ou service",
                "exemple": 50.0,
                "nomInitial": "Prix Unitaire",
                "genre": "masculin"
            },
            {
                "donnee": "Quantite",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Quantité de produit ou service",
                "exemple": 10,
                "nomInitial": "Quantité",
                "genre": "féminin"
            },
            {
                "donnee": "MontantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant hors taxes de la ligne",
                "exemple": 500.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                "donnee": "TauxTVA",
                "contrainte": "",
                "type": "number",
                "description": "Taux de TVA appliqué à la ligne",
                "exemple": 20.0,
                "nomInitial": "Taux TVA",
                "genre": "masculin"
            },
            {
                "donnee": "NumOrdre",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Numéro d'ordre de la ligne",
                "exemple": 1,
                "nomInitial": "Numéro d'Ordre",
                "genre": "masculin"
            }
        ]
    },
    {
        "id": "8",
        "titre": "FactureAchat",
        "genre": "féminin",
        "nomInitial": "Facture d'Achat",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                "donnee": "fournisseur",
                "contrainte": "@ManyToOne, @IsDefined",
                "type": "Fournisseur",
                "description": "Fournisseur associé à la facture d'achat",
                "exemple": "Fournisseur A",
                "nomInitial": "Fournisseur",
                "genre": "masculin"
            },
            {
                "donnee": "dateFacture",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date à laquelle la facture a été émise",
                "exemple": "2024-01-15",
                "nomInitial": "Date de la facture",
                "genre": "féminin"
            },
            {
                "donnee": "dateReception",
                "contrainte": "",
                "type": "Date",
                "description": "Date de réception de la facture",
                "exemple": "2024-01-16",
                "nomInitial": "Date de réception",
                "genre": "féminin"
            }
        ]
    }
]
interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, titre: '', genre: '', Objet_metier:'', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer sx={{borderRadius:9,  marginBottom:3}} color="text.disabled" >
            <Button color="primary" startIcon={<AddIcon sx={{ color: pink[500] }}/>} onClick={handleClick}>
                ajouter
            </Button>
        </GridToolbarContainer>
    );
}

export default function DataGridD() {

    const NestedObjectDropdown = ({ nestedObjectData }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => setIsOpen(!isOpen);

        return (
            <div>
                <button onClick={toggleDropdown}>
                    {isOpen ? 'Masquer' : 'Afficher les détails'}
                </button>
                {isOpen && (
                    <ul className="dropdown-list">
                        {nestedObjectData.map((item) => (
                            <li key={item.id}>
                                {item.key}: {item.value}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };
    const [Irows, setIRows] = React.useState(rows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };


    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setIRows(Irows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = Irows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setIRows(Irows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = {...newRow, isNew: false};
        setIRows(Irows.map((rows) => (Irows.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef<X>[] = [
        {
            field: 'id',
            headerName: "ID",
            editable: false,

        },
        {
            field: 'titre',
            headerName: 'Titre',
            width: 150,
            editable: true,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 150,
            editable: true,
        },
        {
            field: 'nomInitial',
            headerName: 'Objet métier',
            width: 110,
            editable: true,
            valueOptions: [],
        },
        {
            field: 'contrainte',
            headerName: 'Contrainte',
            width: 110,
            editable: true,
            valueOptions: [],
        },
        {
            field: 'attributObjetMetierList',
            headerName: 'Attribut',
            width: 110,
            editable: true,
            renderCell: ({ value }) => {
                const nestedObjectData = useMemo(() => {
                    // Traiter et transformer les données du sous-tableau imbriqué selon les besoins
                    return  value && value.attributObjetMetierList ? value.attributObjetMetierList.map((item) => ({
                        id: item.exemple, // Utiliser un identifiant unique pour chaque élément
                        key: item.nomInitial,
                        value: item.donnee,
                    })) : []; // Retourner un tableau vide si les données sont manquantes
                }, [value]);


                return <NestedObjectDropdown nestedObjectData={nestedObjectData} />;
            },

            valueOptions: [],
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon/>}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                }

            }

        }
    ];



    return (


        <Box sx={{height: 400, width: '100%', color: 'warning.main'}}>


            <DataGrid
                sx={{ borderRadius: 5,boxShadow: 10, margin: 2,zIndex: 'tooltip',   }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar']
                }}
                slotProps={{
                    toolbar: { setIRows, setRowModesModel },
                }}

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: rows.length,
                        },
                    },
                }}
                pageSizeOptions={[25]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>

    );

}*/