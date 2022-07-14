import { Button, Link, TextField, Typography } from "@mui/material";
import bcrypt from "bcryptjs";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import db from "../firebase.config";
import styles from "../styles/Login.module.css";
import { AlertContext } from "../utils/AlertsContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function Login() {
  const { addAlert } = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [emailFieldError, setEmailFieldError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordFieldError, setPasswordFieldError] = useState("");

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
      const docRef = doc(db, "user", email);
      const user = await getDoc(docRef);

      if (user.exists()) {
        const hashedPassword = await user.get("password");
        const isCorrectpassword = bcrypt.compareSync(password, hashedPassword);
        if (isCorrectpassword) {
          addAlert("success", "Sucessfully logged in");
          //login();
        } else setPasswordFieldError("Incorrect password");
      } else setEmailFieldError("This user does not exist");
    }
  };

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    //validate email
    if (email.match(validEmailRegex)) setEmailFieldError("");
    else setEmailFieldError("Please enter a valid email");
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const validatePassword = () => {
    if (password.length > 0) setPasswordFieldError("");
    else setPasswordFieldError("Please enter a valid password");
  };

  const customTextFieldTheme = createTheme({
    components: {
      // Inputs
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            opacity: 0.8,
          },
        },
      },
    },
  });

  return (
    <div className={styles.main}>
      <img src={"White_Notext.svg"} alt="Logo" className={styles.logo} />
      <Typography variant="h1" className={styles.appName}>
        ReNetwork
      </Typography>
      <div className={styles.textFieldContainer}>
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
        <Button fullWidth size="large" variant="contained" onClick={submit}>
          Login
        </Button>
      </div>
      <div className={styles.signupDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.signupHeader}
        >
          Not have an account yet?
        </Typography>

        <Link href="signup" underline="hover">
          <img
            src={"mock-images/join-us.png"}
            alt="Join Us Its Free"
            className={styles.joinUsImage}
          />
        </Link>
      </div>
    </div>
  );
}
