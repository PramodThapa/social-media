import { Avatar, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";

import { getAcronym } from "~/utils";
import "~/sass/_header.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const isLoggedIn = true;
  return (
    <div className="wrapper">
      <div className="header">
        <div className="header__title">The Daily Insight </div>

        {isLoggedIn && (
          <div className="header__profile">
            <div onClick={() => {}} className="header__profile info">
              <IconButton>
                <Avatar>{getAcronym("")}</Avatar>
              </IconButton>
              <div className="info__name">{`Pramod`}</div>
            </div>

            <div className="header__profile logout" onClick={() => {}}>
              <span>Logout</span>
              <Logout fontSize="small" style={{ marginLeft: "2" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
