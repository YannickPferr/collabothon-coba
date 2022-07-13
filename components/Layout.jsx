import { Footer } from "../components";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Layout = (props) => {
    return (
      <div>
        <>
          <ResponsiveAppBar />
          {props.children}
          <Footer />
        </>
      </div>
    );
  };
  
  export default Layout;
  