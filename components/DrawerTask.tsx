import React, { useState } from "react";
import {
  DrawerBody,
  Button,
  InlineDrawer,
  Divider,
  DrawerFooter,
  Card,
  CardFooter,
  Input,
  Checkbox,
} from "@fluentui/react-components";
import {
  CalendarRegular,
  StarRegular,
  WeatherSunnyRegular,
  ArrowRepeatAllRegular,
  PanelRightContractRegular,
  AddRegular,
  DeleteRegular,
  CircleRegular,
} from "@fluentui/react-icons";
import MsStyles from "@/styles/MSStyles/ComponentsStyles.ts";

export default function DrawerCategories(props: any) {
  const MsStylesClass = MsStyles();
  return (
    <InlineDrawer
      position="end"
      separator
      open={true}
      style={{ height: "calc(100vh - 40px)", width: 450 }}
    >
      <DrawerBody style={{ paddingInline: 0 }}>
        <Card>
          <Checkbox
            label={
              <Input
                appearance="underline"
                value={props.name}
                contentAfter={<Button icon={<StarRegular />} />}
              />
            }
          />
          <CardFooter>
            <Checkbox
              label={<Input appearance="underline" placeholder="Add a step" />}
            />
          </CardFooter>
        </Card>
        <Card>
          <WeatherSunnyRegular /> <span>Add to my day</span>
        </Card>
        <Card>
          <CalendarRegular /> <span>Add due date</span>
        </Card>
        <Card>
          <ArrowRepeatAllRegular /> <span>Repeat</span>
        </Card>
      </DrawerBody>
      <Divider style={{ padding: 20 }} />
      <DrawerFooter>
        <Button
          className={MsStylesClass.button}
          appearance="subtle"
          icon={<PanelRightContractRegular />}
          size="large"
          shape="square"
        />
        <Button
          className={MsStylesClass.button}
          appearance="subtle"
          icon={<DeleteRegular />}
          size="large"
          shape="square"
        />
      </DrawerFooter>
    </InlineDrawer>
  );
}
