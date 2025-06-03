import Header from "../components/Header";
import Footer from "../components/Footer";
import Routers from "../routes/Routers";

import { ToastContainer } from "react-toastify";
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Layout;
