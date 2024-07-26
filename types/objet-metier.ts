
export type ObjetMetier = {
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
