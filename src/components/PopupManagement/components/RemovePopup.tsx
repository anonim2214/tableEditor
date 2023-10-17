import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement } from 'react';
import { Interpolation, Theme } from '@emotion/react/dist/emotion-react.cjs';
import { RootState } from '@/redux/store';
import { Button } from '@mui/material';
import { removeAction } from '@/redux/remove/actions';
import Popup from '@/components/PopupManagement/components/Popup';

interface RemovePopupProps {
    css?: Interpolation<Theme>;
    id: string;
    close;
}

interface RemovePopupReduxProps {
}

interface RemovePopupReduxFunctions {
    removeAction: (id: string) => any;
}

function RemovePopup({
    id, removeAction, close, ...props
}: RemovePopupProps & RemovePopupReduxProps & RemovePopupReduxFunctions): ReactElement {
    return (
        <Popup css={tw``} close={close}>
            <p css={tw`font-bold text-xl`}>Удалить запись?</p>
            <div css={tw`mt-[20px] flex flex-row`}>
                <Button
                    onClick={() => {
                        removeAction(id);
                        close();
                    }}
                >
                    Удалить
                </Button>
                <Button onClick={() => close()}>
                    Не удалять
                </Button>
            </div>
        </Popup>
    );
}

const mapStateToProps = (state: RootState): RemovePopupReduxProps => ({});

const mapDispatchToProps: RemovePopupReduxFunctions = { removeAction };

export default connect<RemovePopupReduxProps, RemovePopupReduxFunctions, RemovePopupProps>(mapStateToProps, mapDispatchToProps)(RemovePopup);