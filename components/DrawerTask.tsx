import React, { useEffect, useState } from "react";
import {
  DrawerBody,
  Button,
  InlineDrawer,
  Divider,
  DrawerFooter,
  Card,
  CardFooter,
  Input,
  Checkbox,
} from "@fluentui/react-components";
import {
  CalendarRegular,
  StarRegular,
  WeatherSunnyRegular,
  ArrowRepeatAllRegular,
  PanelRightContractRegular,
  AddRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MSStyles/ComponentsStyles.ts";
import { useSelector, useDispatch } from "react-redux";
import {
  changeName,
  changeStatus,
  changeImportance,
  changeCategory,
} from "@/reducers/tasks";

export default function DrawerCategories(props: any) {
  const [date, setDate] = useState(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<string>();
  const [important, setImportant] = useState<boolean>();
  const MsStylesClass = MsStyles();
  const dispatch = useDispatch();
  const taskData = useSelector((state: any) => state.taskSelected.value);
  const task = useSelector((state: any) =>
    state.tasks.value.filter((el: any) => el.id === taskData),
  );
  const [name, setName] = useState<string>("");
  const dependancy: string = task[0] ? task[0].name : task[0];
  useEffect(() => {
    if (task[0]) {
      setName(task[0].name);
    }
  }, [dependancy]);
  console.log(task[0]);
  console.log(name);
  return (
    <InlineDrawer
      position="end"
      separator
      open={props.openTask}
      style={{ height: "calc(100vh - 40px)", width: 600 }}
    >
      <DrawerBody
        style={{
          paddingInline: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Card style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Checkbox shape="circular" />
              <Input
                appearance="underline"
                value={name}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={() => {
                  if (name && name.length !== 0) {
                    dispatch(changeName({ id: taskData, name: name }));
                  } else setName(task[0].name);
                }}
              />
              <Button appearance="subtle" icon={<StarRegular />} />
            </div>
            <Divider style={{ width: "calc(100% + 40px)", marginLeft: -20 }} />
            <CardFooter
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Checkbox shape="circular" />
              <Input
                appearance="underline"
                placeholder="Add a step"
                style={{ width: "calc(100% - 64px)", marginLeft: -13 }}
              />
            </CardFooter>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Button
              appearance="transparent"
              icon={<WeatherSunnyRegular />}
              className={MsStylesClass.buttonS}
              onClick={() => {
                dispatch(changeCategory({ id: taskData, category: "My day" }));
              }}
            >
              {task[0] && task[0].category === "My day"
                ? "Remove from"
                : "Add to"}{" "}
              my day
            </Button>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Button
              appearance="transparent"
              icon={<CalendarRegular />}
              className={MsStylesClass.buttonS}
            >
              Add due date
            </Button>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Button
              appearance="transparent"
              icon={<ArrowRepeatAllRegular />}
              className={MsStylesClass.buttonS}
            >
              Repeat
            </Button>
          </Card>
        </div>
      </DrawerBody>
      <DrawerFooter style={{ display: "flex", flexDirection: "column" }}>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            className={MsStylesClass.button}
            appearance="subtle"
            icon={<PanelRightContractRegular />}
            size="large"
            shape="square"
            onClick={() => props.setOpenTask(false)}
          />
          Created Today
          <Button
            className={MsStylesClass.button}
            appearance="subtle"
            icon={<DeleteRegular />}
            size="large"
            shape="square"
          />
        </div>
      </DrawerFooter>
    </InlineDrawer>
  );
}
