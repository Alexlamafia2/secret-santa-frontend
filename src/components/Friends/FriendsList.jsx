import { Fragment } from "react";
import classes from "./FriendsList.module.css";
import ButtonUI from "../UI/ButtonUI";
import { getAuthToken } from "../../util/auth";

const FriendsList = ({ events }) => {
  async function sendFriendEquest() {
    const token = getAuthToken();
    console.log(token);
    const send = { recipient: "bd942494-843f-4154-8ddd-9d5e81324049" };
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

  // console.log(events);
  return (
    <Fragment>
      <h1>Friends</h1>
      <ul className={classes.friends}>
        {events.map((event) => (
          <li key={event.key} className={classes["friend-container"]}>
            <h4>
              {event.firstName} {event.lastName}
            </h4>
            <button className={classes["toggle-button"]}>
              <span className={classes["toggle-button__bar"]}></span>
              <span className={classes["toggle-button__bar"]}></span>
              <span className={classes["toggle-button__bar"]}></span>
            </button>
          </li>
        ))}
      </ul>
      <ButtonUI onClick={sendFriendEquest}>Add Friend</ButtonUI>
    </Fragment>
  );
};

export default FriendsList;
