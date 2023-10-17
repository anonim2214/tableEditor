import { NextApiRequest, NextApiResponse } from 'next';
import { RowData } from '@/types';

const pool = require('@/utils/db');

export interface ResponseData {
    data?: RowData[]
    success: boolean;
    errorMessage?: string;
}

const getDataApi = async (id?: string): Promise<ResponseData> => {
    const sendError = err => {
        console.error(err);
        return ({
            success: false,
            errorMessage: `Error ${ err}`,
        });
    };
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM public.user${id ? ` where id = '${id}'`: ''}`);
        if (result) {
            return ({ success: true, data: result.rows });
        } else {
            sendError('Something went wrong');
        }
    } catch (err) {
        sendError(err);
    }
};

export default getDataApi;