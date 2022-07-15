import EmailIcon from '@mui/icons-material/Email';
import EuroIcon from '@mui/icons-material/Euro';
import FlagIcon from '@mui/icons-material/Flag';
import HandshakeIcon from '@mui/icons-material/Handshake';
import KeyIcon from '@mui/icons-material/Key';
import {
    Button,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bcrypt from 'bcryptjs';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAlerts } from '../contexts/Alerts';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';
import styles from '../styles/Login.module.css';

const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function Login() {
    const { user, loggedIn, login } = useAuth();
    const { addAlert } = useAlerts();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [emailFieldError, setEmailFieldError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordFieldError, setPasswordFieldError] = useState('');

    const isInputValid = () => {
        const isEmailValid = emailFieldError.length === 0;
        const isPasswordValid = passwordFieldError.length === 0;
        return isEmailValid && isPasswordValid;
    };

    const submit = async (e) => {
        e.preventDefault();
        const hashedPassword = bcrypt.hashSync(password, 10);
        if (isInputValid()) {
            const docRef = doc(db, 'user', email);
            const user = await getDoc(docRef);

            if (user.exists()) {
                const hashedPassword = await user.get('password');
                const isCorrectpassword = bcrypt.compareSync(
                    password,
                    hashedPassword
                );
                if (isCorrectpassword) {
                    addAlert('success', 'Sucessfully logged in');
                    login(email);
                } else setPasswordFieldError('Incorrect password');
            } else setEmailFieldError('This user does not exist');
        }
    };

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = () => {
        //validate email
        if (email.match(validEmailRegex)) setEmailFieldError('');
        else setEmailFieldError('Please enter a valid email');
    };

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value);
    };

    const validatePassword = () => {
        if (password.length > 0) setPasswordFieldError('');
        else setPasswordFieldError('Please enter a valid password');
    };

    const customTextFieldTheme = createTheme({
        components: {
            // Inputs
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        opacity: 0.8,
                    },
                },
            },
        },
    });

    const textSizingAppName = {
        fontSize: {
            lg: 150,
            md: 100,
            sm: 60,
            xs: 30,
        },
    };

    const textSizingHeader = {
        fontSize: {
            lg: 60,
            md: 50,
            sm: 35,
            xs: 25,
        },
    };
    if (!user) return <LoadingIndicator />;

    return (
        <>
            {!loggedIn && (
                <div className={styles.main}>
                    <div className={styles.appLogoImageDiv}>
                        <img
                            src={'White_Notext.svg'}
                            alt="Logo"
                            className={styles.appLogo}
                        />
                    </div>
                    <Typography
                        variant="h1"
                        className={styles.appName}
                        sx={textSizingAppName}
                    >
                        ReNetwork
                    </Typography>
                    <div className={styles.textFieldContainer}>
                        <ThemeProvider theme={customTextFieldTheme}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                id="outlined-basic"
                                label="Email"
                                type="email"
                                variant="outlined"
                                error={emailFieldError.length > 0}
                                helperText={
                                    emailFieldError.length > 0
                                        ? emailFieldError
                                        : ''
                                }
                                required
                                fullWidth
                                value={email}
                                onChange={handleEmailInputChange}
                                onBlur={validateEmail}
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={customTextFieldTheme}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                id="outlined-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                error={passwordFieldError.length > 0}
                                helperText={
                                    passwordFieldError.length > 0
                                        ? passwordFieldError
                                        : ''
                                }
                                onChange={handlePasswordInputChange}
                                onBlur={validatePassword}
                            />
                        </ThemeProvider>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={submit}
                        >
                            <Typography variant="h6">Login</Typography>
                        </Button>
                    </div>
                    <div className={styles.donatePartnerButtonsContainer}>
                        <Button
                            href="/welcome"
                            variant="contained"
                            startIcon={<FlagIcon />}
                            className={styles.donatePartnerButton}
                            fullWidth
                        >
                            <Typography variant="h6">Start tour</Typography>
                        </Button>
                        <Button
                            href="/donation"
                            variant="contained"
                            startIcon={<EuroIcon />}
                            className={styles.donatePartnerButton}
                            fullWidth
                            style={{ marginRight: '20px', marginLeft: '20px' }}
                        >
                            <Typography variant="h6">Donate</Typography>
                        </Button>
                        <Button
                            href="/partners"
                            variant="contained"
                            startIcon={<HandshakeIcon />}
                            className={styles.donatePartnerButton}
                            fullWidth
                        >
                            <Typography variant="h6">
                                Corporate Partners
                            </Typography>
                        </Button>
                    </div>
                    <div className={styles.signupDiv}>
                        <Typography
                            variant="h2"
                            display="block"
                            gutterBottom
                            className={styles.signupHeader}
                            sx={textSizingHeader}
                        >
                            Not have an account yet?
                        </Typography>
                        <div className={styles.joinUsImageDiv}>
                            <Link href="signup" underline="hover">
                                <img
                                    src={'mock-images/join-us.png'}
                                    alt="Join Us Its Free"
                                    className={styles.joinUsImage}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
