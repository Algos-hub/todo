import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  Checkbox,
  Divider,
  DrawerBody,
  DrawerFooter,
  InlineDrawer,
  Input,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import {
  AddRegular,
  DeleteRegular,
  PanelRightContractRegular,
  StarFilled,
  StarRegular,
  WeatherSunnyRegular,
} from "@fluentui/react-icons";
import { months, weekdays } from "@/date/format";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Steps,
  Tasks,
  addStep,
  changeCategory,
  changeImportance,
  changeName,
  changeStatus,
  removeTask,
} from "@/reducers/tasks";
import DatePickerDrawer from "../DatePickerDrawer/DatePickerDrawer";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./DrawerTask.module.css";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { Settings } from "@/reducers/settings";
import TaskStepItem from "../TaskStepItem/TaskStepItem";

export interface DeleteDialogDependency {
  task: Tasks;
  setOpenTask: Dispatch<SetStateAction<boolean>>;
  taskData: number;
  theme: Theme;
}

export default function DrawerCategories(props: any) {
  const [date, setDate] = useState<Date>(new Date());
  const [stepName, setStepName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const dispatch = useDispatch();
  const settings: Settings = useSelector((state: any) => state.settings);
  const theme: Theme = settings.darkTheme ? webDarkTheme : webLightTheme;
  const taskData: number = useSelector(
    (state: any) => state.taskSelected.value,
  );
  const task: Tasks = useSelector(
    (state: any) => state.tasks.value.filter((el: Tasks) => el.id === taskData),
    shallowEqual,
  )[0];
  const [name, setName] = useState<string>("");
  const dependency: string = task ? task.name : task;
  useEffect(() => {
    if (task) {
      setName(task.name);
      setDate(new Date(task.createdAt));
    }
  }, [dependency, task]);
  const deleteDialogDependencies = {
    task: task,
    setOpenTask: props.setOpenTask,
    taskData: taskData,
    theme: theme,
  };
  return (
    <InlineDrawer
      position="end"
      separator
      open={props.openTask}
      className={styles.drawer}
    >
      <DrawerBody className={styles.drawerBody}>
        <div>
          <Card className={styles.card}>
            <div>
              <div className={styles.editTask}>
                <Checkbox
                  shape="circular"
                  checked={task && task.completed}
                  onChange={(ev, data) =>
                    dispatch(
                      changeStatus({ id: taskData, completed: data.checked }),
                    )
                  }
                />
                <Input
                  disabled={task && task.completed}
                  appearance="underline"
                  value={name}
                  className={styles.input}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={() => {
                    if (name && name.length !== 0) {
                      dispatch(changeName({ id: taskData, name: name }));
                    } else setName(task.name);
                  }}
                />
                <Button
                  appearance="subtle"
                  icon={
                    task && task.important ? <StarFilled /> : <StarRegular />
                  }
                  disabled={task && task.completed}
                  onClick={() => {
                    dispatch(
                      changeImportance({
                        id: taskData,
                        important: !task.important,
                      }),
                    );
                  }}
                />
              </div>
              {task && task.steps
                ? task.steps.map((el: Steps, i: number) => {
                    return (
                      <TaskStepItem key={i} taskData={taskData} step={el} />
                    );
                  })
                : ""}
            </div>
            <Divider className={styles.divider} />
            <CardFooter className={styles.cardFooter}>
              <Button icon={<AddRegular />} appearance="subtle" />
              <Input
                appearance="underline"
                placeholder="Add a step"
                className={styles.inputStep}
                onChange={(e) => {
                  setStepName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && stepName.length !== 0) {
                    dispatch(
                      addStep({
                        parentId: taskData,
                        name: stepName,
                        id: Math.random() * 10,
                        createdAt: JSON.stringify(Date()),
                        completed: false,
                      }),
                    );
                  }
                }}
              />
              {stepName.length !== 0 ? (
                <Button
                  appearance="subtle"
                  size="small"
                  onClick={() => {
                    dispatch(
                      addStep({
                        parentId: taskData,
                        name: stepName,
                        id: Math.random() * 10,
                        createdAt: JSON.stringify(Date()),
                        completed: false,
                      }),
                    );
                  }}
                >
                  Add
                </Button>
              ) : (
                ""
              )}
            </CardFooter>
          </Card>
          <Card className={styles.card}>
            <Button
              appearance="transparent"
              icon={<WeatherSunnyRegular />}
              className={MsStyles.buttonS}
              onClick={() => {
                if (task && task.category !== "My day") {
                  dispatch(
                    changeCategory({ id: taskData, category: "My day" }),
                  );
                } else {
                  dispatch(changeCategory({ id: taskData, category: "" }));
                }
              }}
            >
              {task && task.category === "My day" ? "Remove from" : "Add to"} my
              day
            </Button>
          </Card>
          <Card className={styles.card}>
            <DatePickerDrawer task={task} setDueDate={setDueDate} />
          </Card>
        </div>
      </DrawerBody>
      <DrawerFooter className={styles.drawerFooter}>
        <Divider />
        <div className={styles.drawerFooterContent}>
          <Button
            className={MsStyles.button}
            appearance="subtle"
            icon={<PanelRightContractRegular />}
            size="large"
            shape="square"
            onClick={() => props.setOpenTask(false)}
          />
          Created{" "}
          {task &&
          task.createdAt &&
          date.toDateString() === new Date().toDateString()
            ? "Today"
            : task && task.createdAt
              ? `${weekdays[date.getDay()].slice(0, 3)} ${months[date.getMonth()]} ${date.getDate()}`
              : ""}
          {settings.confirmDeleting ? (
            <DeleteDialog {...deleteDialogDependencies} />
          ) : (
            <Button
              className={MsStyles.button}
              appearance="subtle"
              icon={<DeleteRegular />}
              size="large"
              shape="square"
              onClick={() => {
                dispatch(removeTask({ id: taskData }));
                props.setOpenTask(false);
              }}
            />
          )}
        </div>
      </DrawerFooter>
    </InlineDrawer>
  );
}
