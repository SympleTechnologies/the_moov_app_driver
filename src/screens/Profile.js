// react library
import React from  'react';

// react-native libraries
import {AsyncStorage, ImageBackground, Dimensions, Image, ScrollView, TouchableOpacity, Platform, View } from 'react-native';

// third-party libraries
import { Container, Text, Content, Card, CardItem, Body, Icon, Button, Right } from 'native-base';
import * as axios from 'axios';

// common
import { StatusBarComponent } from "../common";

// Font
import {Fonts} from "../utils/Font";
import {DropDown} from "../common/DropDown";
import {BasicInformation, ProfileForm} from "../component/Forms";

class Profile extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			userToken: '',
			user: {
				image_url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png',
				driver_info: {
					car_slots: false,
					car_model: '',
					plate_number: ''
				}
			},
			dropDown: false,
			
			car_slots: 0,
			car_model: '',
			plate_number: '',
			phone_number: '',
		};
	}
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method sets user token
	 */
	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem('token');
			if (value !== null){
				this.setState({ userToken: value }, () => this.fetchUserDetails());
			}
		} catch (error) {
			// Error retrieving data
		}
	}
	
	/**
	 * fetchUserDetails
	 *
	 * fetches User transaction from the back end and saves it in local storage
	 * @param newBalance
	 * @return {void}
	 */
	fetchUserDetails = () => {
		console.log('called')
		axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.userToken}`;
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		
		axios.get('https://moov-backend-staging.herokuapp.com/api/v1/user')
			.then((response) => {
				console.log(response.data.data);
				this.setState({
					user: response.data.data.user,
					car_slots: response.data.data.user.driver_info.car_slots === null ? 'Edit slot' : response.data.data.user.driver_info.car_slots,
				});
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};
	
	/**
	 * toggleDropDown
	 *
	 * toggles dropDown state
	 */
	toggleDropDown = () => {
		this.setState({ dropDown: !this.state.dropDown })
	};
	
	/**
	 * getSelectedSlot
	 *
	 * gets the selected slot
	 * @param {object} slot - school name
	 */
	getSelectedSlot= (slot) => {
		this.setState({
			dropDown: !this.state.dropDown,
			car_slots: slot.number
		})
	};
	
	onChangeCarModel = (car_model) => {
		this.setState({ car_model });
	};
	
	onChangePlateNumber = (plate_number) => {
		this.setState({ plate_number });
	};
	
	submitChanges = () => {
		console.log(this.state)
	};
	
	render() {
		console.log(this.state);
		let { height, width } = Dimensions.get('window');
		
		return(
			<Container
				style={{
					backgroundColor: '#ffffff',
				}}
			
			>
				<StatusBarComponent/>
				
				{/*Section A*/}
				<ImageBackground
					style={{
						height: height / 2.5,
						width: width,
					}}
					source={require('../../assets/images/profile-page-background.png')}
				>
					<Content
						contentContainerStyle={{
							marginTop: height / 9.5,
							marginLeft: width / 6.5,
							flexDirection: 'row',
						}}
					>
						<Image
							style={{
								height: height / 6.5,
								width: width / 3.5,
								borderRadius: 8
							}}
							source={{ uri: this.state.user.image_url && this.state.user.image_url }}
						/>
						
						<Content
							contentContainerStyle={{
								marginTop: 25,
								marginLeft: 20,
							}}
						>
							<Text style={{
								fontSize: 20,
								color: '#d1041f',
								fontWeight: '700',
								fontFamily: Fonts.GothamRounded
							}}>{this.state.user.firstname && this.state.user.firstname} {this.state.user.firstname && this.state.user.lastname}</Text>
						</Content>
					
					</Content>
				
				
				
				</ImageBackground>
				
				{/*Section B*/}
				<Content>
					<Content
						contentContainerStyle={{
							width: width / 1.15,
							// borderColor: 'red',
							// borderWidth: 1,
							marginLeft: 30,
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}
					>
						<Content
							contentContainerStyle={{
								width: width / 4,
								height: height / 12,
								flexDirection: 'row',
								marginRight: 5
							}}
						>
							{/*Status*/}
							<Card style={{
								flexDirection: 'row',
								borderColor: '#fff',
								borderWidth: 0,
								backgroundColor: 'transparent',
							}}>
								
								{/*Offline*/}
								<TouchableOpacity>
									<CardItem  style={{
										backgroundColor: this.state.user.driver_info.status !== true ? '#c8c8c8' : '#fff',
										borderColor: '#fff',
										borderRightWidth: 0,
										width: width / 8,
										marginTop: 3
									}}>
										<Body>
										<Icon
											name="x"
											type={"Feather"}
											style={{
												fontSize: 15,
												color: this.state.user.driver_info.status !== true ? '#fff' : '#c8c8c8',
												lineHeight: 20
											}}/>
										</Body>
									</CardItem>
								</TouchableOpacity>
								
								{/*Online*/}
								<TouchableOpacity>
									<CardItem style={{
										borderColor: '#f3f3f3',
										backgroundColor: this.state.user.driver_info.status === true ? '#ed1269' : '#fff',
										borderLeftWidth: 0,
										width: width / 8
									}}>
										<Body>
										<Icon
											name="ios-checkmark-outline"
											type="Ionicons"
											style={{
												marginTop: 8,
												fontSize: 35,
												color: '#fff',
												lineHeight: 20
											}}/>
										</Body>
									</CardItem>
								</TouchableOpacity>
							</Card>
						
						</Content>
					
					</Content>
					
					
					{/*Slots*/}
					<Content
						contentContainerStyle={{
							width: width / 1.15,
							borderColor: 'white',
							borderBottomColor: '#acacac',
							borderWidth: 0.5,
							marginLeft: 30,
							marginTop: 10,
							flexDirection: 'row',
							// alignItems: 'flex-end',
						}}
					>
						<Text
							style={{
								marginTop: 10,
								fontSize: 15,
								color: '#acacac',
								fontFamily: Fonts.GothamRounded,
								fontWeight: '400'
							}}>Number of Slots</Text>
						<Right>
							<Text style={{ marginLeft: 30, fontSize: 16, color: '#acacac', fontFamily: Fonts.GothamRounded }}>
								{
									this.state.car_slots
								}
							</Text>
						</Right>
						<Right>
							{/*Right drop down icon*/}
							<TouchableOpacity onPress={this.toggleDropDown}>
								<Icon
									style={{
										marginRight: 20,
										marginBottom: 10,
										marginTop: Platform.OS === 'ios' ? 0 : 5,
										color: '#ea8c99'
									}}
									active
									name='angle-down'
									type='FontAwesome'
								/>
							</TouchableOpacity>
						</Right>
					</Content>
					{
						this.state.dropDown
							?
							<DropDown
								// schools={this.state.schools}
								slots={
									[
										{
											"number": 7
										},
										{
											"number": 6
										},
										{
											"number": 5
										},
										{
											"number": 4
										},
										{
											"number": 3
										},
										{
											"number": 2
										},
										{
											"number": 1
										},
									]
								}
								carSlots={
									this.state.user.driver_info.car_slots === null || this.state.user.driver_info.car_slots === false
										? 0
										: this.state.user.driver_info.car_slots
								}
								onPress={this.getSelectedSlot}
							/>
							:
							<View/>
					}
					
					{/*Mid Form*/}
					{
						this.state.dropDown === true
							?
							<View/>
							:
							<ProfileForm
								onChangeCarModel={(value) => this.onChangeCarModel(value)}
								onChangePlateNumber={(value) => this.onChangePlateNumber(value)}
								onSubmit={this.submitChanges}
							/>
					}
					
					<Content
						contentContainerStyle={{
							width: width / 1.15,
							borderColor: 'white',
							borderBottomColor: '#acacac',
							borderWidth: 0.5,
							marginLeft: 30,
							marginTop: 10,
							flexDirection: 'row',
							// alignItems: 'flex-end',
						}}
					>
						<Text
							style={{
								marginTop: 10,
								fontSize: 15,
								color: '#acacac',
								fontFamily: Fonts.GothamRounded,
								fontWeight: '400'
							}}>Status</Text>
						<Right>
							<Text style={{ marginLeft: 30, fontSize: 16, color: '#acacac', fontFamily: Fonts.GothamRounded }}>
								{
									this.state.user.driver_info.status === true ? 'ONLINE' : 'OFFLINE'
								}
							</Text>
						</Right>
						<Right>
							{/*Right drop down icon*/}
							<TouchableOpacity onPress={this.toggleDropDown}>
								<Icon
									style={{
										marginRight: 20,
										marginBottom: 10,
										marginTop: Platform.OS === 'ios' ? 0 : 5,
										color: '#ea8c99'
									}}
									active
									name='angle-down'
									type='FontAwesome'
								/>
							</TouchableOpacity>
						</Right>
					</Content>
					
					
					{/*Sign-in Button*/}
					<Button
						style={{
							width: width / 1.5,
							height: width / 7,
							marginLeft: width / 5.6,
							marginTop: 20,
							backgroundColor: '#ed1768',
							borderRadius: 8
						}}
						onPress={this.submitChanges}
						block
						dark>
						<Text
							uppercase={false}
							style={{
								fontWeight: '900',
								fontFamily: Fonts.GothamRoundedLight
							}}>Save Changes</Text>
					</Button>
				
				</Content>
			
			</Container>
		)
	}
	
}

export { Profile };

