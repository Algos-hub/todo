import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Divider,
  Card,
  CardFooter,
  Input,
  Title3,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Caption1,
} from "@fluentui/react-components";
import {
  NavigationRegular,
  ArrowSortRegular,
  AddRegular,
  ArrowRepeatAllRegular,
  CircleRegular,
  ChevronDownRegular,
  ChevronRightRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MSStyles/ComponentsStyles";
import { weekdays, months } from "@/date/format";
import DatePicker from "./DatePicker.tsx";
import TaskCard from "./TaskCard.tsx";
import { addTask, removeTask } from "../reducers/tasks.ts";
import DrawerCategories from "./DrawerCategories.tsx";
import DrawerTask from "./DrawerTask.tsx";

interface Tasks {
  id: number;
  name: string;
  category: string;
  createAt: Date;
  dueDate: Date | null;
  important: boolean;
  completed: boolean;
}

export default function Home() {
  const themeCheck = useSelector((state: any) => state.darkTheme.value);
  const dispatch = useDispatch();
  const tasksArrayUnfinished = useSelector((state: any) =>
    state.tasks.value.filter((el: any) => !el.completed),
  );
  const tasksArrayFinished = useSelector((state: any) =>
    state.tasks.value.filter((el: any) => el.completed),
  );
  const theme = themeCheck ? webDarkTheme : webLightTheme;
  const [focus, setFocus] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState<string>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<string>();
  const [important, setImportant] = useState<boolean>();
  const [openCompleted, setOpenCompleted] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openTask, setOpenTask] = useState<boolean>(false);

  const MsStylesClass = MsStyles();
  return (
    <FluentProvider
      theme={theme}
      style={{ height: "calc(100% - 40px)", display: "flex" }}
    >
      <DrawerCategories
        openCategories={openCategories}
        setOpenCategories={setOpenCategories}
      />
      <div
        style={{
          height: "100%",
          backgroundColor: theme.colorNeutralBackground3,
          display: "flex",
          flexDirection: "column",
          width: "calc(100vw - 48px)",
          paddingInline: 24,
          overflow: "hidden",
        }}
      >
        <div style={{ margin: "16px 0px 16px 0px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  className={MsStylesClass.button}
                  appearance="subtle"
                  icon={<NavigationRegular />}
                  size="large"
                  shape="square"
                  onClick={() => setOpenCategories(!openCategories)}
                />
                <Title3>My Day</Title3>
              </div>
              <Caption1 style={{ marginLeft: 40 }}>
                {weekdays[date.getDay()]}, {months[date.getMonth()]}{" "}
                {date.getDate()}
              </Caption1>
            </div>
            <div>
              <Button
                className={MsStylesClass.button}
                appearance="subtle"
                icon={<ArrowSortRegular />}
                size="medium"
                shape="square"
              >
                Sort
              </Button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, height: "calc(100% - 104px)" }}>
          <Card style={{ marginBottom: 10 }}>
            <Input
              onFocus={() => setFocus(true)}
              contentBefore={
                focus ? (
                  <CircleRegular style={{ marginRight: 10 }} />
                ) : (
                  <AddRegular style={{ marginRight: 10 }} />
                )
              }
              appearance="underline"
              placeholder="Add a task"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && name && name.length !== 0) {
                  dispatch(
                    addTask({
                      id: Math.random() * 10,
                      name: name,
                      category: "Tasks",
                      createdAt: date,
                      dueDate: dueDate,
                      important: false,
                      completed: false,
                    }),
                  );
                }
              }}
            />
            <CardFooter
              style={{
                display: focus ? "flex" : "none",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  paddingLeft: 7,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <DatePicker setDueDate={setDueDate} />
                <Button
                  className={MsStylesClass.button}
                  appearance="subtle"
                  icon={<ArrowRepeatAllRegular />}
                  size="small"
                  shape="square"
                  style={{ marginLeft: 10 }}
                />
              </div>
              <Button
                className={MsStylesClass.button}
                appearance="outline"
                size="small"
                shape="square"
                disabled={name ? false : true}
                onClick={() => {
                  dispatch(
                    addTask({
                      id: Math.random() * 10,
                      name: name,
                      category: "Tasks",
                      createdAt: date,
                      dueDate: dueDate,
                      important: false,
                      completed: false,
                    }),
                  );
                }}
              >
                Add
              </Button>
            </CardFooter>
          </Card>
          <div
            style={{
              height: "calc(100% - 66px)",
              overflowY: "scroll",
            }}
          >
            {tasksArrayUnfinished.map((el: Tasks, i: number) => {
              return (
                <TaskCard
                  setFocus={setFocus}
                  setOpenTask={setOpenTask}
                  {...el}
                  key={i}
                />
              );
            })}
            {tasksArrayFinished.length !== 0 ? (
              <div style={{ marginBottom: 15 }}>
                <Button
                  appearance="transparent"
                  size="large"
                  shape="square"
                  icon={
                    openCompleted ? (
                      <ChevronDownRegular />
                    ) : (
                      <ChevronRightRegular />
                    )
                  }
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    setOpenCompleted(!openCompleted);
                  }}
                >
                  Completed
                </Button>
                {openCompleted ? "" : <Divider />}
                <div
                  style={{
                    display: openCompleted ? "" : "none",
                    marginTop: 10,
                  }}
                >
                  {tasksArrayFinished.map((el: Tasks, i: number) => {
                    return <TaskCard setFocus={setFocus} {...el} key={i} />;
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <DrawerTask openTask={openTask} setOpenTask={setOpenTask} />
    </FluentProvider>
  );
}
