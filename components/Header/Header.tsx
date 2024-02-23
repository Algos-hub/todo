import React from "react";
import {
  Avatar,
  Button,
  FluentProvider,
  IdPrefixProvider,
  Input,
  Link,
  useId,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useSelector } from "react-redux";
import Drawer from "../DrawerSettings/DrawerSettings.tsx";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./Header.module.css";
import { Settings } from "@/reducers/settings.ts";

export default function Header() {
  const settings: Settings = useSelector((state: any) => state.settings);

  const SearchButton = (
    <Button appearance="transparent" icon={<SearchRegular />} size="small" />
  );

  return (
    <IdPrefixProvider value="APPID-">
      <FluentProvider theme={settings.darkTheme ? webDarkTheme : webLightTheme}>
        <nav
          className={styles.navBar}
          style={{
            backgroundColor: settings.darkTheme
              ? webDarkTheme.colorNeutralBackground2
              : webLightTheme.colorBrandBackground,
          }}
        >
          <Link appearance="subtle" href="/">
            <div className={styles.title}>
              <h2>To Do</h2>
            </div>
          </Link>
          <div className={styles.searchBar}>
            <Input contentBefore={SearchButton} className={styles.input} />
          </div>
          <div className={styles.userSettings}>
            <Drawer />
            <Button
              className={MsStyles.button}
              appearance="subtle"
              icon={<Avatar aria-label="Guest" />}
              size="large"
              shape="square"
            />
          </div>
        </nav>
      </FluentProvider>
    </IdPrefixProvider>
  );
}
