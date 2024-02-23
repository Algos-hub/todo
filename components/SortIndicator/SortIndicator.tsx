import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@fluentui/react-components";
import {
  ChevronDownRegular,
  ChevronUpRegular,
  DismissRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./SortIndicator.module.css";
interface IProps {
  sort: string | undefined;
  setSort: Dispatch<SetStateAction<string | undefined>>;
  reverseSort: boolean;
  setReverseSort: Dispatch<SetStateAction<boolean>>;
}

export default function SortIndicator({
  sort,
  setSort,
  reverseSort,
  setReverseSort,
}: IProps) {
  return sort ? (
    <div className={styles.sortIndicatorCondainer}>
      <Button
        className={`${MsStyles.button} ${styles.buttonMargin}`}
        appearance="subtle"
        size="small"
        shape="square"
        icon={reverseSort ? <ChevronUpRegular /> : <ChevronDownRegular />}
        onClick={() => {
          setReverseSort(!reverseSort);
        }}
      />
      Sorted{" "}
      {sort && sort === "Alphabetically"
        ? sort.toLowerCase()
        : `by ${sort?.toLowerCase()}`}
      <Button
        className={`${MsStyles.button} ${styles.buttonMargin}`}
        appearance="subtle"
        size="small"
        shape="square"
        icon={<DismissRegular />}
        onClick={() => {
          setSort("");
        }}
      />
    </div>
  ) : (
    ""
  );
}
