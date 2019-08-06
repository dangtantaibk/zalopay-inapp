import LottieView from "lottie-react-native";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { loading } from "../assets/json";

const styles = StyleSheet.create({
  loading: {
    height: 300,
    width: 300
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <LottieView
          source={loading.loadingAnimation}
          style={styles.loading}
          loop
          autoPlay
        />
      </View>
    );
  }
}
