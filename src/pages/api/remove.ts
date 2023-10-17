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

    if (req.method === 'DELETE') {
        try {
            const client = await pool.connect();
            const result = await client.query(`DELETE FROM public.user where id = '${req.body.id}'`);
            if (result) {
                res.json({ success: true });
                client.release();
            } else {
                sendError('Something went wrong');
            }
        } catch (err) {
            sendError(err);
        }
    }
};