import {
  Button,
  Divider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningImperativeRef,
} from "@fluentui/react-components";
import { ArrowSortRegular, CalendarAddRegular } from "@fluentui/react-icons";
import React, { useEffect, useRef } from "react";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./Sort.module.css";

export default function Sort(props: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positioningRef = useRef<PositioningImperativeRef>(null);
  useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);
  return (
    <Popover positioning={{ positioningRef }} inline size="large">
      <PopoverTrigger disableButtonEnhancement>
        <Button
          ref={buttonRef}
          className={MsStyles.button}
          appearance="subtle"
          icon={<ArrowSortRegular />}
          size="medium"
          shape="square"
        >
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverSurface className={styles.PopoverSurface}>
        <div className={styles.popoverTitle}>Sort by</div>
        <Divider />
        <PopoverTrigger>
          <div className={styles.popoverButtons}>
            <Button
              className={MsStyles.button}
              appearance="subtle"
              icon={<ArrowSortRegular />}
              size="medium"
              shape="square"
              onClick={() => {
                props.setSort("Alphabetically");
              }}
            >
              Alphabetically
            </Button>
            <Button
              className={MsStyles.button}
              appearance="subtle"
              icon={<CalendarAddRegular />}
              size="medium"
              shape="square"
              onClick={() => {
                props.setSort("Creation date");
              }}
            >
              Creation date
            </Button>
          </div>
        </PopoverTrigger>
      </PopoverSurface>
    </Popover>
  );
}
