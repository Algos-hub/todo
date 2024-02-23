import { changeStepName, completeStep, removeStep } from "@/reducers/tasks";
import { Button, Checkbox, Input } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import React, { useState } from "react";
import styles from "./TaskStepItem.module.css";
import { useDispatch } from "react-redux";

export default function TaskStepItem(props: any) {
  const [stepName, setStepName] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <div className={styles.editStep}>
      <Checkbox
        shape="circular"
        checked={props.step.completed}
        onChange={(ev, data) =>
          dispatch(
            completeStep({
              parentId: props.taskData,
              id: props.step.id,
              completed: data.checked,
            }),
          )
        }
      />
      <Input
        disabled={props.step.completed}
        appearance="underline"
        value={stepName ? stepName : props.step.name}
        onFocus={() => {
          setStepName(props.step.name);
        }}
        className={styles.input}
        onChange={(e) => {
          setStepName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && stepName.length !== 0) {
            dispatch(
              changeStepName({
                parentId: props.taskData,
                id: props.step.id,
                name: stepName,
              }),
            );
          }
        }}
        onBlur={() => {
          if (stepName && stepName.length !== 0) {
            dispatch(
              changeStepName({
                parentId: props.taskData,
                id: props.step.id,
                name: stepName,
              }),
            );
          }
          setStepName("");
        }}
      />
      <Button
        appearance="subtle"
        icon={<DismissRegular />}
        onClick={() => {
          dispatch(
            removeStep({
              id: props.step.id,
              parentId: props.taskData,
            }),
          );
        }}
      />
    </div>
  );
}
