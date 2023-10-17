import { connect } from 'react-redux';
import React, { ReactElement } from 'react';
import PopupType, { PopupData } from '../../redux/popup/types';
import { RootState } from '@/redux/store';
import { closePopup } from '@/redux/popup/actions';
import FiltersPopup from '@/components/PopupManagement/components/FiltersPopup';
import RemovePopup from '@/components/PopupManagement/components/RemovePopup';
import TextPopup from '@/components/PopupManagement/components/TextPopup';

interface PopupManagementProps {
}

interface PopupManagementReduxProps {
    currentPopup: PopupData | null;
}

interface PopupManagementReduxFunctions {
    closePopup: typeof closePopup;
}

function PopupManagement({ currentPopup, closePopup }: PopupManagementProps & PopupManagementReduxProps & PopupManagementReduxFunctions): ReactElement | null {

    if (currentPopup) {
        switch (currentPopup.type) {
            case PopupType.FILTERS_POPUP: {
                return (
                    <FiltersPopup close={closePopup.bind(this, PopupType.FILTERS_POPUP)} {...currentPopup.data} />
                );
            }
            case PopupType.REMOVE_POPUP: {
                return (
                    <RemovePopup close={closePopup.bind(this, PopupType.REMOVE_POPUP)} {...currentPopup.data} />
                );
            }
            case PopupType.TEXT_POPUP: {
                return (
                    <TextPopup close={closePopup.bind(this, PopupType.TEXT_POPUP)} {...currentPopup.data} />
                );
            }
        }
    }
    return null;
}

const mapStateToProps = (state: RootState): PopupManagementReduxProps => ({ currentPopup: state.popup.currentPopup });

const mapDispatchToProps: PopupManagementReduxFunctions = { closePopup };

export default connect<PopupManagementReduxProps, PopupManagementReduxFunctions, PopupManagementProps>(mapStateToProps, mapDispatchToProps)(PopupManagement);