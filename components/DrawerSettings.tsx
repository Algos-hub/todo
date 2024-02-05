import React, { useState } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Switch,
  Menu,
  MenuTrigger,
  MenuPopover,
} from "@fluentui/react-components";
import { Dismiss24Regular, SettingsRegular } from "@fluentui/react-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../reducers/dark.ts";
import MsStyles from "@/styles/MSStyles/ComponentsStyles.ts";

export default function Drawer() {
  const dispatch = useDispatch();
  const themeCheck = useSelector((state: any) => state.darkTheme.value);
  const toggleTheme = () => {
    dispatch(changeTheme(!themeCheck));
  };

  const MsStylesClass = MsStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <OverlayDrawer
        position="end"
        modalType="non-modal"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        style={{ top: 40, height: "calc(100vh - 40px)" }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                className={MsStylesClass.button}
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
          <Switch label="Confirm before deleting" labelPosition="above" />
          <Switch label="Add new tasks on top" labelPosition="above" />
          <Switch label="Move starred tasks to top" labelPosition="above" />
          <Switch
            checked={themeCheck}
            label="Turn on night mode"
            labelPosition="above"
            onChange={toggleTheme}
          />
        </DrawerBody>
      </OverlayDrawer>
      <Button
        className={MsStylesClass.button}
        appearance="subtle"
        icon={<SettingsRegular style={{ color: "white" }} />}
        size="large"
        shape="square"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
