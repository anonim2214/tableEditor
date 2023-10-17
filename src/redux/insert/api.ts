import restRequest from '@/utils/restRequest';
import { InsertData, RowData } from '@/types';

export const insertApi = <Res>(data: InsertData) => {
    return restRequest<Res>({
        url: '/api/insert',
        method: 'POST',
        data,
    });
};