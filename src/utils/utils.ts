import { RowData } from '@/types';
import { Filter, Sorting } from '@/redux/params/types';

export const tableSorting = (row1: RowData, row2: RowData, sorting: Sorting[]): number => {
    if (sorting.length > 0 && (sorting[0].field === 'created' || sorting[0].field === 'updated')) {
        return (row1[sorting[0].field] - row2[sorting[0].field]) * (sorting[0].type === 'desc' ? -1 : 1);
    } else {
        const newSorting: any = [...sorting].sort((el1, el2) => {
            const order = {
                'country': 1,
                'state': 2,
                'city': 3,
            };
            return (order[el1.field] || 1) - (order[el2.field] || 1);
        });
        if (newSorting.length === 0) {
            newSorting.push({
                type: 'asc',
                field: 'id',
            });
        }
        for(let i = 0; i < newSorting.length; i++) {
            if (row1[newSorting[i].field] < row2[newSorting[i].field]) {
                return newSorting[i].type === 'asc' ? -1 : 1;
            } else if (row1[newSorting[i].field] > row2[newSorting[i].field]) {
                return newSorting[i].type === 'asc' ? 1 : -1;
            }
        }
        return 0;
    }
};

export const tableFiltering = (row: RowData, filters: Filter[]) => {
    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        if (filter.field === 'created' || filter.field === 'updated') {
            if (filter.value[0]) {
                if (row[filter.field] < filter.value[0].$d.valueOf()) {
                    return false;
                }
            }
            if (filter.value[1]) {
                if (row[filter.field] > filter.value[1].$d.valueOf()) {
                    return false;
                }
            }
        } else if (filter.field === 'licence_accepted' || filter.field === 'email_mail_accepted') {
            if (!row[filter.field]) {
                return false;
            }
        } else if (!row[filter.field].includes(filter.value)) {
            return false;
        }
    }
    return true;
};