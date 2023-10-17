import Provider from '@/redux/Provider';
import GlobalStyles from '@/styles/GlobalStyles';
import getDataApi, { ResponseData } from '@/utils/getTableData';
import Link from 'next/link';
import Table from '@/components/Table/Table';
import { Button } from '@mui/material';
import React from 'react';

export const getServerSideProps = async ({ req, res }) => {
    const tablesRequest = await getDataApi();
    tablesRequest.data = tablesRequest.data?.map(el => ({
        ...el,
        updated: el.updated.valueOf(),
        created: el.created.valueOf(),
    }));
    return { props: { tablesRequest } };
};

export default function({ tablesRequest }: { tablesRequest: ResponseData}) {
    return (
        <Provider isTable={true}>
            <GlobalStyles>
                <Link href={'/create'}>
                    <Button>Добавить новую запись</Button>
                </Link>
                {tablesRequest.success && <Table data={tablesRequest.data!} />}
            </GlobalStyles>
        </Provider>
    );
};
