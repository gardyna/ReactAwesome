import React, { Component } from 'react';
import {
  Text,
  ListView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

export default class ChannelView extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL + this.props.endpoint)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          Alert.alert("It appears there is no schedule listing for this channel");
          this.props.navigator.pop();
          return;
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return (<Text style={styles.loadingText}>Loading ...</Text>);
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
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
    )
  }

  renderItem(item, sectionID, rowID){

    return (
      <TouchableOpacity onPress={() => showInfoAlert(item)}>
        <View key={rowID} >
          <Text>{item.title}</Text>
          <Text>{item.startTime}</Text>
        </View>
      </TouchableOpacity>

    )
  }
}

/**
* Display a popup with the details of a show
*/
const showInfoAlert = function(show){
  Alert.alert(
    show.title, // Title,
    show.description, // Message
  );
}


const REQUEST_URL = 'http://apis.is';

const styles = StyleSheet.create({
  loadingText:{
    paddingTop: 70,
  },
  listView: {
    paddingTop: 70,
  },
});
