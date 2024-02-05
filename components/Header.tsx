import React from "react";
import {
  Button,
  useId,
  Avatar,
  Input,
  Link,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useSelector } from "react-redux";
import Drawer from "./DrawerSettings.tsx";
import MsStyles from "@/styles/MSStyles/ComponentsStyles.ts";

export default function Header() {
  const MsStylesClass = MsStyles();
  const themeCheck = useSelector((state: any) => state.darkTheme.value);
  const beforeId = useId("content-before");

  const SearchButton = (
    <Button appearance="transparent" icon={<SearchRegular />} size="small" />
  );

  return (
    <FluentProvider theme={themeCheck ? webDarkTheme : webLightTheme}>
      <nav
        style={{
          height: 40,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: themeCheck
            ? webDarkTheme.colorNeutralBackground2
            : webLightTheme.colorBrandBackground,
        }}
      >
        <Link appearance="subtle" href="/">
          <div style={{ marginLeft: 30, width: 60 }}>
            <h2 style={{ color: "white" }}>To Do</h2>
          </div>
        </Link>
        <div style={{ maxWidth: 400, width: "100%" }}>
          <Input
            contentBefore={SearchButton}
            id={beforeId}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Drawer />
          <Button
            className={MsStylesClass.button}
            appearance="subtle"
            icon={<Avatar aria-label="Guest" />}
            size="large"
            shape="square"
          />
        </div>
      </nav>
    </FluentProvider>
  );
}
