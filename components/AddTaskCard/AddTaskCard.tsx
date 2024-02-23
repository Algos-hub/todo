import { Button, Card, CardFooter, Input } from "@fluentui/react-components";
import { AddRegular, CircleRegular } from "@fluentui/react-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { addTaskOnBottom, addTaskOnTop } from "@/reducers/tasks";
import styles from "./AddTaskCard.module.css";
import MsStyles from "@/styles/MsStyles.module.css";

interface IProps {
  category: string | undefined;
  important: boolean;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
}

export default function AddTaskCard({
  category,
  important,
  setFocus,
  focus,
}: IProps) {
  const dispatch = useDispatch();
  const newOnTop = useSelector((state: any) => state.settings.newOnTop);
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  function addOnTop() {
    dispatch(
      addTaskOnTop({
        id: Math.random() * 10,
        name: name,
        category: category,
        createdAt: Date.now(),
        dueDate: JSON.stringify(dueDate),
        important: important,
        completed: false,
        steps: [],
      }),
    );
  }
  function addOnBottom() {
    dispatch(
      addTaskOnBottom({
        id: Math.random() * 10,
        name: name,
        category: category,
        createdAt: Date.now(),
        dueDate: JSON.stringify(dueDate),
        important: important,
        completed: false,
        steps: [],
      }),
    );
  }
  return (
    <Card className={styles.cardStyle}>
      <Input
        onFocus={() => setFocus(true)}
        contentBefore={
          focus ? (
            <CircleRegular className={styles.inputIcon} />
          ) : (
            <AddRegular className={styles.inputIcon} />
          )
        }
        appearance="underline"
        placeholder="Add a task"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name && name.length !== 0) {
            if (newOnTop) {
              addOnTop();
            } else {
              addOnBottom();
            }
          }
        }}
      />
      <CardFooter
        className={styles.cardFooter}
        style={{
          display: focus ? "flex" : "none",
        }}
      >
        <div className={styles.cardFooterContent}>
          <DatePicker setDueDate={setDueDate} />
        </div>
        <Button
          className={MsStyles.button}
          appearance="outline"
          size="small"
          shape="square"
          disabled={name ? false : true}
          onClick={() => {
            if (newOnTop) {
              addOnTop();
            } else {
              addOnBottom();
            }
          }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
