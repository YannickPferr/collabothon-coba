import { Link, Typography } from "@mui/material";
import styles from "../styles/footerPage.module.css";

export default function feedbackPage() {
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
      <div className={styles.footerImageDiv}>
        <img
          src={"mock-images/feedback.png"}
          alt="Give Us Feedback"
          className={styles.footerImage}
        />
      </div>
      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          Give Us Feedback!
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
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
          Blabla Blabla Question Lorem Ipsum Collabothon?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
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
          Blabla Blabla Question Lorem Ipsum Collabothon?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </Typography>
      </div>
    </div>
  );
}
