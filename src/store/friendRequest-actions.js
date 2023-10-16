import { getAuthToken } from "../util/auth";
import { friendsRequestsActions } from "./friendRequests-slice";

export const fetchFriendRequestsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const token = getAuthToken();

      const response = await fetch(
        "http://localhost:8080/secret-santa/user/view-friend-requests",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart Data Failed!");
      }
      const data = await response.json();
      //   for (let i = 0; i < data.length; i++) {
      //     data[i].key = i;
      //   }
      return data;
    };
    try {
      console.log("Success");
      const friendRequestsData = await fetchData();

      dispatch(
        friendsRequestsActions.seeFriendRequests({
          friendRequests: friendRequestsData || [],
        })
      );
    } catch (error) {
      console.log("Error");
    }
  };
};

// ==============================================================================================================

export const friendRequestsResponse = (friendshipId, answer) => {
  return async (dispatch, getState) => {
    const state = getState();
    const friendRequest = state.friendRequests.response[0];

    if (!friendRequest) {
      console.error("Friend request not found for key:", friendshipId);
      return;
    }

    const acceptRequestBody = {
      friendshipId: friendRequest.friendshipId,
      requester: friendRequest.requester,
      recipient: friendRequest.recipient,
      status: friendRequest.status,
      dateRequested: friendRequest.dateRequested,
      dateProcessed: friendRequest.dateProcessed,
    };

    const token = getAuthToken();

    if (!token) {
      console.error("No valid token available.");
      throw new Error("No valid token available.");
    }

    try {
      const response = await fetch(
        "http://localhost:8080/secret-santa/user/process-request",
        {
          method: "POST",
          body: JSON.stringify(acceptRequestBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        throw new Error("Failed to respond to friend request");
      }

      // Dispatch the friendRequestResponse action with the key and answer
      dispatch(
        friendsRequestsActions.friendRequestResponse({
          friendshipId,
          answer,
        })
      );

      // Clear the response array
      dispatch(friendsRequestsActions.clearResponse());
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error (e.g., show a notification to the user).
      throw error;
    }
  };
};

// ==============================================================================================================

export const friendRequestSend = async (userId) => {
  const token = getAuthToken();
  console.log(token);
  const send = { recipient: userId };
  if (!token) {
    console.error("No valid token available.");
    // You may want to handle this case more explicitly (e.g., redirect to login).
    throw new Error("No valid token available.");
  }

  try {
    const response = await fetch(
      "http://localhost:8080/secret-santa/user/friend-request",
      {
        method: "POST",
        body: JSON.stringify(send),
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      console.error("Request failed with status:", response.status);
      // Handle the error (e.g., throw an error or return an error object).
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);

    throw error;
  }
};
