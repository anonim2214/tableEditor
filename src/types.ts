
export interface InsertData {
    id?: string;
    name: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    city: string;
    licence_accepted: boolean
    email_mail_accepted: boolean
}
export interface RowData extends InsertData{
    id: string
    created: number
    updated: number
}