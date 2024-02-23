import React from "react";
import {
  Button,
  Caption1,
  Caption1Strong,
  Card,
  Checkbox,
} from "@fluentui/react-components";
import {
  CalendarRegular,
  StarFilled,
  StarRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MsStyles.module.css";
import { months, weekdays } from "@/date/format";
import { Tasks, changeImportance, changeStatus } from "@/reducers/tasks";
import { selectTask } from "@/reducers/taskSelected";
import { useDispatch } from "react-redux";
import styles from "./TaskCard.module.css";

export default function TaskCard(props: any) {
  const dispatch = useDispatch();
  const dueDate = props.dueDate ? new Date(JSON.parse(props.dueDate)) : "";
  const dueDateStr = dueDate
    ? `Due ${weekdays[dueDate.getDay()].slice(0, 3)} ${months[dueDate.getMonth()]} ${dueDate.getDate()}`
    : "";
  return (
    <Card
      onClick={() => {
        props.setFocus(false);
        props.setOpenTask(true);
        dispatch(selectTask(props.id));
      }}
      className={styles.card}
    >
      <div className={styles.cardContent}>
        <Checkbox
          checked={props.completed ? true : false}
          shape="circular"
          onChange={(ev, data) =>
            dispatch(changeStatus({ id: props.id, completed: data.checked }))
          }
          className={styles.Checkbox}
        />
        <div className={styles.title}>
          <Caption1Strong strikethrough={props.completed ? true : false}>
            {props.name}
          </Caption1Strong>
          <div className={styles.taskInfo}>
            <Caption1>{props.category}</Caption1>
            {props.steps.length !== 0 ? (
              <Caption1 className={styles.dueDate}>
                &nbsp;&#x2022;&nbsp;
                {props.steps.filter((el: Tasks) => el.completed).length}
                &nbsp;of&nbsp;
                {props.steps.length}
              </Caption1>
            ) : (
              ""
            )}
            {props.dueDate ? (
              <Caption1 className={styles.dueDate}>
                &nbsp;&#x2022;&nbsp;
                <CalendarRegular />
                &nbsp;{dueDateStr}
              </Caption1>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Button
        className={MsStyles.button}
        appearance="subtle"
        icon={props.important ? <StarFilled /> : <StarRegular />}
        size="small"
        shape="square"
        onClick={() => {
          dispatch(
            changeImportance({ id: props.id, important: !props.important }),
          );
        }}
      />
    </Card>
  );
}
