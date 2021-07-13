import React, { PureComponent } from "react";
import { ProfileHeader } from "../components";

export default class 
 extends PureComponent {
	render() {
		const { navigation, color,isCollapsed,title } = this.props;
		return (
			<ProfileHeader 
				navigation={navigation}
				// onGrid={() => navigation.navigate("TopicsStackScreen")}
				title={title}
				isBottomBorder={false}
				// isLogo
				onSearch={() => navigation.navigate("SearchDrawerScreen")}
				color={'#fff'}
				isCollapsed={isCollapsed} 
				//source={source}
			/>
		);
	}
}
