import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import MsStyles from "@/styles/MsStyles.module.css";
import { removeTask } from "@/reducers/tasks";
import { DeleteDialogDependency } from "../DrawerTask/DrawerTask";

export default function DeleteDialog({
  task,
  setOpenTask,
  taskData,
  theme,
}: DeleteDialogDependency) {
  const dispatch = useDispatch();
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          className={MsStyles.button}
          appearance="subtle"
          icon={<DeleteRegular />}
          size="large"
          shape="square"
        />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {task && task.name ? `${task.name}` : ""} will be permanently
            deleted.
          </DialogTitle>
          <DialogContent>
            <p>You won&apos;t be able to undo this action.</p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                className={MsStyles.button}
                appearance="secondary"
                shape="square"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button
                className={MsStyles.button}
                style={{
                  backgroundColor: theme.colorPaletteRedBackground3,
                }}
                appearance="primary"
                shape="square"
                onClick={() => {
                  dispatch(removeTask({ id: taskData }));
                  setOpenTask(false);
                }}
              >
                Delete task
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
