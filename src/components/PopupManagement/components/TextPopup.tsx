import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement } from 'react';
import { RootState } from '@/redux/store';
import Popup from '@/components/PopupManagement/components/Popup';

interface TextPopupProps {
    close;
    text: string;
    handler?: () => any;
}

interface TextPopupReduxProps {
}

interface TextPopupReduxFunctions {
}

function TextPopup({
    text, handler, close,
}: TextPopupProps & TextPopupReduxProps & TextPopupReduxFunctions): ReactElement {

    const handleClose = () => {
        handler && handler();
        close();
    };
    return (
        <Popup close={handleClose}>
            <p css={tw`mt-[10px]`}>{text}</p>
        </Popup>
    );
}

const mapStateToProps = (state: RootState): TextPopupReduxProps => ({});

const mapDispatchToProps: TextPopupReduxFunctions = {};

export default connect<TextPopupReduxProps, TextPopupReduxFunctions, TextPopupProps>(mapStateToProps, mapDispatchToProps)(TextPopup);