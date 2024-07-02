import { FollowAction, FollowTabs } from "~/types";
import { ButtonAction } from "~/types/interface";
import { useUserFollow } from "./user/userUser";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "~/constant";

type ActionsMap = {
  [key in FollowTabs]: ButtonAction[];
};

const useFriendAction = (status: string) => {
  const { mutateAsync: onUserFollow } = useUserFollow();
  const queryClient = useQueryClient();

  const handleFollow = async (from?: string, to?: string) => {
    if (!from || !to) return;
    const payload = {
      followerId: from,
      followeeId: to,
      action: FollowAction.CREATE,
    };
    await onUserFollow(payload);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.FRIENDS],
    });
  };
  const handleAccept = async (from?: string, to?: string) => {
    if (!from || !to) return;
    const payload = {
      followerId: from,
      followeeId: to,
      action: FollowAction.UPDATE,
    };
    await onUserFollow(payload);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.FRIENDS],
    });
  };
  const handleCancel = async (from?: string, to?: string) => {
    if (!from || !to) return;
    const payload = {
      followerId: from,
      followeeId: to,
      action: FollowAction.CANCEL,
    };
    await onUserFollow(payload);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.FRIENDS],
    });
  };
  const handleReject = async (from?: string, to?: string) => {
    if (!from || !to) return;
    const payload = {
      followerId: from,
      followeeId: to,
      action: FollowAction.REJECT,
    };
    await onUserFollow(payload);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.FRIENDS],
    });
  };

  const tab: FollowTabs =
    (status.toUpperCase() as FollowTabs) || FollowTabs.ALL;

  const actions: ActionsMap = {
    [FollowTabs.ALL]: [{ name: "Follow", handleClick: handleFollow }],
    [FollowTabs.PENDING]: [
      { name: "Accept", handleClick: handleAccept },
      { name: "Reject", handleClick: handleReject },
    ],
    [FollowTabs.FOLLOWER]: [{ name: "Follow Back", handleClick: handleFollow }],
    [FollowTabs.REQUESTED]: [{ name: "Cancel", handleClick: handleCancel }],
    [FollowTabs.FOLLOWINGS]: [{ name: "Unfollow", handleClick: handleCancel }],
    [FollowTabs.SUGGESTIONS]: [{ name: "Follow", handleClick: handleFollow }],
  };

  const buttonActions = actions[tab];

  return { buttonActions };
};

export default useFriendAction;
