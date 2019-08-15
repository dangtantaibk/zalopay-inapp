import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Loading from "../../components/Loading";

interface IStateInjectedProps {
  fontSizeForDisplay: number,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps{

}

interface IState {
  showLoading: boolean
}

class SettingScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      showLoading: true
    }
  }


  public componentDidMount(): void {
    setTimeout(() => {
      this.setState({showLoading: false})
    }, 2000)
  }

  public render() {
    const {showLoading} = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.welcome]}>
          Welcome to React Native!
        </Text>
        {showLoading && <Loading />}
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