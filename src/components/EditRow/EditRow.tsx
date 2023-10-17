import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement, useState } from 'react';
import { Interpolation, Theme } from '@emotion/react/dist/emotion-react.cjs';
import { RootState } from '@/redux/store';
import { Autocomplete, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Country, State, City } from 'country-state-city';
import Link from 'next/link';
import { insertAction } from '@/redux/insert/actions';
import { InsertData, RowData } from '@/types';

interface EditRowProps {
    css?: Interpolation<Theme>;
    isNew?: boolean;
    data?: RowData;
}

interface EditRowReduxProps {
}

interface EditRowReduxFunctions {
    insertAction: typeof insertAction;
}

const styles = { field: tw`mt-[30px] w-[500px]`, errorText: tw`w-[500px] text-red-500` };
function EditRow({
    isNew = false, insertAction, data,
    ...props
}: EditRowProps & EditRowReduxProps & EditRowReduxFunctions): ReactElement {

    const getInitCountry = () => {
        if (!isNew) {
            const c = Country.getCountryByCode(data?.country!);
            if (c) {
                return { label: c.name, isoCode: c.isoCode };
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    const getInitState = () => {
        if (!isNew && data?.state) {
            const s = State.getStateByCodeAndCountry(data?.state!, data?.country!);
            if (s) {
                return { label: s.name, isoCode: s.isoCode };
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    const [name, setName] = useState(isNew ? '' : data?.name);
    const [phone, setPhone] = useState(isNew ? '' : data?.phone);
    const [email, setEmail] = useState(isNew ? '' : data?.email);
    const [email2, setEmail2] = useState( '');
    const [country, setCountry] = useState<any>(getInitCountry());
    const [state, setState] = useState<any>(getInitState());
    const [licence, setLicence] = useState(isNew ? false : data?.licence_accepted);
    const [emailAccepted, setEmailAccepted] = useState(isNew ? false : data?.email_mail_accepted);
    const [city, setCity] = useState<any>(isNew ? null : { label: data?.city, isoCode: data?.city });
    const [licenseType, setLicenseType] = useState('true');
    const [errors, setErrors] = useState(Array.from({ length: 7 }, (_, i) => ''));

    const countries = React.useMemo(
        () => Country.getAllCountries().map(el => ({ label: el.name, isoCode: el.isoCode })),
        []
    );

    const states = React.useMemo(
        () => State.getStatesOfCountry(country?.isoCode).map(el => ({ label: el.name, isoCode: el.isoCode })),
        [country]
    );

    const cities = React.useMemo(
        () => {
            if (!!state && !!country) {
                return City.getCitiesOfState(country?.isoCode, state?.isoCode).map(el => ({ label: el.name, isoCode: el.name }));
            } else if (!!country){
                return City.getCitiesOfCountry(country?.isoCode).map(el => ({ label: el.name, isoCode: el.name }));
            }
            return [];
        },
        [country, state]
    );

    const handleSubmit = () => {
        const newErrors = Array.from({ length: 7 }, (_, i) => '');
        const phoneRegex = /^(?:\+?\d{1,3})?[-.\s]?\(?(?:\d{2,3})?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!name) {
            newErrors[0] = 'Обязательное поле';
        }
        if (!phone) {
            newErrors[1] = 'Обязательное поле';
        } else if (!phoneRegex.test(phone)) {
            newErrors[1] = 'Неверный формат номера телефона';
        }
        if (!email) {
            newErrors[2] = 'Обязательное поле';
        } else if (!emailRegex.test(email)) {
            newErrors[2] = 'Неверный формат email';
        } else if (email !== email2) {
            newErrors[2] = 'Email должны совпадать';
            newErrors[3] = 'Email должны совпадать';
        }
        if (!country) {
            newErrors[4] = 'Обязательное поле';
        }
        if (!city) {
            newErrors[5] = 'Обязательное поле';
        }
        if (licenseType === 'true' && !licence) {
            newErrors[6] = 'Нужно принять';
        }
        if (!newErrors.find(e => !!e)) {
            insertAction({
                id: isNew ? undefined : data?.id!,
                name,
                phone,
                email,
                country: country.isoCode,
                state: state?.isoCode || '',
                city: city?.isoCode || '',
                licence_accepted: licence,
                email_mail_accepted: emailAccepted,
            } as InsertData);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div {...props} css={tw`mt-[20px] flex flex-col items-center`}>
            <Link href={'/'}>
                <Button>Вернуться к таблице</Button>
            </Link>
            {isNew && (
                <RadioGroup
                    css={tw`mt-[30px]`}
                    value={licenseType}
                    onChange={e => setLicenseType(e.target.value)}
                >
                    <FormControlLabel value="true" control={<Radio />} label="По лицензионному соглашению" />
                    <FormControlLabel value="false" control={<Radio />} label="По обоюдному согласию" />
                </RadioGroup>
            )}
            <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                css={styles.field}
                label="Имя"
                error={!!errors[0]}
            />
            <p css={styles.errorText}>{errors[0]}</p>
            <TextField
                value={phone}
                onChange={e => setPhone(e.target.value)}
                css={styles.field}
                label="Телефон"
                error={!!errors[1]}
            />
            <p css={styles.errorText}>{errors[1]}</p>
            <TextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                css={styles.field}
                label="Email"
                error={!!errors[2]}
            />
            <p css={styles.errorText}>{errors[2]}</p>
            <TextField
                value={email2}
                onChange={e => setEmail2(e.target.value)}
                css={styles.field}
                label="Подтвержение Email"
                error={!!errors[3]}
            />
            <p css={styles.errorText}>{errors[3]}</p>
            <Autocomplete
                disablePortal={true}
                css={styles.field}
                value={country}
                isOptionEqualToValue={(option, value) => option.isoCode === value.isoCode}
                onChange={(e, value) => {
                    setCountry(value);
                    setState(null);
                    setCity(null);
                }}
                options={countries}
                renderInput={params => <TextField {...params} label="Страна" />}
            />
            <p css={styles.errorText}>{errors[4]}</p>
            <Autocomplete
                disablePortal={true}
                css={styles.field}
                value={state}
                disabled={!states.length}
                isOptionEqualToValue={(option, value) => option.isoCode === value.isoCode}
                onChange={(e, value) => {
                    setState(value);
                    setCity(null);
                }}
                options={states}
                renderInput={params => <TextField {...params} label="Штат" />}
            />
            <Autocomplete
                disablePortal={true}
                value={city}
                css={styles.field}
                isOptionEqualToValue={(option, value) => option.isoCode === value.isoCode}
                disabled={!cities.length || (!!states.length && !state)}
                onChange={(e, value) => setCity(value)}
                options={cities}
                renderInput={params => <TextField {...params} label="Город" />}
            />
            <p css={styles.errorText}>{errors[5]}</p>
            <FormControlLabel
                css={styles.field}
                control={<Checkbox onChange={(e, v) => setEmailAccepted(v)} checked={emailAccepted} />} label="Отправлять мне новости по email"
            />
            {licenseType === 'true' && (
                <>
                    <FormControlLabel
                        css={styles.field}
                        control={<Checkbox onChange={(e, v) => setLicence(v)} checked={licence} />}
                        label="Принимаю условия лицензионного соглашения"
                    />
                    <p css={styles.errorText}>{errors[6]}</p>
                </>
            )}
            <Button css={tw`mt-[20px]`} onClick={handleSubmit}>
                Создать
            </Button>
        </div>
    );
}

const mapStateToProps = (state: RootState): EditRowReduxProps => ({});

const mapDispatchToProps: EditRowReduxFunctions = { insertAction };

export default connect<EditRowReduxProps, EditRowReduxFunctions, EditRowProps>(mapStateToProps, mapDispatchToProps)(EditRow);