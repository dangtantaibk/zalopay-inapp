import * as React from "react";
import { PureComponent } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

class TouchableDebounce extends PureComponent {
  static defaultProps = {
    loading: false
  };
  keepDelay = true;
  defaultInterval = 500;

  constructor(props) {
    super(props);
    this.debounce = this.debounce.bind(this);
  }

  debounce(event) {
    if (this.props.onPress) {
      if (this.keepDelay) {
        this.keepDelay = false;
        this.props.onPress(event);
        setTimeout(() => {
          this.keepDelay = true;
        }, this.props.interval || this.defaultInterval);
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.debounce}
      >
        {this.props.loading ?
          <ActivityIndicator {...this.props.loadingProps} /> :
          this.props.children
        }
      </ TouchableOpacity>
    );
  }
}

export { TouchableDebounce }
