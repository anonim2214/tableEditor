import { connect } from 'react-redux';
import tw, { css } from 'twin.macro';
import React, { ReactElement, useState } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { RootState } from '@/redux/store';
import { Field, Sorting } from '@/redux/params/types';
import { changeSortingAction } from '@/redux/params/actions';
import Image from 'next/image';
import filterIcon from './filter.svg';

import arrowDown from './arrowDown.svg';
import { DatePicker } from '@mui/x-date-pickers';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import { fields, fieldToTitle } from '@/utils/constants';
import { openPopup } from '@/redux/popup/actions';
import PopupType from '@/redux/popup/types';

interface HeaderProps {
    css?: Interpolation<Theme>;
}

interface HeaderReduxProps {
    sorting: Sorting[];
}

interface HeaderReduxFunctions {
    changeSortingAction: typeof changeSortingAction;
    openPopup: typeof openPopup;
}

const styles = { headerBody: tw`flex-grow flex basis-[1%] flex-shrink-0 p-[10px 5px] border-l-[2px] border-white first:border-0` };

function Header({
    changeSortingAction, sorting, openPopup, ...props
}: HeaderProps & HeaderReduxProps & HeaderReduxFunctions): ReactElement {

    const renderArrow = (field: Field) => {
        const e = sorting.find(el => el.field === field);
        if (e) {
            return (
                <Image src={arrowDown} css={[e.type === 'desc' && css`transform: rotate(180deg)`]} alt={'sorting'} />
            );
        }
        return null;
    };

    return (
        <div {...props} css={tw`bg-black flex`}>
            {fields.map((field: Field) => (
                <button
                    key={field}
                    onClick={() => changeSortingAction(field)}
                    css={styles.headerBody}
                >
                    {renderArrow(field)}
                    <p css={tw`break-all text-white`}>{fieldToTitle(field)}</p>
                </button>
            ))}
            <button onClick={() => openPopup(PopupType.FILTERS_POPUP)} css={[styles.headerBody, tw`justify-center`]}>
                <Image src={filterIcon} alt={'filter'} />
            </button>
        </div>
    );
}

const mapStateToProps = (state: RootState): HeaderReduxProps => ({ sorting: state.params.sorting });

const mapDispatchToProps: HeaderReduxFunctions = { changeSortingAction, openPopup };

export default connect<HeaderReduxProps, HeaderReduxFunctions, HeaderProps>(mapStateToProps, mapDispatchToProps)(Header);