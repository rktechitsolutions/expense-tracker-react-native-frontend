import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Box } from "@mui/material";

function DashboardLayout({ children }) {

  // const { pathname } = useLocation();

  // useEffect(() => {
  //   setLayout(dispatch, "dashboard");
  // }, [pathname]);

  return (
    <Box>
      {children}
      <ToastContainer />
    </Box>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
