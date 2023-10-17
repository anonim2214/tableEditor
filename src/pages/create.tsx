import Provider from '@/redux/Provider';
import GlobalStyles from '@/styles/GlobalStyles';
import EditRow from '@/components/EditRow/EditRow';

export default function( ) {
    return (
        <Provider>
            <GlobalStyles >
                <EditRow isNew={true} />
            </GlobalStyles>
        </Provider>
    );
};
