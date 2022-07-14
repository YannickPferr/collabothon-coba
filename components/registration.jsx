import { Button, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bcrypt from 'bcryptjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAlerts } from '../contexts/Alerts';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';
import styles from '../styles/registration.module.css';

const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function Registration({ role = 'Buddy' }) {
    const { addAlert } = useAlerts();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [nameErrorField, setNameErrorField] = useState('');

    const [email, setEmail] = useState('');
    const [emailFieldError, setEmailFieldError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordFieldError, setPasswordFieldError] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordFieldError, setRepeatPasswordFieldError] =
        useState('');

    const isInputValid = () => {
        const isEmailValid = emailFieldError.length === 0;
        const isPasswordValid = passwordFieldError.length === 0;
        const isPasswordRepeatValid = repeatPasswordFieldError.length === 0;
        return isEmailValid && isPasswordValid && isPasswordRepeatValid;
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
                    role,
                    name,
                    email,
                    password: hashedPassword,
                });
                addAlert('success', 'Sucessfully signed up');
                login(email);
            }
        }
    };

    const handleNameInputChange = (e) => {
        setName(e.target.value);
    };

    const validateName = () => {
        if (name.length > 0) setNameErrorField('');
        else setNameErrorField('Please enter a name');
    };

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = () => {
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

    const handleRepeatPasswordInputChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const validateRepeatPassword = () => {
        if (repeatPassword === password) setRepeatPasswordFieldError('');
        else setRepeatPasswordFieldError('Passwords do not match');
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
    
    
  const textSizingNormal = {
    fontSize: {
      lg: 30,
      md: 20,
      sm: 15,
      xs: 15,
    },
  };

  const textSizingHeader = {
    fontSize: {
      lg: 40,
      md: 25,
      sm: 20,
      xs: 20,
    },
  };
  
    return (
        <div className={styles.main}>
      <img
        src={
          role.toLocaleLowerCase() === "buddy"
            ? "mock-images/buddies-superheroes.png"
            : "mock-images/buddies.png"
        }
        alt="Sign Up As A Buddy"
        className={styles.signupImage}
      />

      <Typography
        variant="h2"
        className={styles.signupHeader}
        sx={textSizingHeader}
      >
        Sign up as a {role}!
      </Typography>
      <div className={styles.textFieldContainer}>
        <ThemeProvider theme={customTextFieldTheme}>
          <TextField
            id="outlined-basic"
            label="Name"
            type="text"
            variant="outlined"
            error={nameErrorField.length > 0}
            helperText={nameErrorField.length > 0 ? nameErrorField : ""}
            required
            fullWidth
            value={name}
            onChange={handleNameInputChange}
            onBlur={validateName}
          />
        </ThemeProvider>
        <ThemeProvider theme={customTextFieldTheme}>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            error={emailFieldError.length > 0}
            helperText={emailFieldError.length > 0 ? emailFieldError : ""}
            required
            fullWidth
            value={email}
            onChange={handleEmailInputChange}
            onBlur={validateEmail}
          />
        </ThemeProvider>
        <ThemeProvider theme={customTextFieldTheme}>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            error={passwordFieldError.length > 0}
            helperText={passwordFieldError.length > 0 ? passwordFieldError : ""}
            onChange={handlePasswordInputChange}
            onBlur={validatePassword}
          />
        </ThemeProvider>
        <ThemeProvider theme={customTextFieldTheme}>
          <TextField
            id="outlined-basic"
            label="Repeat password"
            type="password"
            variant="outlined"
            required
            fullWidth
            value={repeatPassword}
            error={repeatPasswordFieldError.length > 0}
            helperText={
              repeatPasswordFieldError.length > 0
                ? repeatPasswordFieldError
                : ""
            }
            onChange={handleRepeatPasswordInputChange}
            onBlur={validateRepeatPassword}
          />
        </ThemeProvider>
        <Button fullWidth variant="contained" onClick={submit}>
          Sign up
        </Button>
      </div>
    </div>
    );
}
