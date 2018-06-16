// react libraries
import React from 'react';

// react-native libraries
import { ScrollView, Dimensions, Platform } from 'react-native'

// third-party libraries
import { Item, Input, Form, Content, Label, Container } from 'native-base';

// fonts
import { Fonts } from "../../utils/Font";

class ProfileForm extends React.Component {
	
	render() {
		let { width } = Dimensions.get('window');
		
		const {
			onChangeCarModel,
			onChangePlateNumber,
			onSubmit
		} = this.props;
		
		return (
			<Form style={{ width: width / 1.1, marginLeft: 12, marginTop: 3 }}>
				
				<Item stackedLabel>
					<Label style={{ color: '#b3b4b4' }}>Car Type</Label>
					<Input
						style={{
							fontWeight: '400',
							fontFamily: Fonts.GothamRounded,
							fontSize: 14,
							color: '#acacac',
						}}
						autoCapitalize='none'
						returnKeyType='done'
						onChangeText={onChangeCarModel}
					/>
				</Item>
				
				<Item stackedLabel>
					<Label style={{ color: '#b3b4b4' }}>Plate Number</Label>
					<Input
						style={{
							fontWeight: '400',
							fontFamily: Fonts.GothamRounded,
							fontSize: 14,
							color: '#acacac',
						}}
						autoCapitalize='none'
						returnKeyType='done'
						onChangeText={onChangePlateNumber}
						onSubmitEditing={onSubmit}
					/>
				</Item>
				
				
			</Form>
			
		);
	}
	
}

export { ProfileForm };
