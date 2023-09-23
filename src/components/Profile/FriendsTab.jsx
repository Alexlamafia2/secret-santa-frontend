import classes from "./FriendsTab.module.css";
import keycloak from "../../util/keycloak";
import FriendsList from "../Friends/FriendsList";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
const FriendsTab = () => {
  const data = useLoaderData();
  return (
    <div className={classes["profile-tabs"]}>
      <FriendsList events={data}></FriendsList>
    </div>
  );
};

export default FriendsTab;

export async function loader() {
  const token = getAuthToken();
  if (!token) {
    console.error("No valid token available.");
    // You may want to handle this case more explicitly (e.g., redirect to login).
    throw new Error("No valid token available.");
  }

  try {
    const response = await fetch(
      "http://localhost:8080/secret-santa/user/friends",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      console.error("Request failed with status:", response.status);
      // Handle the error (e.g., throw an error or return an error object).
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Process and modify data as needed.
    for (let i = 0; i < data.length; i++) {
      data[i].key = i;
    }

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error (e.g., throw an error or return an error object).
    throw error;
  }
}
