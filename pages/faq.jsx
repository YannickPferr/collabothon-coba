import { Button, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/footerPage.module.css";

export default function FaqPage() {
  const router = useRouter()

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

  const textSizingHeaderTitle = {
    fontSize: {
      lg: 60,
      md: 25,
      sm: 20,
      xs: 20,
    },
  };

  return (
    <div className={styles.main}>
      <div className={styles.homeButton}>
        <Button onClick={() => { router.push("/") }} style={{ color: "black" }}>
          <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
            Home
          </Typography>
        </Button>
      </div>
      <div className={styles.footerImageDiv}>
        <img
          src={"mock-images/faq.png"}
          alt="Frequently Asked Questions"
          className={styles.footerImage}
        />
      </div>
      <Typography
        variant="h2"
        display="block"
        gutterBottom
        className={styles.textHeaderTitle}
        sx={textSizingHeaderTitle}
      >
        Frequently Asked Questions
      </Typography>
      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          What can help refugees?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          As buddy you can help refugees to settle down in their new home.
          Depending on what you can support, such as asylum application, child
          care, medical care, etc. or just as translator, you could definitely
          contribute to our whole community.
        </Typography>
      </div>

      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          How can I help refugees?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          In the registration, you have chosen the skill that you can help
          refugees with. Your entries will be matched with the needs of
          refugees. This is the mechanism how the match will be found.
        </Typography>
      </div>

      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          How many refugees can I help?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          As buddy you can be connected with up to 4 refugees.
        </Typography>
      </div>

      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          How can I find a buddy who can help me?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          During the registration phase, you will have to complete your profile
          in which you may provide your needs. The needs will be matched in the
          background with the skills provided by buddies. When you enter the
          main page, your buddies will be shown on the network page, you can
          talk with them by using the chat function.
        </Typography>
      </div>

      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          How many buddies can I have?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          After the registration you will be assigned with up to 4 buddies based
          on the skills that were matched.
        </Typography>
      </div>

      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          How secure is your website?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Although we believe in our registrated buddies, there will still be a
          verification process in our Re-Network application for Buddys.
          Furthermore, data protection is something we concerned. Without the
          permission of our users, their data will not be given to any third
          parties.
        </Typography>
      </div>
    </div>
  );
}
