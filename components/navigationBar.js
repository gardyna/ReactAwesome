import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
} from 'react-native';

const NavigationBarRouteMapper = {
  LeftButton: (route, navigator) => {
    if(route.id === 'MAIN'){
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText]}>
          Back
        </Text>
      </TouchableOpacity>
    )
  },

  RightButton: () => {
    return null;
  },

  Title: (route) => {
    return (
        <Text style={[styles.navBarText ,styles.navBarTitleText]}>
          {route.title}
        </Text>
    );
  },
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#102cba',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  navBarTitleText: {
    flex: 1,
    paddingLeft: 10,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
});

export default (
  <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={NavigationBarRouteMapper}
  />
)
