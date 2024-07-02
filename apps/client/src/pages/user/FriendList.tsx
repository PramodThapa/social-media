import UserCard from "~/component/user/UserCard";
import { useUserFriend } from "~/hooks/user/userUser";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";
import { FALLBACK_ID } from "~/constant";
import { Grid } from "@mui/material";
import useFriendAction from "~/hooks/useFriendAction";

export interface FriendListProps {
  status: string;
}

const FriendList = ({ status }: FriendListProps) => {
  const { user } = useIsLoggedIn();
  const { buttonActions } = useFriendAction(status);

  const { data: users } = useUserFriend(
    Number(user?.id) || FALLBACK_ID,
    status
  );

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      {users?.map((user) => (
        <Grid item key={user.id} xs={12} sm={6} md={4} lg={4}>
          <UserCard user={user} actions={buttonActions} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FriendList;
