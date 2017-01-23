import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

import ChannelView from './components/channel';
import ChannelList from './components/channelList'
import NavigationBar from './components/navigationBar'


var navigator = null;

/**
* basic class to set up navigation and maintain platform specific stuff
*/
export default class AwesomeProject extends Component {
  render() {
    return (
      <Navigator
        ref={(nav) => navigator = nav }
        style={{flex: 1}}
        initialRoute={{id: 'MAIN',title: 'Channel List'}}
        renderScene={this.renderScene}
        navigationBar={NavigationBar}
      />
    );
  }

  componentDidMount() {
    // register the back button for android devices
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
      }
      return false;
    });
  }

  // since we only have two views this function can be relatively simple
  renderScene(route, navigator) {
    // if main screen load channel list
    if (route.id === 'MAIN') {
      return (<ChannelList navigator={navigator} />);
    }
    // otherwise we load a specific channel programe
    return (
      <ChannelView
        navigator={navigator}
        endpoint={route.endpoint}
      />);
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
