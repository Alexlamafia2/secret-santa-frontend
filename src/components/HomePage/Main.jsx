import styles from "./Main.module.css";
import snowflake from "../../assets/snowflake.png";
import tree from "../../assets/tree.png";
import snowflakeData from "../../util/snowflakeData";
import treeData from "../../util/treeData";
import InstructionPage from "./InstructionPage";
import { Fragment } from "react";

export default function MainPage() {
  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles["main-intro"]}>
          <h1 className={styles["main-message__one"]}>
            Make gift giving with others memorable!
          </h1>
          <h3 className={styles["main-message__two"]}>
            Get randomly matched to a friend, coworker, or family member and get
            an email sent to you with your match.
          </h3>
        </div>
        <div className={styles["main-instructions"]}>
          <InstructionPage></InstructionPage>

          <button className={styles["main-button"]} type="button">
            Get Started
          </button>
        </div>
      </div>
      <div>
        {snowflakeData.map((items) => {
          return (
            <img
              key={items.id}
              className={styles[items.style]}
              src={snowflake}
              alt="snowflake"
            ></img>
          );
        })}
        {treeData.map((items) => {
          return (
            <img
              key={items.id}
              className={styles[items.style]}
              src={tree}
              alt="tree"
            ></img>
          );
        })}
      </div>
    </Fragment>
  );
}
