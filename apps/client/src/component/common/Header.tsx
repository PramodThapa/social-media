import { Avatar, Button, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";

import { getAcronym, interpolate } from "~/utils";
import "~/styles/_header.scss";
import { clearUserFromLocalStorage } from "~/services";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "~/constant/route";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";
import { BLOG, FALLBACK_ID, FRIENDS } from "~/constant";

export const Header = () => {
  const navigator = useNavigate();

  const { isLoggedIn, user } = useIsLoggedIn();

  const handleLogout = () => {
    clearUserFromLocalStorage();
    navigator(ROUTE.AUTH);
  };

  const handleLogoClick = () => {
    navigator(ROUTE.HOME);
  };

  const handleProfileClick = () => {
    navigator(interpolate(ROUTE.VIEW_PROFILE, { id: user?.id || FALLBACK_ID }));
  };

  return (
    <div className="wrapper">
      <div className={`header ${isLoggedIn ? "header--is-logged" : ""}`}>
        <div className="header__title">
          <p onClick={handleLogoClick} className="logo">
            The Daily Insight
          </p>

          {isLoggedIn && (
            <div className="title-group">
              <Button
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  textTransform: "none",
                }}
                color="inherit"
                component={Link}
                to={ROUTE.CREATE_BLOG}
              >
                {BLOG.CREATE_BLOG}
              </Button>
              <Button
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  textTransform: "none",
                }}
                color="inherit"
                component={Link}
                to={ROUTE.VIEW_FOLLOWER}
              >
                {FRIENDS.FRIEND_NAV}
              </Button>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div className="header__profile">
            <div onClick={handleProfileClick} className="header__profile info">
              <IconButton>
                <Avatar>{getAcronym("")}</Avatar>
              </IconButton>
              <div className="info__name">{user?.username}</div>
            </div>

            <div className="header__profile logout" onClick={handleLogout}>
              <span>Logout</span>
              <Logout fontSize="small" style={{ marginLeft: "2" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
