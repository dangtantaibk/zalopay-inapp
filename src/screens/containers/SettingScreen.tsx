import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from "react-redux";
import Loading from "../../components/Loading";
import {StoreState} from "../../store";

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

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  fontSizeForDisplay: state.User.fontSizeForDisplay,
});

export default connect(mapStateToProps, null)(SettingScreen);

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