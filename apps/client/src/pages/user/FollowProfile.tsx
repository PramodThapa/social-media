import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

import "~/styles/_follow.scss";
import { FRIENDS } from "~/constant";
import useTabs from "~/hooks/useTabs";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "~/constant/route";
import { useEffect, useState } from "react";
import FriendList from "./FriendList";

const FollowProfile = () => {
  const { value, handleChange } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    handleChange(event, value);
    const tabObject = FRIENDS.FRIENDS_TAB.find((tab) => tab.index === value);
    const tabName = tabObject ? tabObject.label.toLowerCase() : "";
    navigate(`${ROUTE.VIEW_FOLLOWER}/?status=${tabName}`);
  };

  const [status, setValue] = useState("all");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    if (status) {
      setValue(status);
    }
  }, [location.search]);

  return (
    <div className="follow">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange}>
            {FRIENDS.FRIENDS_TAB.map((tab) => (
              <Tab
                key={tab.index}
                label={tab.label}
                value={tab.index}
                style={{
                  fontSize: "15px",
                  fontFamily: "inherit",
                  textTransform: "none",
                }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>

      <FriendList status={status}  />
    </div>
  );
};

export default FollowProfile;
