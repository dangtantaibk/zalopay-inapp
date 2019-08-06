import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class SettingScreen extends Component {
  render() {
    const {fontSizeForDisplay} = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.welcome, {fontSize: fontSizeForDisplay}]}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});