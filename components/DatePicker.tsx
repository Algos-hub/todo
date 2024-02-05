import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { CalendarRegular, DeleteRegular } from "@fluentui/react-icons";
import { Calendar } from "@fluentui/react-calendar-compat";
import MsStyles from "@/styles/MSStyles/ComponentsStyles";
import { weekdays, months } from "@/date/format";

export default function DatePicker(props: any) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [tmpDate, setTmpDate] = React.useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const themeCheck = useSelector((state: any) => state.darkTheme.value);
  const theme = themeCheck ? webDarkTheme : webLightTheme;

  const MsStylesClass = MsStyles();
  const onSelectDate = React.useCallback((newDate: Date, _: any): void => {
    setTmpDate(newDate);
  }, []);
  const onSave = () => {
    setSelectedDate(tmpDate);
    props.setDueDate(tmpDate);
    setOpen(false);
  };

  return (
    <Popover
      withArrow
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <PopoverTrigger disableButtonEnhancement>
        <Button
          className={MsStylesClass.button}
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
      <PopoverSurface>
        <Calendar
          showMonthPickerAsOverlay
          highlightSelectedMonth
          showGoToToday={false}
          onSelectDate={onSelectDate}
          value={tmpDate}
        />
        <Button
          className={MsStylesClass.button}
          appearance="primary"
          size="small"
          shape="square"
          style={{ width: "100%", height: 35, marginBottom: 5 }}
          onClick={() => onSave()}
        >
          Save
        </Button>
        <Button
          className={MsStylesClass.button}
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
