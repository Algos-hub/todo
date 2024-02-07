import React, { useState } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  InlineDrawer,
  TabList,
  Tab,
  Divider,
} from "@fluentui/react-components";
import {
  CalendarRegular,
  CalendarFilled,
  StarFilled,
  StarRegular,
  HomeFilled,
  HomeRegular,
  WeatherSunnyRegular,
  WeatherSunnyFilled,
  NavigationRegular,
  bundleIcon,
  CheckmarkCircleFilled,
  CheckmarkCircleRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MSStyles/ComponentsStyles.ts";

export default function DrawerCategories(props: any) {
  const Calendar = bundleIcon(CalendarFilled, CalendarRegular);
  const Star = bundleIcon(StarFilled, StarRegular);
  const Check = bundleIcon(CheckmarkCircleFilled, CheckmarkCircleRegular);
  const Home = bundleIcon(HomeFilled, HomeRegular);
  const Sun = bundleIcon(WeatherSunnyFilled, WeatherSunnyRegular);

  const MsStylesClass = MsStyles();
  return (
    <InlineDrawer
      position="start"
      separator
      open={props.openCategories}
      style={{ height: "calc(100vh - 40px)", width: 450 }}
    >
      <DrawerHeader style={{ paddingInline: 6 }}>
        <DrawerHeaderTitle style={{ paddingInline: 0 }}>
          <Button
            className={MsStylesClass.button}
            appearance="subtle"
            aria-label="Close"
            icon={<NavigationRegular />}
            onClick={() => props.setOpenCategories(false)}
          />
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody style={{ paddingInline: 0 }}>
        <TabList
          vertical
          size="large"
          appearance="subtle"
          defaultSelectedValue="tab1"
          style={{ paddingInline: 0 }}
        >
          <Tab icon={<Sun />} value="tab1">
            My day
          </Tab>
          <Tab icon={<Star />} value="tab2">
            Important
          </Tab>
          <Tab icon={<Calendar />} value="tab3">
            Planned
          </Tab>
          <Tab icon={<Check />} value="tab4">
            Completed
          </Tab>
          <Tab icon={<Home />} value="tab5">
            Tasks
          </Tab>
        </TabList>
        <Divider style={{ padding: 20 }} />
      </DrawerBody>
    </InlineDrawer>
  );
}
