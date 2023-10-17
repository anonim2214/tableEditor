import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement, useEffect } from 'react';
import { Interpolation, Theme } from '@emotion/react/dist/emotion-react.cjs';
import { RootState } from '@/redux/store';
import { RowData } from '@/types';
import Header from '@/components/Header/Header';
import Row from '@/components/Row/Row';
import { tableFiltering, tableSorting } from '@/utils/utils';
import { Filter, Sorting } from '@/redux/params/types';
import { clearAction } from '@/redux/remove/actions';

interface TableProps {
    css?: Interpolation<Theme>;
    data: RowData[];
}

interface TableReduxProps {
    sorting: Sorting[];
    filters: Filter[];
    removedRows: string[];
}

interface TableReduxFunctions {
}

function Table({
    data, sorting, filters, removedRows, ...props
}: TableProps & TableReduxProps & TableReduxFunctions): ReactElement {

    return (
        <div {...props} css={tw`border-[3px] border-solid border-black`}>
            <Header />
            {data.filter(e => !removedRows.includes(e.id)).filter(e => tableFiltering(e, filters)).sort((el1, el2) => tableSorting(el1, el2, sorting)).map(row => <Row key={row.id} row={row} />)}
        </div>
    );
}

const mapStateToProps = (state: RootState): TableReduxProps => ({
    sorting: state.params.sorting, removedRows: state.remove.removedRows, filters: state.params.filters,
});

const mapDispatchToProps: TableReduxFunctions = { };

export default connect<TableReduxProps, TableReduxFunctions, TableProps>(mapStateToProps, mapDispatchToProps)(Table);