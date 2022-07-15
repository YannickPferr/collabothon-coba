import { Link, Typography } from "@mui/material";
import styles from "../styles/footerPage.module.css";

export default function donationPage() {
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
      <div className={styles.footerImageDiv}>
        <img
          src={"mock-images/donations.png"}
          alt="Donations"
          className={styles.footerImage}
        />
      </div>
      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeaderTitle}
          sx={textSizingHeaderTitle}
        >
          Do you want to Support Us?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeaderTitle}
          sx={textSizingHeaderTitle}
        >
          Your donation is used for:
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
          Supporting Refugees
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Unlike companies, we are providing direct aid towards a very specific
          group of people; the NMRG members who protected us. They aren't
          unnamed, faceless refugees in a country we couldn't pinpoint on a map:
          We know their names, we know their faces.
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
          Supporting Human Rights
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Every person has dignity simply by virtue of being a human being. In
          order to protect this human dignity, human beings are entitled to
          rights which are inalienable and indivisible. There are numerous
          mechanisms at the international and regional levels to promote human
          rights protection worldwide and to monitor compliance by States with
          human rights obligations. ReNetwork is a part of supporting Human
          Rights.
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
          <div className={styles.textDiv}>
            <Typography
              variant="h2"
              display="block"
              gutterBottom
              className={styles.textHeader}
              sx={textSizingHeader}
            >
              Supporting Diversity
            </Typography>
            <Typography
              variant="h2"
              display="block"
              gutterBottom
              className={styles.text}
              sx={textSizingNormal}
            >
              Diversity opens new horizons for people where they can meet and
              interact with each other freely. The economy also benefits from
              this. Diverse Teams are more productive and as a result achieve
              better accomplishments. Intercultural intelligence is a key factor
              for businesses and their success.
            </Typography>
          </div>
        </Typography>
      </div>
    </div>
  );
}
