import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {colors} from "../../constants/theme";

// tslint:disable-next-line:no-empty-interface
interface IProps{

}

class AccountScreen extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showLoading: true
    }
  }




  public render() {

    return (
        <View style={styles.container}>
          <Text style={[styles.welcome]}>
            Welcome to React Native!
          </Text>
        </View>
    );
  }
}

export default AccountScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 5,
    height: 50,
    margin: 5,
    width: 200,
    // tslint:disable-next-line:object-literal-sort-keys
    justifyContent: 'center',
  },
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
  textButton: {
    color: 'white'
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});