import * as React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ShoppingPage from "./components/pages/ShoppingPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import StockPage from "./components/pages/StockPage";
import ReportPage from "./components/pages/ReportPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import HomePage from "./components/pages/HomePage";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: "red",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage:
            "url(" +
            `${process.env.PUBLIC_URL}/images/drawer-background.png` +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#9cff7a",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#9cff7a",
          },
          "&:hover": {
            backgroundColor: "#e2ffd8",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 800,
  },
  palette: {
    primary: {
      main: "#54B435",
      "100": "#9cff7a",
    },
    secondary: {
      main: "#F0FF42",
    },
    background: {
      default: "white",
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} onDrawerOpen={toggleDrawer}></Header>
        <Menu open={open} onDrawerClose={toggleDrawer}></Menu>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shopping" element={<ShoppingPage />} />
            <Route
              path="/shopping/product/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/stock/create" element={<StockCreatePage />} />
            <Route path="/stock/edit/:id" element={<StockEditPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/" element={<Navigate to="/login"></Navigate>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>Opps!</h1>
    <p>404 - Not Found</p>
    <Link to={"/"}>Back</Link>
  </div>
);
