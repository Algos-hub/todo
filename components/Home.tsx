import React from "react";
import { SharedColors } from '@fluentui/theme';
import { useSelector } from 'react-redux';
import {
	Label,
	Button,
	makeStyles,
	Divider,
	Input,
	FluentProvider,
	webLightTheme,
	webDarkTheme
} from '@fluentui/react-components';
import { NavigationRegular, ArrowSortRegular, Add } from '@fluentui/react-icons';

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


export default function Home(){

	const themeCheck = useSelector((state) => state.darkTheme.value);

	const weekdays: string[] = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];

	const d = new Date();
	const bClass = buttonStyle();
	return (
		<div
			style={{
				height: "calc(100vh - 40px)",
				backgroundColor: 'red',
				display: 'flex',
				flexDirection: 'column',
				width: '100%' }}>
			Home
			<div>
				<div>
					<Button 
						className={bClass.button}
						appearance="subtle"
						icon={
							<NavigationRegular/>
						}
						size="large"
						shape="square"
					/>
					<Label size='large'>My Day</Label>
					<Label size='small'>
					{weekdays[d.getDay()]}, {months[d.getMonth()]} {d.getDate()}
					</Label>
				</div>
			<div>
				<Button 
					className={bClass.button}
					appearance="subtle"
					icon={
						<ArrowSortRegular/>
					}
					size="large"
					shape="square"
				/>
			</div>
			<Divider/>
		</div>
		<div>
			<div>
			<Button 
				className={bClass.button}
				appearance="subtle"
				icon={
					<Add/>
				}
				size="large"
				shape="square"
			/>
			<Input 
				appearance='underline'
				placeholder='Add a task'
			>
			</div>
			<div>
			</div>
		</div>
	</div>
)};
