import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { ButtonAction, User } from "~/types/interface";
import { Button } from "@mui/material";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { interpolate } from "~/utils";
import { ROUTE } from "~/constant/route";

export interface UserCardProps {
  user: User;
  actions: ButtonAction[];
}

const UserCard = ({ user, actions }: UserCardProps) => {
  const { username, avatarUrl, id } = user;
  const { user: follower } = useIsLoggedIn();
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(interpolate(ROUTE.VIEW_PROFILE, { id }));
  };

  const ButtonGroup = actions?.map((action, index) => (
    <>
      <Button
        sx={{
          fontSize: 16,
          font: "inherit",
          textTransform: "none",
        }}
        key={index}
        onClick={(event) => {
          event.stopPropagation();
          action.handleClick(user?.id, follower?.id);
        }}
      >
        {action.name}
      </Button>
    </>
  ));
  return (
    <Box onClick={handleCardClick} key={user.id}>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          borderRadius: 2,
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <Avatar alt={username} src={avatarUrl} sx={{ width: 56, height: 56 }} />
        <Box ml={2} flexGrow={1}>
          <Typography sx={{ font: "inherit" }} variant="h6">
            {username}
          </Typography>
        </Box>
        <Box ml={2}>{ButtonGroup}</Box>
      </Card>
    </Box>
  );
};

export default UserCard;
