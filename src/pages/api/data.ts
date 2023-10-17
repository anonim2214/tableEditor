import { NextApiRequest, NextApiResponse } from 'next';
import { RowData } from '@/types';

const pool = require('@/utils/db');

export interface ResponseData {
    data?: RowData[]
    success: boolean;
    errorMessage?: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const sendError = err => {
        console.error(err);
        res.send({
            success: false,
            errorMessage: `Error ${ err}`,
        });
    };

    if (req.method === 'GET') {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM public.user');
            if (result) {
                res.json({ success: true, data: result.rows });
                client.release();
            } else {
                sendError('Something went wrong');
            }
        } catch (err) {
            sendError(err);
        }
    }
};