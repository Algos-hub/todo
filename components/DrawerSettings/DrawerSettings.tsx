import React, { useState } from "react";
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Switch,
} from "@fluentui/react-components";
import { Dismiss24Regular, SettingsRegular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeConfirmDeleting,
  changeImportantOnTop,
  changeNewOnTop,
  changeTheme,
} from "@/reducers/settings.ts";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./DrawerSettings.module.css";

export default function Drawer() {
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => state.settings);
  const toggleTheme = () => {
    dispatch(changeTheme(!settings.darkTheme));
  };
  const toggleConfirmDelete = () => {
    dispatch(changeConfirmDeleting(!settings.confirmDeleting));
  };
  const toggleNewOnTop = () => {
    dispatch(changeNewOnTop(!settings.newOnTop));
  };
  const toggleImportantOnTop = () => {
    dispatch(changeImportantOnTop(!settings.importantOnTop));
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <OverlayDrawer
        position="end"
        modalType="non-modal"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        className={styles.drawer}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                className={MsStyles.button}
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Settings
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <h3>General</h3>
          <Switch
            checked={settings.confirmDeleting}
            label="Confirm before deleting"
            labelPosition="above"
            onChange={toggleConfirmDelete}
          />
          <Switch
            checked={settings.newOnTop}
            label="Add new tasks on top"
            labelPosition="above"
            onChange={toggleNewOnTop}
          />
          <Switch
            checked={settings.importantOnTop}
            label="Move starred tasks to top"
            labelPosition="above"
            onChange={toggleImportantOnTop}
          />
          <Switch
            checked={settings.darkTheme}
            label="Turn on night mode"
            labelPosition="above"
            onChange={toggleTheme}
          />
        </DrawerBody>
      </OverlayDrawer>
      <Button
        className={MsStyles.button}
        appearance="subtle"
        icon={<SettingsRegular className={styles.icon} />}
        size="large"
        shape="square"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
