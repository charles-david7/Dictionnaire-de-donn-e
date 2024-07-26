"use client";
import {FC, ReactNode, useEffect, useState} from "react";
import {Box} from "@mui/system";
import Stack from "@mui/material/Stack";
import {CardData} from "@/types/types-objets-metiers/CardData";
import ObjetsMetierList from "@/Components/epics/carte";
import BasicModal from "@/Components/epics/modal";
import {Card, CardContent, CardHeader, Snackbar, Alert, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {randomId} from "@mui/x-data-grid-generator";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import {ObjetMetier, ObjetMetierInformation} from "@/types/types-objets-metiers/objet-metier"


const rows: ObjetMetierInformation[] = [
    {
        id: randomId(),
        "titre": "Piece Comptable",
        "genre": "féminin",
        "nomInitial": "Pièce Comptable",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "id",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Identifiant unique de la pièce comptable",
                "exemple": 102030,
                "nomInitial": "ID de la pièce",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "reference",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Numéro de référence unique de la pièce comptable",
                "exemple": "PC-2024-001",
                "nomInitial": "Référence de la pièce",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "dateCreation",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de création de la pièce comptable",
                "exemple": "2024-02-20",
                "nomInitial": "Date de création",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "dateModification",
                "contrainte": null,
                "type": "Date",
                "description": "Date de la dernière modification de la pièce comptable",
                "exemple": "2024-03-01",
                "nomInitial": "Date de modification",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "statutPieceComptable",
                "contrainte": "@IsDefined, @IsEnum",
                "type": "StatutPieceComptable",
                "description": "Statut actuel de la pièce comptable (ex: Nouveau, Payé, Annulé)",
                "exemple": "Nouveau",
                "nomInitial": "Statut",
                "genre": "masculin"
            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "Facture",
        "genre": "féminin",
        "nomInitial": "Facture",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "id",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Identifiant unique de la facture",
                "exemple": 123,
                "nomInitial": "ID de la facture",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "idFactureOrigine",
                "contrainte": "",
                "type": "string",
                "description": "Numéro de la facture d'origine en cas d'avoir",
                "exemple": "FAC-2024-001-AV",
                "nomInitial": "Numéro de la Facture d'Origine",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "type",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Type de la facture (380: Facture, 381: Avoir)",
                "exemple": "380",
                "nomInitial": "Type de Facture",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "cadre",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Cadre de facturation (A1: Dépôt par un fournisseur d'une facture, A2: Dépôt par un fournisseur d'une facture déjà payée, etc.)",
                "exemple": "A1",
                "nomInitial": "Cadre",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "dateEmissionFacture",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date d'émission de la facture",
                "exemple": "2024-01-15",
                "nomInitial": "Date d'Émission",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "modePaiement",
                "contrainte": "@IsDefined",
                "type": "ModePaiement",
                "description": "Mode de paiement de la facture",
                "exemple": "Virement bancaire",
                "nomInitial": "Mode de Paiement",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "dateReception",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de réception de la facture",
                "exemple": "2024-01-16",
                "nomInitial": "Date de Réception",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "devise",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Devise de la facture (ISO 4217)",
                "exemple": "EUR",
                "nomInitial": "Devise",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "montant",
                "contrainte": "@IsDefined",
                "type": "Montant",
                "description": "Montants de la facture",
                "exemple": null,
                "nomInitial": "Montants",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "tva",
                "contrainte": "",
                "type": "TVA",
                "description": "Informations sur la TVA de la facture",
                "exemple": null,
                "nomInitial": "TVAs",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "engagement",
                "contrainte": "",
                "type": "Engagement",
                "description": "Engagements associés à la facture",
                "exemple": null,
                "nomInitial": "Engagement",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "ligneFacture",
                "contrainte": "",
                "type": "LigneFacture",
                "description": "Lignes de détail de la facture",
                "exemple": null,
                "nomInitial": "Lignes",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "periodeFacture",
                "contrainte": "@IsDefined",
                "type": "string",
                "description": "Période de facturation",
                "exemple": "M12",
                "nomInitial": "Période de la facture",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "anneeFacture",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Année de la facture",
                "exemple": 2024,
                "nomInitial": "Année de la facture",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "poles",
                "contrainte": "@ManyToMany",
                "type": "Pole",
                "description": "Pôles associés à la facture",
                "exemple": null,
                "nomInitial": "Pôles",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "statutFacture",
                "contrainte": "@IsDefined",
                "type": "enum",
                "description": "Statut de la facture",
                "exemple": "Nouveau",
                "nomInitial": "Statut",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "montantTTC",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la facture TTC",
                "exemple": 1500.0,
                "nomInitial": "Montant TTC",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "montantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la facture HT",
                "exemple": 1250.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "tva",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant total de la TVA",
                "exemple": 250.0,
                "nomInitial": "TVA",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "dateCreation",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date de création de la facture",
                "exemple": "2024-01-15",
                "nomInitial": "Date de création",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "dateModification",
                "contrainte": "",
                "type": "Date",
                "description": "Date de la dernière modification de la facture",
                "exemple": "2024-01-20",
                "nomInitial": "Date de modification",
                "genre": "féminin"
            },
            {
                id: randomId(),

                "donnee": "dateSuppression",
                "contrainte": "",
                "type": "Date",
                "description": "Date de suppression de la facture, si applicable",
                "exemple": null,
                "nomInitial": "Date de suppression",
                "genre": "féminin"
            },
            {

                id: randomId(),
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
        id: randomId(),
        "titre": "ModePaiement",
        "genre": "masculin",
        "nomInitial": "Mode de Paiement",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "Code",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Code du mode de paiement (10: Cash, 20: Check, 30: Credit transfer, etc.)",
                "exemple": 30,
                "nomInitial": "Code",
                "genre": "masculin"
            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "Montant",
        "genre": "masculin",
        "nomInitial": "Montants",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "montantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant hors taxes de la facture",
                "exemple": 1000.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "montantTTC",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant toutes taxes comprises de la facture",
                "exemple": 1200.0,
                "nomInitial": "Montant TTC",
                "genre": "masculin"
            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "TVA",
        "genre": "féminin",
        "nomInitial": "TVA",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "taux",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Taux de TVA appliqué",
                "exemple": 20.0,
                "nomInitial": "Taux",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "baseHt",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Base hors taxes sur laquelle la TVA est calculée",
                "exemple": 1000.0,
                "nomInitial": "Base HT",
                "genre": "féminin"
            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "Engagement",
        "genre": "masculin",
        "nomInitial": "Engagement",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "numeroMarche",
                "contrainte": "",
                "type": "string",
                "description": "Numéro du marché associé à la facture",
                "exemple": "M12345",
                "nomInitial": "Numéro du Marché",
                "genre": "masculin",

            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "LigneFacture",
        "genre": "féminin",
        "nomInitial": "Ligne de la Facture",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "ReferenceProduit",
                "contrainte": "",
                "type": "string",
                "description": "Référence du produit ou service",
                "exemple": "PRD001",
                "nomInitial": "Référence Produit",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "PrixUnitaire",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Prix unitaire du produit ou service",
                "exemple": 50.0,
                "nomInitial": "Prix Unitaire",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "Quantite",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Quantité de produit ou service",
                "exemple": 10,
                "nomInitial": "Quantité",
                "genre": "féminin"
            },
            {
                id: randomId(),
                "donnee": "MontantHT",
                "contrainte": "@IsDefined",
                "type": "number",
                "description": "Montant hors taxes de la ligne",
                "exemple": 500.0,
                "nomInitial": "Montant HT",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "TauxTVA",
                "contrainte": "",
                "type": "number",
                "description": "Taux de TVA appliqué à la ligne",
                "exemple": 20.0,
                "nomInitial": "Taux TVA",
                "genre": "masculin"
            },
            {
                id: randomId(),
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
        id: randomId(),
        "titre": "FactureAchat",
        "genre": "féminin",
        "nomInitial": "Facture d'Achat",
        "contrainte": "",
        "attributObjetMetierList": [
            {
                id: randomId(),
                "donnee": "fournisseur",
                "contrainte": "@ManyToOne, @IsDefined",
                "type": "Fournisseur",
                "description": "Fournisseur associé à la facture d'achat",
                "exemple": "Fournisseur A",
                "nomInitial": "Fournisseur",
                "genre": "masculin"
            },
            {
                id: randomId(),
                "donnee": "dateFacture",
                "contrainte": "@IsDefined",
                "type": "Date",
                "description": "Date à laquelle la facture a été émise",
                "exemple": "2024-01-15",
                "nomInitial": "Date de la facture",
                "genre": "féminin"
            },
            {
                id: randomId(),
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

type ConsulterObjetMetierReponseBody = {
    items: ObjetMetierInformation[]
}

const Page: FC = (): ReactNode => {
    const [nextId, setNextId] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [objetsInformations, setObjetsInformations] = useState<ObjetMetierInformation[]>(rows)
    const [editing, setEditing] = useState<boolean>(false);
    // États pour la Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        // Récupérer les objets métiers depuis l'API
        axios.get<ConsulterObjetMetierReponseBody>('http://localhost:3000/consulter-objets-metiers')
            .then(response => {
                setObjetsInformations(response.data.items);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des objets métiers:", error);
                setSnackbarMessage('Erreur lors de la récupération des objets métiers.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    }, []);


    const handleCardAjouter= (card: CardData) => {
        setNextId(nextId + 1);
        console.log("Object Information", card)
        setObjetsInformations(prevState => [
            ...prevState,
            {
                id: Math.random().toString(),
                titre: card.titre,
                genre: card.genre,
                nomInitial: card.nomInitial,
                contrainte: card.contrainte,
                attributObjetMetierList: []
            }
        ])
        axios.post('http://localhost:3000/objets-metiers', {
            ...card,
        }).then(response => {
            console.log("Card mise à jour:", response.data);
            setSnackbarMessage('Bravo! La carte a été ajoutée avec succès.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

        })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de la card:", error);
                setSnackbarMessage('Erreur lors de l\'ajout de la carte.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleCarteSupprimer = (objet: ObjetMetierInformation)=>{
        setObjetsInformations(prev =>{
            return prev.filter(e => e.id != objet.id)
        })
    }

    const handleEditObjetsMetiers = ()=>{
        setEditing(prevState => !prevState)
    }


    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <Grid container>
            <Grid item xs={12} p={3}>
                <Card
                    sx={{
                        borderRadius: 2

                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CardHeader
                        title={
                            <Typography
                                fontSize={22}
                                fontWeight={600}
                            >
                                Gestion des objets métiers
                            </Typography>
                        }
                        action={
                            <Stack direction={"row"} gap={2}>
                                <Button
                                    startIcon={<AddIcon/>}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Ajouter
                                </Button>
                                {isHovered && (
                                    <Button
                                        startIcon={<EditIcon />}
                                        color={"error"}
                                        onClick={handleEditObjetsMetiers}
                                    >
                                        Editer
                                    </Button>
                                )}
                            </Stack>
                        }
                    />
                    <CardContent>
                        <ObjetsMetierList
                            handleDelete={handleCarteSupprimer}
                            editing={editing}
                            objets={objetsInformations}
                        />
                        <BasicModal
                            open={isModalOpen}
                            onClose={handleClose}
                            onAdd={handleCardAjouter}
                        />
                    </CardContent>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{width: '100%'}}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Card>
            </Grid>
        </Grid>
    )
}


export default Page;