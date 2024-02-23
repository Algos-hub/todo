import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningImperativeRef,
  PositioningProps,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { CalendarRegular, DeleteRegular } from "@fluentui/react-icons";
import { Calendar } from "@fluentui/react-calendar-compat";
import { months, weekdays } from "@/date/format";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./DatePicker.module.css";

export default function DatePicker(props: any) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [tmpDate, setTmpDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const themeCheck = useSelector((state: any) => state.settings.darkTheme);
  const theme = themeCheck ? webDarkTheme : webLightTheme;

  const onSelectDate = React.useCallback((newDate: Date, _: any): void => {
    setTmpDate(newDate);
  }, []);
  const onSave = () => {
    setSelectedDate(tmpDate);
    props.setDueDate(tmpDate);
    setOpen(false);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positioningRef = useRef<PositioningImperativeRef>(null);
  useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);
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
          ref={buttonRef}
          className={MsStyles.button}
          appearance={selectedDate ? "outline" : "subtle"}
          size="small"
          shape="square"
          icon={<CalendarRegular />}
        >
          {selectedDate
            ? `Due ${weekdays[selectedDate.getDay()].slice(0, 3)},
              ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}`
            : ""}
        </Button>
      </PopoverTrigger>
      <PopoverSurface className={styles.PopoverSurface}>
        <Calendar
          showMonthPickerAsOverlay
          highlightSelectedMonth
          showGoToToday={false}
          onSelectDate={onSelectDate}
          value={tmpDate}
        />
        <Button
          className={MsStyles.button}
          appearance="primary"
          size="small"
          shape="square"
          style={{ width: "100%", height: 35, marginBottom: 5 }}
          onClick={() => onSave()}
        >
          Save
        </Button>
        <Button
          className={MsStyles.button}
          appearance="subtle"
          size="small"
          shape="square"
          icon={
            <DeleteRegular
              style={{ color: theme.colorPaletteRedForeground1 }}
            />
          }
          style={{
            width: "100%",
            color: theme.colorPaletteRedForeground1,
            height: 35,
          }}
          onClick={() => {
            setSelectedDate(undefined);
            props.setDueDate(undefined);
          }}
        >
          Remove due date
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
