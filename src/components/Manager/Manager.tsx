import { connect } from 'react-redux';
import tw from 'twin.macro';
import React, { ReactElement, useEffect } from 'react';
import { Interpolation, Theme } from '@emotion/react/dist/emotion-react.cjs';
import { RootState } from '@/redux/store';
import { closePopup, openPopup } from '@/redux/popup/actions';
import PopupType from '@/redux/popup/types';
import { clearAction } from '@/redux/remove/actions';
import { clearAction as clearInsertAction, clearActiveRowAction } from '@/redux/insert/actions';
import { useRouter } from 'next/navigation';

interface ManagerProps {
    isTable?: boolean;
}

interface ManagerReduxProps {
    removeLoading: boolean;
    removeError: boolean;
    removeFinished: boolean;
    insertLoading: boolean;
    insertError: boolean;
    insertFinished: boolean;
    activeRow?: string;
    isNew: boolean;
}

interface ManagerReduxFunctions {
    openPopup: typeof openPopup;
    closePopup: typeof closePopup;
    clearAction: typeof clearAction;
    clearInsertAction: typeof clearInsertAction;
    clearActiveRowAction: typeof clearActiveRowAction;
}

function Manager({
    removeLoading, removeError, openPopup, activeRow, closePopup, insertFinished, insertLoading, insertError, clearInsertAction,
    removeFinished, clearAction, isTable = false, clearActiveRowAction, isNew,
}: ManagerProps & ManagerReduxProps & ManagerReduxFunctions): null {

    const router = useRouter();
    useEffect(() => {
        if (activeRow && isTable) {
            document.getElementById(activeRow)?.scrollIntoView();
            setTimeout(() => {
                clearActiveRowAction();
            }, 1500);
        }
    }, [activeRow, isTable]);

    useEffect(() => {
        if (removeLoading) {
            openPopup(PopupType.TEXT_POPUP, { text: 'Запись удаляется, ожидайте' });
        } else {
            closePopup(PopupType.TEXT_POPUP);
        }
    }, [removeLoading]);

    useEffect(() => {
        if (removeError) {
            openPopup(PopupType.TEXT_POPUP, { text: 'Произошла ошибка при удалении' });
        }
    }, [removeError]);

    useEffect(() => {
        if (removeFinished) {
            openPopup(PopupType.TEXT_POPUP, { text: 'Запись успешно удалена, вы превосходны' });
            clearAction();
        }
    }, [removeFinished]);

    useEffect(() => {
        if (insertLoading) {
            openPopup(PopupType.TEXT_POPUP, { text: `Запись ${isNew ? 'добавляется' : 'изменяется'}, ожидайте` });
        } else {
            closePopup(PopupType.TEXT_POPUP);
        }
    }, [insertLoading]);

    useEffect(() => {
        if (insertError) {
            openPopup(PopupType.TEXT_POPUP, { text: `Произошла ошибка при ${isNew ? 'добавлении' : 'изменении'}` });
        }
    }, [insertError]);

    useEffect(() => {
        if (insertFinished) {
            openPopup(PopupType.TEXT_POPUP, {
                text: `Запись успешно ${isNew ? 'добавлена' : 'изменена'}, вы превосходны`,
                handler: () => {
                    router.push('/');
                },
            });
            clearInsertAction();
        }
    }, [insertFinished]);

    return null;
}

const mapStateToProps = (state: RootState): ManagerReduxProps => ({
    removeLoading: state.remove.isLoading,
    removeError: state.remove.isError,
    removeFinished: state.remove.isFinished,
    insertLoading: state.insert.isLoading,
    insertError: state.insert.isError,
    insertFinished: state.insert.isFinished,
    activeRow: state.insert.activeRow,
    isNew: state.insert.isNew,
});

const mapDispatchToProps: ManagerReduxFunctions = {
    openPopup, closePopup, clearAction, clearActiveRowAction, clearInsertAction,
};

export default connect<ManagerReduxProps, ManagerReduxFunctions, ManagerProps>(mapStateToProps, mapDispatchToProps)(Manager);