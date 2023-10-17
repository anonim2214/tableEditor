import { RowData } from '@/types';

export type Field = Exclude<keyof RowData, 'id'>;

export interface Sorting {
    field: Field;
    type: 'asc' | 'desc';
}

export interface Filter {
    field: Field;
    value: any;
}

export interface ParamsState {
    sorting: Sorting[];
    filters: Filter[];
}