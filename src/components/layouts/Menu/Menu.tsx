import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { Stack, SvgIconProps } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import WidgetsIcon from "@mui/icons-material/Widgets";
import BarChartIcon from "@mui/icons-material/BarChart";
import HouseIcon from "@mui/icons-material/House";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProps = {
  onDrawerClose: () => void;
  open: boolean;
};

type UserMenu = {
  name: string;
  link: string;
  icon: React.ReactElement<SvgIconProps>;
}[];

type AdminMenu = {
  name: string;
  link: string;
  icon: React.ReactElement<SvgIconProps>;
}[];

export default function Menu({ open, onDrawerClose }: MenuProps) {
  const theme = useTheme();
  const userMenu: UserMenu = [
    {
      name: "Home",
      link: "/home",
      icon: <HouseIcon></HouseIcon>,
    },
    {
      name: "Shopping",
      link: "/shopping",
      icon: <StorefrontIcon></StorefrontIcon>,
    },
    { name: "About us", link: "/about-us", icon: <PeopleIcon></PeopleIcon> },
  ];
  const adminMenu: AdminMenu = [
    { name: "Stock", link: "/stock", icon: <WidgetsIcon></WidgetsIcon> },
    { name: "Report", link: "/report", icon: <BarChartIcon></BarChartIcon> },
  ];

  const location = useLocation();
  const path = location.pathname;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
          {/* TODO: Add Logo*/}
          {/* <img 
          src={`${process.env.PUBLIC_URL}/images/cm_logo.png`}
          style={{height: 30}}
          /> */}
          <IconButton
            onClick={() => {
              onDrawerClose();
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {userMenu.map((menu, index) => (
          <ListItemButton
            sx={{ my: 1, pl: 5 }}
            key={menu.name}
            selected={menu.link === path}
            to={menu.link}
            component={Link}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {adminMenu.map((menu, index) => (
          <ListItemButton
            sx={{ my: 1, pl: 5 }}
            key={menu.name}
            selected={menu.link === path}
            to={menu.link}
            component={Link}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
