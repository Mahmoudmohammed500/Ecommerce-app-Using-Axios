import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header, Notifications } from "../components/Layout";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    const unloadCallback = () => {  //this callbackfunction to emty redux cart-items when closing the app 
      localStorage.clear()
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [])
  return (
    <Container>
        <Header />
        <Notifications />
        <div>
          <Outlet />
        </div>
    </Container>
  );
};

export default Layout;
