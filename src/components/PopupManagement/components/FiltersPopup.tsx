'use client';
import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement, useState } from 'react';
import { RootState } from '@/redux/store';
import Popup from '@/components/PopupManagement/components/Popup';
import { fields, fieldToTitle } from '@/utils/constants';
import { Button, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Field, Filter } from '@/redux/params/types';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { changeFiltersAction } from '@/redux/params/actions';
import dayjs from 'dayjs';

interface FiltersPopupProps {
    close;
}

interface FiltersPopupReduxProps {
    filters: Filter[];
}

interface FiltersPopupReduxFunctions {
    changeFiltersAction;
}

function FiltersPopup({
    filters, changeFiltersAction, close,
}: FiltersPopupProps & FiltersPopupReduxProps & FiltersPopupReduxFunctions): ReactElement {

    const [localFilters, setLocalFilters] = useState(JSON.parse(JSON.stringify(filters)));

    const onFilterChange = (field: Field, value?: any) => {
        const toRemove = (!value);

        const filterIndex = localFilters?.findIndex(e => e.field === field);
        const newLocalFilters = [...localFilters];
        if (filterIndex > -1) {
            if (toRemove) {
                newLocalFilters.splice(filterIndex, 1);
            } else {
                newLocalFilters[filterIndex].value = value;
            }
        } else {
            newLocalFilters.push({
                field,
                value,
            });
        }
        setLocalFilters(newLocalFilters);
    };

    const getDefaultValueForDate = (field: Field): any => {
        const v = localFilters?.find(e => e.field === field);
        if (v) {
            return [v.value[0] ? dayjs(v.value[0]) : null, v.value[1] ? dayjs(v.value[1]) : null];
        }
        return undefined;
    };

    const renderFilter = (field: Field) => {
        switch (field) {
            case 'updated':
            case 'created': return (
                <div>
                    <p>{fieldToTitle(field)}</p>
                    <DateRangePicker
                        format="DD-MM-YY"
                        defaultValue={getDefaultValueForDate(field)}
                        onChange={(e: any) => onFilterChange(field, e)}
                        css={tw`mt-[20px]`}
                    />
                </div>
            );
            case 'email_mail_accepted':
            case 'licence_accepted': return (
                <>
                    <p>{fieldToTitle(field)}</p>
                    <RadioGroup
                        defaultValue={localFilters?.find(e => e.field === field)?.value || 'any'}
                        css={tw`text-black`}
                        onChange={e => onFilterChange(field, e.target.value === 'any' ? undefined : e.target.value)}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Да" />
                        <FormControlLabel value="false" control={<Radio />} label="Нет" />
                        <FormControlLabel
                            value="any" control={(<Radio />)} label="Не важно"
                        />
                    </RadioGroup>
                </>
            );
            default: return (
                <TextField
                    css={tw`w-full`}
                    defaultValue={localFilters?.find(e => e.field === field)?.value}
                    onChange={e => onFilterChange(field, e.target.value)}
                    label={fieldToTitle(field)} variant="outlined"
                />
            );
        }
    };

    return (
        <Popup css={tw`min-w-[500px]`} close={close}>
            <p css={tw`text-black text-2xl`}>Фильтры</p>
            {fields.map(field => (
                <div key={field} css={tw`mt-[15px] w-full`}>
                    {renderFilter(field)}
                </div>
            ))}
            <div css={tw`flex justify-end w-full mt-[40px]`}>
                <Button
                    onClick={() => {
                        changeFiltersAction(localFilters);
                        close();
                    }}
                >Принять
                </Button>
                <Button
                    onClick={() => {
                        changeFiltersAction([]);
                        close();
                    }}
                >
                    Сбросить все
                </Button>
            </div>
        </Popup>
    );
}

const mapStateToProps = (state: RootState): FiltersPopupReduxProps => ({ filters: state.params.filters });

const mapDispatchToProps: FiltersPopupReduxFunctions = { changeFiltersAction };

export default connect<FiltersPopupReduxProps, FiltersPopupReduxFunctions, FiltersPopupProps>(mapStateToProps, mapDispatchToProps)(FiltersPopup);