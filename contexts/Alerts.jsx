import { createContext, useCallback, useContext, useState } from 'react';

const AlertContext = createContext({
    alerts: [],
    addAlert: (type, message, alertTime = 2000) => {},
});

export default function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = () => {
        const alertsCopy = [...alerts];
        alertsCopy.shift();
        setAlerts(alertsCopy);
    };

    const addAlert = (type, message, alertTime = 2000) => {
        const alertsCopy = [...alerts];
        alertsCopy.push({ type, message });
        setAlerts(alertsCopy);
        setTimeout(() => removeAlert(), alertTime);
    };

    const contextValue = {
        alerts,
        addAlert: useCallback(
            (type, message, alertTime = 2000) =>
                addAlert(type, message, alertTime),
            []
        ),
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
}

export const useAlerts = () => useContext(AlertContext);
