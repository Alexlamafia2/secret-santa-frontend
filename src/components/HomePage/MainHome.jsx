import styles from "./MainHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import Backdrop from "../UI/Backdrop";
import GroupForm from "./GroupForm";
import ButtonUI from "../UI/ButtonUI";

const GROUPS = [
  {
    name: "Group 1",
    id: 1,
  },
  {
    name: "Group 2",
    id: 2,
  },
  {
    name: "Group 3",
    id: 3,
  },
];

const FRIENDS = [
  {
    name: "Friend 1",
    id: 1,
  },
  {
    name: "Friend 2",
    id: 2,
  },
  {
    name: "Friend 3",
    id: 3,
  },
];

// console.log(GROUPS);

const MainHome = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const showForm = () => {
    setDisplayForm(true);
  };

  const hideForm = () => {
    setDisplayForm(false);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.groups}>
        <ul className={styles["groups-cluster"]}>
          {GROUPS.map((group) => (
            <li className={styles["group-id"]} key={group.id}>
              <p>{group.name}</p>
            </li>
          ))}
        </ul>
        <div>
          <ButtonUI onClick={showForm}>
            <FontAwesomeIcon className={styles["plus-icon"]} icon={faPlus} />
          </ButtonUI>
        </div>
      </div>
      <div className={styles.characteristics}>
        <h2>Group Name</h2>

        <ul className={styles["characteristics-friends"]}>
          {FRIENDS.map((friend) => (
            <li
              className={styles["characteristics-friends__item"]}
              key={friend.id}
            >
              <p>{friend.name}</p>
            </li>
          ))}
        </ul>
        <div className={styles["characteristics__buttons"]}>
          <ButtonUI>Add friend</ButtonUI>
          <ButtonUI>Shuffle</ButtonUI>
        </div>
      </div>
      {displayForm && <GroupForm onClose={hideForm}></GroupForm>}

      {/* <Modal></Modal> */}
    </div>
  );
};

export default MainHome;
