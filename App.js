import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, AsyncStorage,ScrollView } from "react-native";
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
  async componentDidMount() {
    const fetchdata=JSON.parse(await AsyncStorage.getItem("mylist"))||[]
    this.setState({
      item: fetchdata
    });
    this.arr=fetchdata;
    this.id=  this.state.item[this.state.item.length-1].id+1
    
  }
  deleteButtonHandler=async()=>{
   await AsyncStorage.removeItem("mylist");
  }

  render() {
    var renderlist = null;
    if (this.state.item.length > 0) {
      renderlist = this.state.item.map((el) => {
        return (
          <List.Item
            key={el.id}
            style={styles.List}
            title={el.data}
            right={() => <List.Icon  icon="delete" />}
            onPress={()=>this.deleteButtonHandler()}
          />
        );
      });
    }
    return (
      <ScrollView style={{backgroundColor:"#797D7F"}}>
        <Appbar.Header>
          <Appbar.Content title="TODO List" />
        </Appbar.Header>
        <TextInput
          style={styles.textInput}
          label="Enter list name"
          value={this.state.text}
          onChangeText={(text) => this.setState({ text: text })}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => this.storedata()}
        >
         Submit
        </Button>
        {renderlist}
      </ScrollView>
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
    marginBottom:10
  },
  List: {
    margin:10,
    backgroundColor: "#CACFD2",
    borderRadius: 3,
  },
  button:{
    marginLeft:20,
    marginRight:20
  }
});
