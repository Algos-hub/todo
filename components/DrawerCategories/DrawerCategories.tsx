import React, { useState } from "react";
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Divider,
  InlineDrawer,
  Tab,
  TabList,
} from "@fluentui/react-components";
import {
  bundleIcon,
  CalendarFilled,
  CalendarRegular,
  CheckmarkCircleFilled,
  CheckmarkCircleRegular,
  HomeFilled,
  HomeRegular,
  NavigationRegular,
  StarFilled,
  StarRegular,
  WeatherSunnyRegular,
  WeatherSunnyFilled,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MsStyles.module.css";
import styles from "./DrawerCategories.module.css";

export default function DrawerCategories(props: any) {
  const Calendar = bundleIcon(CalendarFilled, CalendarRegular);
  const Star = bundleIcon(StarFilled, StarRegular);
  const Check = bundleIcon(CheckmarkCircleFilled, CheckmarkCircleRegular);
  const Home = bundleIcon(HomeFilled, HomeRegular);
  const Sun = bundleIcon(WeatherSunnyFilled, WeatherSunnyRegular);

  return (
    <InlineDrawer
      position="start"
      separator
      open={props.openCategories}
      className={styles.drawer}
    >
      <DrawerHeader className={styles.drawerHeader}>
        <DrawerHeaderTitle className={styles.noInlinePadding}>
          <Button
            className={MsStyles.button}
            appearance="subtle"
            aria-label="Close"
            icon={<NavigationRegular />}
            onClick={() => props.setOpenCategories(false)}
          />
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody className={styles.noInlinePadding}>
        <TabList
          vertical
          size="large"
          appearance="subtle"
          defaultSelectedValue="My day"
          className={styles.noInlinePadding}
          selectedValue={props.selectedValue}
          onTabSelect={props.onTabSelect}
        >
          <Tab icon={<Sun />} value="My day">
            My day
          </Tab>
          <Tab icon={<Star />} value="Important">
            Important
          </Tab>
          <Tab icon={<Calendar />} value="Planned">
            Planned
          </Tab>
          <Tab icon={<Check />} value="Completed">
            Completed
          </Tab>
          <Tab icon={<Home />} value="Tasks">
            Tasks
          </Tab>
        </TabList>
        <Divider className={styles.divider} />
      </DrawerBody>
    </InlineDrawer>
  );
}
