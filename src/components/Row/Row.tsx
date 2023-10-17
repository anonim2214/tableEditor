import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement } from 'react';
import { Interpolation, Theme } from '@emotion/react/dist/emotion-react.cjs';
import { RootState } from '@/redux/store';
import { RowData } from '@/types';
import Image from 'next/image';
import deleteIcon from './delete.svg';
import editIcon from './edit.svg';
import Link from 'next/link';
import dayjs from 'dayjs';
import { removeAction } from '@/redux/remove/actions';
import { openPopup } from '@/redux/popup/actions';
import PopupType from '@/redux/popup/types';
import { Country, State } from 'country-state-city';

interface RowProps {
    css?: Interpolation<Theme>;
    row: RowData;
}

interface RowReduxProps {
    isActiveRow: boolean;
}

interface RowReduxFunctions {
    openPopup: typeof openPopup;
}

const styles = {
    rowBody: tw`flex-grow flex items-center basis-[1%] flex-shrink-0 p-[10px 5px] border-l-[2px] border-black first-of-type:border-0`,
    rowText: tw`break-all `,
};

function Row({
    row, openPopup, isActiveRow, ...props
}: RowProps & RowReduxProps & RowReduxFunctions): ReactElement {
    return (
        <div {...props} id={row.id} css={[tw`border-t-[2px] border-black flex`, isActiveRow && tw`bg-blue-200`]}>
            {[row.name, row.phone, row.email].map((e, i) => (
                <div key={i} css={styles.rowBody}>
                    <p css={styles.rowText}>{e}</p>
                </div>
            ))}
            {[Country.getCountryByCode(row.country)?.name || '', State.getStateByCodeAndCountry(row.state, row.country)?.name || ''].map((e, i) => (
                <div key={i} css={styles.rowBody}>
                    <p css={styles.rowText}>{e}</p>
                </div>
            ))}
            {[row.city].map((e, i) => (
                <div key={i} css={styles.rowBody}>
                    <p css={styles.rowText}>{e}</p>
                </div>
            ))}
            {[row.licence_accepted, row.email_mail_accepted].map((e, i) => (
                <div key={i} css={[styles.rowBody, tw`justify-center`]}>
                    <input readOnly={true} type={'checkbox'} checked={e} />
                </div>
            ))}
            {[row.created, row.updated].map((e, i ) => (
                <div key={i} css={[styles.rowBody]}>
                    <p css={styles.rowText}>{dayjs(e).format('DD-MM-YY HH:mm')}</p>
                </div>
            ))}
            <div css={[styles.rowBody, tw`justify-evenly`]}>
                <Link href={`edit/${row.id}`}>
                    <Image src={editIcon} alt={'edit'} />
                </Link>
                <button onClick={() => openPopup(PopupType.REMOVE_POPUP, { id: row.id })}>
                    <Image src={deleteIcon} alt={'delete'} />
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState, ownProps: RowProps): RowReduxProps => ({ isActiveRow: ownProps.row.id === state.insert.activeRow });

const mapDispatchToProps: RowReduxFunctions = { openPopup };

export default connect<RowReduxProps, RowReduxFunctions, RowProps>(mapStateToProps, mapDispatchToProps)(Row);