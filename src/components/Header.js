import React, { PureComponent, ReactElement, ReactNodeArray } from "react";
import {
  FlexAlignType, GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import { SafeAreaView, SafeAreaViewForceInsetValue } from "react-navigation";
import { icons } from "../assets/images";

const ALIGN_STYLE = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};

const Children = (props) => (
    <View
      style={[
        {
          alignItems:
            props.placement && (ALIGN_STYLE[props.placement] as FlexAlignType)
        },
        props.style
      ]}
    >
      {props.children}
    </View>
  );

const Container = (props) => {
  if (props.backgroundSource) {
    return (
      <ImageBackground
        style={{ paddingHorizontal: 1 }}
        source={props.backgroundSource}
      >
        <SafeAreaView {...props}>{props.children}</SafeAreaView>
      </ImageBackground>
    );
  }
  return <SafeAreaView {...props}>{props.children}</SafeAreaView>;
};

const ArrowBackLeft = (props) => {
  return (<TouchableOpacity
      onPress={props.goBackPressed}
      style={[styles.arrowBackLeft, props.style]}>
    <Image style={{ tintColor: props.tintColor }} source={icons.backLeftArrow} />
  </TouchableOpacity>)
};

export default class Header extends PureComponent {
  static defaultProps = {
    placement: "center"
  };

  render() {
    const {
      backgroundSource,
      forceInset,
      backgroundColor,
      containerStyle,
      containerBodyStyle,
      placement,
      leftContainerStyle,
      centerContainerStyle,
      rightContainerStyle,
      leftComponent,
      centerComponent,
      rightComponent,
      children,
      bottomComponent,
      bottomContainerStyle
    } = this.props;
    const childrens = children ;
    return (
      <Container
        backgroundSource={backgroundSource}
        forceInset={forceInset}
        style={StyleSheet.flatten([
          styles.container,
          containerStyle,
          backgroundColor ? { backgroundColor } : null
        ])}
      >
        <View
          style={StyleSheet.flatten([styles.containerBody, containerBodyStyle])}
        >
          <Children
            style={[
              placement === "center" ? styles.rightLeftContainer : {},
              leftContainerStyle
            ]}
            placement="left"
          >
            {(React.isValidElement(children) && children) ||
              (childrens && childrens[0]) ||
              leftComponent === 'goBack' ? <ArrowBackLeft tintColor={this.props.arrowBackColor} style={this.props.arrowBackStyle} goBackPressed={this.props.goBackPressed} /> : leftComponent}
          </Children>

          <Children
            style={[
              styles.centerContainer,
              placement !== "center" && {
                paddingHorizontal: Platform.OS === "ios" ? 15 : 16
              },
              centerContainerStyle
            ]}
            placement={placement}
          >
            {(React.isValidElement(children) && children) ||
              (childrens && childrens[1]) ||
              centerComponent}
          </Children>

          <Children
            style={[
              placement === "center" ? styles.rightLeftContainer : {},
              rightContainerStyle
            ]}
            placement="right"
          >
            {(React.isValidElement(children) && children) ||
              (childrens && childrens[2]) ||
              rightComponent}
          </Children>
        </View>
        <Children style={[bottomContainerStyle]}>
          {(React.isValidElement(children) && children) ||
            (childrens && childrens[3]) ||
            bottomComponent}
        </Children>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  arrowBackLeft: {
    padding:15
  },
  centerContainer: {
    flex: 3
  },
  container: {},
  containerBody: {
    alignItems: "center",
    flexDirection: "row",
    height: Platform.OS === "ios" ? 72 : StatusBar.currentHeight ? StatusBar.currentHeight + 56 : 56,
    justifyContent: "space-between",
    paddingBottom: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  rightLeftContainer: {
    flex: 1
  }
});
