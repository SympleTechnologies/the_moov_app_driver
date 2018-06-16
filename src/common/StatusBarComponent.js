// react libraries
import React from 'react';

// react-native libraries
import { StatusBar } from 'react-native'

const StatusBarComponent = () => {
  return (
	  <StatusBar
		  barStyle={"dark-content"}
		  backgroundColor='transparent'
		  translucent={true}
	  />
  )
};

export { StatusBarComponent };
