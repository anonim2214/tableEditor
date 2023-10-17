enum PopupType {
    FILTERS_POPUP,
    REMOVE_POPUP,
    TEXT_POPUP
}

export interface PopupData {
    data: any;
    type: PopupType;
}

export interface PopupState {
    popupsData:PopupData[];
    currentPopup: null | PopupData;
}

export default PopupType;