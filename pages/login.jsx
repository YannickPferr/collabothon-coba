import { Alert, Button, TextField, Typography } from '@mui/material';
import bcrypt from 'bcryptjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import db from '../firebase.config';
import styles from '../styles/Login.module.css';

const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function Login() {
    const [email, setEmail] = useState('');
    const [emailFieldError, setEmailFieldError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordFieldError, setPasswordFieldError] = useState('');

    const [success, setSuccess] = useState(false);

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

            if (user.exists()) setEmailFieldError('User already exists');
            else {
                const result = await setDoc(doc(db, 'user', email), {
                    email,
                    password: hashedPassword,
                });
                setEmail('');
                setPassword('');
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
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

    return (
        <div className={styles.main}>
            <Typography variant="h1">Migrant Mate!</Typography>
            <h1>Hey, put in your name!</h1>
            <div className={styles.textFieldContainer}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={emailFieldError.length > 0}
                    helperText={
                        emailFieldError.length > 0 ? emailFieldError : ''
                    }
                    required
                    fullWidth
                    value={email}
                    onChange={handleEmailInputChange}
                    onBlur={validateEmail}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                    value={password}
                    error={passwordFieldError.length > 0}
                    helperText={
                        passwordFieldError.length > 0 ? passwordFieldError : ''
                    }
                    onChange={handlePasswordInputChange}
                    onBlur={validatePassword}
                />
            </div>
            <Button onClick={submit}>Submit</Button>
            {success && (
                <Alert variant="filled" severity="success">
                    Thanks for signing up!
                </Alert>
            )}
        </div>
    );
}
