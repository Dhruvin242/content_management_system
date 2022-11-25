import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountMenu from "../components/accountMenu";
import Breadcrumbs from "../components/bread";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DisplayAlert from "../components/alert";
import storage from "redux-persist/lib/storage";
import { Badge, Button } from "@mui/material";
import HideOTP from "./hideFolderOTP";
import {
  getFiles,
  getFolders,
  searchDocument,
} from "../redux/Slice/fileFolderSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { badgeCount } from "../redux/Slice/shareSlice";
import NotificationSharedFiles from "./notificationShare.dilog";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DashboardComponent = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hideOTP, sethideOTP] = React.useState(false);

  const { error } = useSelector((state) => ({ ...state.user }));
  const { message } = useSelector((state) => ({ ...state.user }));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      const token = user.token;
      dispatch(getFolders(token));
      dispatch(getFiles(token));
      dispatch(badgeCount(token));
    }
  }, [notificationOpen]);

  const { shareCount } = useSelector(
    (state) => ({
      shareCount: state.shareFiles.shareCount,
    }),
    shallowEqual
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    console.log("profile pressed");
  };

  const handlelogout = (event) => {
    storage.removeItem("persist:root");
    localStorage.removeItem("profile");
    navigate("/");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDoubleClick = () => {
    sethideOTP(true);
  };

  const handleSearch = (e) => {
    const body = {
      searchWord: e.target.value,
    };
    const token = user.token;
    const { searchWord } = body;
    if (searchWord.length > 0) dispatch(searchDocument({ body, token }));
    dispatch(getFolders(token));
    dispatch(getFiles(token));
  };

  const handleCard = () => {
    setNotificationOpen(true);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handlelogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <Logout />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      {error && (
        <DisplayAlert
          title="error"
          message={error}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      {message && (
        <DisplayAlert
          title="success"
          message={message}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      {hideOTP && <HideOTP sethideOTP={sethideOTP} />}
      {notificationOpen && (
        <NotificationSharedFiles setNotificationOpen={setNotificationOpen} />
      )}
      <div className="header-wrapper">
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              component={Button}
              onDoubleClick={handleDoubleClick}
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CMS
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={handleCard}>
              <Badge color="secondary" badgeContent={shareCount}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <AccountMenu />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      {renderMobileMenu}
      {renderMenu}
      <div className="navbar-wrapper">
        <Breadcrumbs />
      </div>
    </Box>
  );
};

export default DashboardComponent;
