import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="TODO" subtitle="List" />
        </Appbar.Header>
        <TextInput style={styles.textInput}
      label="Email"
      value={this.state.text}
      onChangeText={text => setText(text)}
    />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput:{
    margin:20,
    height:50,
    border:"2 solid red"
  }
});
