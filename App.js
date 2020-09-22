import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Appbar, TextInput, Button, List } from "react-native-paper";

export default class App extends React.Component {
  arr = [];
  id = 0;
  state = {
    text: "",
    item: [{ id: 1, data: "loading" }],
  };
  storedata = async () => {
    try {
      this.arr.push({ id: this.id, data: this.state.text });
      this.id++;
      await AsyncStorage.setItem("mylist", JSON.stringify(this.arr));
      this.setState({
        item: JSON.parse(await AsyncStorage.getItem("mylist")),
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    var renderlist = null;
    if (this.state.item.length > 0) {
      renderlist = this.state.item.map((el) => {
        return (
          <List.Item
            key={el.id}
            style={styles.List}
            title={el.data}
            right={() => <List.Icon icon="delete" />}
          />
        );
      });
    }
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="TODO" subtitle="List" />
        </Appbar.Header>
        <TextInput
          style={styles.textInput}
          label="Email"
          value={this.state.text}
          onChangeText={(text) => this.setState({ text: text })}
        />
        <Button
          style={styles.textInput}
          mode="contained"
          onPress={() => this.storedata()}
        >
          Press me
        </Button>
        {renderlist}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    margin: 20,
    height: 50,
  },
  List: {
    margin: 20,
    backgroundColor: "#CACFD2",
    borderRadius: 3,
  },
});
