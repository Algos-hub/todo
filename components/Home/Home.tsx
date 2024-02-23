import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Caption1,
  Divider,
  FluentProvider,
  SelectTabData,
  SelectTabEvent,
  TabValue,
  Theme,
  Title3,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import {
  CalendarRegular,
  CheckmarkRegular,
  ChevronDownRegular,
  ChevronRightRegular,
  HomeRegular,
  NavigationRegular,
  StarRegular,
  WeatherSunnyRegular,
} from "@fluentui/react-icons";
import { months, weekdays } from "@/date/format";
import DrawerCategories from "../DrawerCategories/DrawerCategories.tsx";
import DrawerTask from "../DrawerTask/DrawerTask.tsx";
import TaskCard from "../TaskCard/TaskCard.tsx";
import Sort from "../Sort/Sort.tsx";
import SortIndicator from "../SortIndicator/SortIndicator.tsx";
import AddTaskCard from "../AddTaskCard/AddTaskCard.tsx";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./Home.module.css";
import { Tasks } from "@/reducers/tasks.ts";
import { Settings } from "@/reducers/settings.ts";

export default function Home() {
  const settings: Settings = useSelector((state: any) => state.settings);
  const tasks: Tasks[] = useSelector((state: any) => state.tasks.value);
  const theme: Theme = settings.darkTheme ? webDarkTheme : webLightTheme;
  const date: Date = new Date();
  const dateStr: string = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  const [sort, setSort] = useState<string | undefined>();
  const [reverseSort, setReverseSort] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [category, setCategory] = useState<string | undefined>("My day");
  const [important, setImportant] = useState<boolean>(false);
  const [openCompleted, setOpenCompleted] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openTask, setOpenTask] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState<TabValue>("My day");
  const [icon, setIcon] = useState(<NavigationRegular />);
  const [tasksFinished, setTasksFinished] = useState<Tasks[]>([]);
  const [tasksUnfinished, setTasksUnfinished] = useState<Tasks[]>([]);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData): void => {
    setSelectedValue(data.value);
  };

  useEffect(() => {
    if (!openCategories) {
      setIcon(<NavigationRegular />);
    } else {
      switch (String(selectedValue)) {
        case "My day":
          setIcon(<WeatherSunnyRegular />);
          setCategory(String(selectedValue));
          setImportant(false);
          break;
        case "Important":
          setIcon(<StarRegular />);
          setCategory("");
          setImportant(true);
          break;
        case "Planned":
          setIcon(<CalendarRegular />);
          setCategory("");
          setImportant(false);
          break;
        case "Completed":
          setIcon(<CheckmarkRegular />);
          setCategory("");
          setImportant(false);
          break;
        case "Tasks":
          setIcon(<HomeRegular />);
          setCategory("");
          setImportant(false);
          break;
        default:
          setIcon(<NavigationRegular />);
          setCategory("");
          setImportant(false);
          break;
      }
    }
  }, [openCategories, selectedValue]);

  function taskSort(taskA: Tasks, taskB: Tasks): number {
    switch (sort) {
      case "Alphabetically":
        if (reverseSort) return taskB.name.localeCompare(taskA.name);
        else return taskA.name.localeCompare(taskB.name);
      case "Creation date":
        if (reverseSort) return taskA.createdAt - taskB.createdAt;
        else return taskB.createdAt - taskA.createdAt;
      default:
        return 0;
    }
  }

  useEffect(() => {
    function taskFilter(task: Tasks): boolean | null | Date {
      const categoryCheck: boolean = task.category === category;
      const importantCheck: boolean = task.important;
      const dueDateCheck: Date | null = task.dueDate;
      return (
        (category === "My day"
          ? categoryCheck
          : categoryCheck || !categoryCheck) &&
        (selectedValue === "Important"
          ? importantCheck
          : importantCheck || !importantCheck) &&
        (selectedValue === "Planned"
          ? dueDateCheck
          : dueDateCheck || !dueDateCheck)
      );
    }
    if (settings.importantOnTop) {
      setTasksUnfinished(
        tasks
          .filter((el: Tasks) => taskFilter(el) && !el.completed)
          .sort(
            (a: Tasks, b: Tasks) => Number(b.important) - Number(a.important),
          ),
      );
      setTasksFinished(
        tasks
          .filter((el: Tasks) => taskFilter(el) && el.completed)
          .sort(
            (a: Tasks, b: Tasks) => Number(b.important) - Number(a.important),
          ),
      );
    } else {
      setTasksUnfinished(
        tasks.filter((el: Tasks) => taskFilter(el) && !el.completed),
      );
      setTasksFinished(
        tasks.filter((el: Tasks) => taskFilter(el) && el.completed),
      );
    }
  }, [selectedValue, category, tasks, settings.importantOnTop]);

  return (
    <FluentProvider theme={theme} className={styles.fluentProvider}>
      <DrawerCategories
        openCategories={openCategories}
        setOpenCategories={setOpenCategories}
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
      />
      <div
        className={styles.content}
        style={{
          backgroundColor: theme.colorNeutralBackground3,
        }}
      >
        <div className={styles.sectionTitle}>
          <div className={styles.sectionTitleContent}>
            <div className={styles.sectionTitleContentLeft}>
              <div className={styles.leftTitle}>
                <Button
                  className={MsStyles.button}
                  appearance="subtle"
                  icon={icon}
                  size="large"
                  shape="square"
                  onClick={() => setOpenCategories(!openCategories)}
                />
                <Title3>{String(selectedValue)}</Title3>
              </div>
              <Caption1 className={styles.date}>{dateStr}</Caption1>
            </div>
            <Sort setSort={setSort} />
          </div>
        </div>
        <div className={styles.tasks}>
          <SortIndicator
            sort={sort}
            reverseSort={reverseSort}
            setReverseSort={setReverseSort}
            setSort={setSort}
          />
          {selectedValue !== "Completed" ? (
            <AddTaskCard
              focus={focus}
              setFocus={setFocus}
              important={important}
              category={category}
            />
          ) : (
            ""
          )}
          <div
            className={styles.taskCardsUnfinished}
            style={{
              height: `calc(100% - ${sort ? 126 : 102}px)`,
            }}
          >
            {selectedValue !== "Completed"
              ? sort
                ? tasksUnfinished
                    .sort((a: Tasks, b: Tasks) => {
                      return taskSort(a, b);
                    })
                    .map((el: Tasks, i: number) => {
                      return (
                        <TaskCard
                          setFocus={setFocus}
                          setOpenTask={setOpenTask}
                          {...el}
                          key={i}
                        />
                      );
                    })
                : tasksUnfinished.map((el: Tasks, i: number) => {
                    return (
                      <TaskCard
                        setFocus={setFocus}
                        setOpenTask={setOpenTask}
                        {...el}
                        key={i}
                      />
                    );
                  })
              : ""}
            {tasksFinished.length !== 0 ? (
              <div className={styles.completedTab}>
                {selectedValue !== "Completed" ? (
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
                    className={styles.completedButton}
                    onClick={() => {
                      setOpenCompleted(!openCompleted);
                    }}
                  >
                    Completed
                  </Button>
                ) : (
                  ""
                )}
                {selectedValue !== "Completed" ? (
                  openCompleted ? (
                    ""
                  ) : (
                    <Divider />
                  )
                ) : (
                  ""
                )}
                <div
                  className={styles.taskCardsFinished}
                  style={{
                    display:
                      selectedValue === "Completed"
                        ? ""
                        : openCompleted
                          ? ""
                          : "none",
                  }}
                >
                  {sort
                    ? tasksFinished
                        .sort((a: Tasks, b: Tasks) => {
                          return taskSort(a, b);
                        })
                        .map((el: Tasks, i: number) => {
                          return (
                            <TaskCard
                              setFocus={setFocus}
                              setOpenTask={setOpenTask}
                              {...el}
                              key={i}
                            />
                          );
                        })
                    : tasksFinished.map((el: Tasks, i: number) => {
                        return (
                          <TaskCard
                            setFocus={setFocus}
                            setOpenTask={setOpenTask}
                            {...el}
                            key={i}
                          />
                        );
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
