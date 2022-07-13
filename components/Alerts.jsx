import { Alert, Snackbar } from '@mui/material';
import { useAlerts } from '../contexts/Alerts';

export default function Alerts() {
    const { alerts } = useAlerts();

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
