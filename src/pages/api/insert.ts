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
        res.status(500);
        res.send({
            success: false,
            errorMessage: `Error ${ err}`,
        });
    };
    if (!req.body) {
        sendError('There is no body');
    }
    const {
        name,
        phone,
        email,
        country,
        state,
        city,
        id,
        // eslint-disable-next-line camelcase
        licence_accepted,
        // eslint-disable-next-line camelcase
        email_mail_accepted,
    } = req.body;

    if (!(name && phone && email && country && city)) {
        sendError('Need more parameters');
    }

    if (req.method === 'POST') {
        try {
            const client = await pool.connect();
            let result;
            if (id) {
                result = await client.query({
                    text: 'UPDATE "user" set name = $1, phone = $2, email = $3, country = $4, state = $5, licence_accepted = $6, email_mail_accepted = $7, city = $8, updated = $9 where "id" = $10 RETURNING id;',
                    // eslint-disable-next-line camelcase
                    values: [name, phone, email, country, state, licence_accepted, email_mail_accepted, city, new Date(), id],
                });
            } else {
                result = await client.query({
                    text: 'insert into "user" (name, phone, email, country, state, licence_accepted, email_mail_accepted, city, updated, created) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;',
                    // eslint-disable-next-line camelcase
                    values: [name, phone, email, country, state, licence_accepted, email_mail_accepted, city, new Date(), new Date()],
                });
            }
            if (result) {
                res.json({ success: true, data: result.rows[0].id });
                client.release();
            } else {
                sendError('Something went wrong');
            }
        } catch (err) {
            sendError(err);
        }
    }
};