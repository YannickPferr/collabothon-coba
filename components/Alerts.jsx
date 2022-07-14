import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { AlertContext } from '../utils/AlertsContext';

export default function Alerts() {
    const { alerts } = useContext(AlertContext);

    return (
        <>
            {alerts.length > 0 && (
                <Snackbar open={alerts.length > 0}>
                    <Alert variant="filled" severity={alerts[0].type}>
                        {alerts[0].message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
