import React from "react";
import { SharedColors } from '@fluentui/theme'
import { useSelector } from 'react-redux';

export default function Home(){
	const themeCheck = useSelector((state) => state.darkTheme.value);
	console.log(themeCheck);
	return <div style={{
		height: "calc(100vh - 40px)", backgroundColor: 'red' }}>Home</div>
};
