import React from "react";
import { SharedColors } from '@fluentui/theme'
import {
      Button,
	  useId, 
	  Avatar,
	  Field,
	  Input,
	  Link,
	  makeStyles,
	  FluentProvider,
	  webLightTheme,
	  webDarkTheme
} from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";
import { SearchRegular, SettingsRegular } from "@fluentui/react-icons";
import { useSelector } from 'react-redux';
import Drawer from './Drawer.tsx';

const buttonStyle = makeStyles({
	button: {
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    ":hover:active": {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    }
  }
})

export default function Header(){
	const bClass = buttonStyle();
	const themeCheck = useSelector((state) => state.darkTheme.value);
	console.log(themeCheck);
	  const beforeId = useId("content-before");

	  const SearchButton:ButtonProps = (props) => {
		  return (
			  <Button 
				appearance="transparent"
				icon={<SearchRegular/>}
				size="small"
			  />
		  )
	  };
	 
	return (
	<FluentProvider theme={themeCheck ? webDarkTheme : webLightTheme}> 
		<nav style={{
			height: 40,
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: themeCheck ? SharedColors.Gray40 : SharedColors.cyanBlue10
			}}>
			<Link appearance="subtle" href="/">
			<div style={{marginLeft: 30, width: 60}}>
				<h2 style={{color: 'white'}}>To Do</h2>
			</div>
			</Link>
			<div style={{maxWidth: 400, width: "100%"}}>
				<Input
					contentBefore={<SearchButton />}
					id={beforeId}
					style={{width: "100%"}}
				/>
			</div>
			<div style={{display: 'flex'}}>
				<Drawer/>	
				<Button 
					className={bClass.button}
					appearance="subtle"
					icon={
						<Avatar aria-label="Guest"/>
					}
					size="large"
					shape="square"
				/>
			</div>
		</nav>
	</FluentProvider>
	)
}
