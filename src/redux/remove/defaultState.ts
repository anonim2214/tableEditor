import { RemoveState } from '@/redux/remove/types';

const defaultState: RemoveState = {
    isError: false, isLoading: false, removedRows: [], isFinished: false,
};

export default defaultState;