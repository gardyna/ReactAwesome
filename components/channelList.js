import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  ListView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';

// we need to extract navigator to handle context change in ListView rendering
var nav;

export default class ChannelList extends Component {
  constructor(props) {
    super(props);
    nav = this.props.navigator;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  // initiate data fetch as soon as component is ready
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.results[0].channels,
          dataSource: this.state.dataSource.cloneWithRows(responseData.results[0].channels),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderChannel}
        style={styles.listView}
        navigator={this.props.navigator}

        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
          return (<View
            key={rowID}
            style={{
              height: adjacentRowHighlighted ? 4: 1,
              backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
            }}
          />)
        }}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading channels...
        </Text>
      </View>
    );
  }

  renderChannel(channel) {
    console.log(channel);
    return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => openChannelView(channel, nav)}
          >
          <Text style={styles.title}>{channel.name}</Text>
        </TouchableOpacity>
    )
  }
}

const openChannelView = (channel, navigator) => {
  navigator.push({
    id: channel.name,
    endpoint: channel.endpoint,
    title: channel.name});
}

const REQUEST_URL = 'http://apis.is/tv/';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonListItem: {
    flex: 1,
    height: 50,
    alignItems: 'stretch',
  },
  listView: {
    paddingTop: 80, // the height of the navbar
  },
});
