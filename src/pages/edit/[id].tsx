import Provider from '@/redux/Provider';
import GlobalStyles from '@/styles/GlobalStyles';
import Link from 'next/link';
import getDataApi, { ResponseData } from '../../utils/getTableData';
import EditRow from '@/components/EditRow/EditRow';

export const getServerSideProps = async ({
    req, res, query,
}) => {
    const tablesRequest = await getDataApi(query?.id);
    tablesRequest.data = tablesRequest.data?.map(el => ({
        ...el,
        updated: el.updated.valueOf(),
        created: el.created.valueOf(),
    }));
    return { props: { tablesRequest } };
};

export default function({ tablesRequest }: { tablesRequest: ResponseData}) {
    return (
        <Provider>
            <GlobalStyles >
                <EditRow data={tablesRequest.data?.[0]!} />
            </GlobalStyles>
        </Provider>
    );
};
