import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
