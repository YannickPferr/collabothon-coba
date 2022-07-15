import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingIndicator() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
        </div>
    );
}
