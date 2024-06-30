import { useState } from "react";

import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

import "~/styles/_follow.scss";
import { FRIENDS } from "~/constant";

const FollowProfile = () => {
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="follow">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
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
    </div>
  );
};

export default FollowProfile;
