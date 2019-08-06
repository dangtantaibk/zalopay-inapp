import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Loading from "../../components/Loading";

class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showLoading: false})
    }, 2000)
  }


  render() {
    const {fontSizeForDisplay} = this.props;
    const {showLoading} = this.state;

    return (
        <View style={styles.container}>
          <Text style={[styles.welcome, {fontSize: fontSizeForDisplay}]}>
            Welcome to React Native!
          </Text>
          {showLoading && <Loading />}
        </View>
    );
  }
}

export default AccountScreen;

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