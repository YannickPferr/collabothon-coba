import { Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/Footer.module.css";

export default function Footer({ appJs }) {
  const router = useRouter();
  if (appJs) {
    return (
      router.asPath !== "/" &&
      router.asPath !== "/network" &&
      !router.asPath.startsWith("/chat") && (
        <div className={styles.footer}>
          <Link
            onClick={() => router.push("/faq")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>FAQ</Typography>
          </Link>
          <Link
            onClick={() => router.push("/best-practices")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Best Practices</Typography>
          </Link>
          <Link
            onClick={() => router.push("/privacy-policy")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Privacy Policy</Typography>
          </Link>
          <Link
            onClick={() => router.push("/terms-and-conditions")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Terms and Conditions</Typography>
          </Link>
          <Link
            onClick={() => router.push("/donation")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Support Us</Typography>
          </Link>
          <Link
            onClick={() => router.push("/partners")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Partners</Typography>
          </Link>
          <Link
            onClick={() => router.push("/feedback")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={"white"}>Feedback</Typography>
          </Link>
        </div>
      )
    );
  }

  return (
    router.asPath !== "/" && (
      <div className={styles.footer}>
        <Link onClick={() => router.push("/faq")} style={{ cursor: "pointer" }}>
          <Typography color={"white"}>FAQ</Typography>
        </Link>
        <Link
          onClick={() => router.push("/best-practices")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Best Practices</Typography>
        </Link>
        <Link
          onClick={() => router.push("/privacy-policy")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Privacy Policy</Typography>
        </Link>
        <Link
          onClick={() => router.push("/terms-and-conditions")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Terms and Conditions</Typography>
        </Link>
        <Link
          onClick={() => router.push("/donation")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Support Us</Typography>
        </Link>
        <Link
          onClick={() => router.push("/partners")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Partners</Typography>
        </Link>
        <Link
          onClick={() => router.push("/feedback")}
          style={{ cursor: "pointer" }}
        >
          <Typography color={"white"}>Feedback</Typography>
        </Link>
      </div>
    )
  );
}
