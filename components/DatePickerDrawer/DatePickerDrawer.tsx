import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDueDate } from "@/reducers/tasks";
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { CalendarRegular, DeleteRegular } from "@fluentui/react-icons";
import { Calendar } from "@fluentui/react-calendar-compat";
import { months, weekdays } from "@/date/format";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./DatePickerDrawer.module.css";

export default function DatePickerDrawer(props: any) {
  const task = props.task;
  const date = task && task.dueDate ? new Date(JSON.parse(task.dueDate)) : "";
  const dueDateStr = date
    ? `Due ${weekdays[date.getDay()].slice(0, 3)},
  ${months[date.getMonth()]} ${date.getDate()}`
    : "Add due date";
  const [tmpDate, setTmpDate] = React.useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const themeCheck = useSelector((state: any) => state.settings.darkTheme);
  const theme = themeCheck ? webDarkTheme : webLightTheme;
  const taskData = useSelector((state: any) => state.taskSelected.value);
  const onSelectDate = useCallback((newDate: Date, _: any): void => {
    setTmpDate(newDate);
  }, []);
  const onSave = () => {
    dispatch(changeDueDate({ id: taskData, dueDate: JSON.stringify(tmpDate) }));
    setOpen(false);
  };
  const colorRed = { color: theme.colorPaletteRedForeground1 };

  return (
    <Popover
      withArrow
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
      inline
    >
      <PopoverTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          icon={<CalendarRegular />}
          className={MsStyles.buttonS}
        >
          {dueDateStr}
        </Button>
      </PopoverTrigger>
      <PopoverSurface>
        <Calendar
          showMonthPickerAsOverlay
          highlightSelectedMonth
          showGoToToday={false}
          onSelectDate={onSelectDate}
          value={tmpDate}
        />
        <Button
          className={`${MsStyles.button} ${styles.saveButton}`}
          appearance="primary"
          size="small"
          shape="square"
          onClick={() => onSave()}
        >
          Save
        </Button>
        <Button
          className={`${MsStyles.button} ${styles.deleteButton}`}
          appearance="subtle"
          size="small"
          shape="square"
          icon={<DeleteRegular style={colorRed} />}
          style={colorRed}
          onClick={() => {
            dispatch(changeDueDate({ id: taskData, dueDate: undefined }));
          }}
        >
          Remove due date
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
