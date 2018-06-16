// react libraries
import React, { Component } from 'react';

// react-native libraries
import { Dimensions, View, Platform } from "react-native";

// third-libraries
import { Content, ListItem, List, Left, Body, Text, Icon, Right } from 'native-base';

class DropDown extends Component {
	
	render() {
		let { height, width } = Dimensions.get('window');
		const { slots, carSlots, onPress } = this.props;
		
		return (
			<View
				style={{
					width: width / 1.15,
					height: height / 2.5,
					backgroundColor: '#fff',
					opacity: 0.9,
					borderColor: '#ededed',
					borderWidth: 1,
					borderBottomEndRadius: 8,
					borderBottomStartRadius: 8,
					marginLeft: 30,
				}}>
				<List
					dataArray={slots}
					renderRow={(item) =>(
						<Content >
							
							<ListItem onPress={() => onPress(item)} button avatar>
								
								<Left
									style={{
										marginTop: 15,
									}}
								>
									<Text style={{ color: carSlots === item.number ? '#333' : '#c1c1c1' }}>
										{ item.number }
									</Text>
								</Left>
								
								<Body
									style={{
										borderColor: 'white',
										borderWidth: 0,
									}}
								>
								</Body>
								
								<Right style={{
									borderColor: 'white',
									borderWidth: 0,
								}}>
									<Icon
										style={{
											color: carSlots === item.number ? '#fe3d68' : '#fff',
											paddingTop: Platform.OS === 'ios' ? 15 : 10,
										}}
										color={'b3b4b4'}
										active
										name='dot-single'
										type='Entypo'
									/>
								</Right>
							
							</ListItem>
						</Content>
					)}
				/>
			</View>
		);
	}
}

export { DropDown };
