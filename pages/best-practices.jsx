import { Button, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/footerPage.module.css";

export default function bestPracticesPage() {
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
          src={"mock-images/best-practices.png"}
          alt="Best Practices"
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
        Best Practices
      </Typography>
      <div className={styles.textDiv}>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textHeader}
          sx={textSizingHeader}
        >
          What is a good buddy?
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          If you choose to be a buddy, it is important to have thorough
          knowledge of your neighborhood and its quirks and features. It is also
          advantageous if you have already had experience with the asylum
          process or are a former refugee yourself. As a buddy you will be a
          mentor and share your past experiences. You have the ability to take
          the time to help refugees with your advice and action. Intercultural
          communication is your passion, and you have an affinity for languages.
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
          Buddies do not have to be perfect
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          It is not necessary that you are already an expert at everything. Much
          more important is your willingness to help refugees to find their way
          in a new environment. You have been living here and have a great deal
          of regional experience, which the refugees can benefit from the most.
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
          General Tipps
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          Don't get overwhelmed. There are extremely many issues refugees are
          facing. Still, you can be proactive and signal that you're there and
          standing by for help with some of the issues. Stay positive and
          support in this way. Patience is also required, change often takes
          time. Try to understand the refugee’s personality and adapt your
          communication style accordingly.
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
          Responsibility
        </Typography>
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.text}
          sx={textSizingNormal}
        >
          A buddy provides moral support in the first important weeks by
          introducing the new living environment. Relationships matter. A buddy
          may be the first point of contact for refugees and should be capable
          of establishing help quickly. You want people to feel comfortable and
          safe asking questions and bringing up issues. We live the culture of
          openness and teamwork.
        </Typography>
      </div>
    </div>
  );
}
