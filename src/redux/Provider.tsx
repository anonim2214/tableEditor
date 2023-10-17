'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PopupManagement from '@/components/PopupManagement/PopupManagement';
import { createTheme, ThemeProvider } from '@mui/system';
import Manager from '@/components/Manager/Manager';

function Providers({ children, isTable = false } : {children: React.ReactNode, isTable?: boolean}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <>
                    <Manager isTable={isTable} />
                    <PopupManagement />
                    {children}
                </>
            </Provider>
        </LocalizationProvider>
    );
}

export default Providers;