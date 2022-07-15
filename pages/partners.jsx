import { Link, Typography } from "@mui/material";
import styles from "../styles/partners.module.css";

export default function corporatePage() {
  const textSizingNormal = {
    fontSize: {
      lg: 25,
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
      <div className={styles.headerTextDiv}>
        <Typography
          variant="h1"
          display="block"
          gutterBottom
          className={styles.title}
        >
          Corporate Social Responsibility Drives Business Value
        </Typography>
      </div>
      <div className={styles.parentContainer}>
        <div className={styles.imageDivLeft}>
          <img src={"mock-images/happy-world.png"} className={styles.image} />
        </div>
        <div className={styles.textDiv}>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textHeader}
            sx={textSizingHeader}
          >
            Marketplace Value can be increased by a CSR initiative!
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.text}
            sx={textSizingNormal}
          >
            This potentially results in:
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textPoint}
            sx={textSizingNormal}
          >
            - Increased Sales and profitability
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textPoint}
            sx={textSizingNormal}
          >
            - Greater employee engagement
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textPoint}
            sx={textSizingNormal}
          >
            - Competitive superiority
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textPoint}
            sx={textSizingNormal}
          >
            - Attraction for qualified personnel
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textPoint}
            sx={textSizingNormal}
          >
            - Innovation
          </Typography>
        </div>
      </div>

      <div className={styles.parentContainer}>
        <div className={styles.textDiv}>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.textHeader}
            sx={textSizingHeader}
          >
            Do you want to work with us?
          </Typography>
          <Typography
            variant="h2"
            display="block"
            gutterBottom
            className={styles.text}
            sx={textSizingNormal}
          >
            ReNetwork is one of the biggest projects in the field of integrating
            refugees. Many sponsors are already taking part. Together they all
            live a companionship culture that supports refugees all over the
            world. Due to demographic change, there is already a skills shortage
            on many labour markets. Therefore, ReNetwork offers unique
            opportunities for corporates. Corporates can get to know potential
            specialists and get them excited about their company at an early
            stage. Corporates can strengthen their region: ReNetworrk connects
            people. Whole regions benefit from this. Networking promotes
            exchange and mutual understanding of each other, it provides
            important suggestions in both directions and increases the
            attractiveness of the location. This benefits everyone locally.
          </Typography>
        </div>
        <div className={styles.imageDivRight}>
          <img src={"mock-images/teamwork.png"} className={styles.image} />
        </div>
      </div>
      <div className={styles.headerTextDiv}>
        <Typography
          variant="h1"
          display="block"
          gutterBottom
          className={styles.partnersTitle}
        >
          We cooperate with the following partners:
        </Typography>
      </div>
      <div className={styles.parentContainer}>
        <div className={styles.companyLogoDiv}>
          <img src={"logos/commerzbank.png"} className={styles.image} />
        </div>
        <div className={styles.companyLogoDiv}>
          <img src={"logos/google.png"} className={styles.image} />
        </div>
        <div className={styles.companyLogoDiv}>
          <img src={"logos/Oreilly.svg"} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
