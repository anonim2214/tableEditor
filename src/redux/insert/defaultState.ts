import { InsertState } from '@/redux/insert/types';

const defaultState: InsertState = {
    isError: false, isLoading: false, isFinished: false, isNew: true,
};

export default defaultState;