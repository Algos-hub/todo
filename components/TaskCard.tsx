import React from "react";
import {
  Card,
  Checkbox,
  Button,
  Caption1,
  Caption1Strong,
} from "@fluentui/react-components";
import {
  StarFilled,
  StarRegular,
  CalendarRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MSStyles/ComponentsStyles";
import { weekdays, months } from "@/date/format";
import { changeImportance, changeStatus } from "@/reducers/tasks";
import { useSelector, useDispatch } from "react-redux";

export default function TaskCard(props: any) {
  const MsStylesClass = MsStyles();
  const dispatch = useDispatch();
  return (
    <Card
      onClick={() => props.setFocus(false)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={props.completed ? true : false}
          shape="circular"
          onChange={(ev, data) =>
            dispatch(changeStatus({ id: props.id, completed: data.checked }))
          }
          style={{ paddingLeft: 3, paddingRight: 8 }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Caption1Strong strikethrough={props.completed ? true : false}>
            {props.name}
          </Caption1Strong>
          <div style={{ display: "flex" }}>
            <Caption1>{props.category}</Caption1>
            {props.dueDate ? (
              <Caption1
                style={{
                  verticalAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &nbsp;&#x2022;&nbsp;
                <CalendarRegular />
                &nbsp;Due {weekdays[props.dueDate.getDay()].slice(0, 3)},&nbsp;
                {
                  months[props.dueDate.getMonth()]
                } {props.dueDate.getDate()}{" "}
              </Caption1>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Button
        className={MsStylesClass.button}
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
