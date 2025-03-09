import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    if (goalText.trim() === "") return;
    setGoalList([...goalList, { id: Math.random().toString(), text: goalText }]);
    setGoalText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          value={goalText}
          onChangeText={setGoalText}
        />
        <Button title="ADD GOAL" onPress={addGoalHandler} />
      </View>
      <FlatList
        data={goalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.text}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 41,
    fontWeight: "bold",
    backgroundColor: '#003161',
    color: '#FFF4B7',
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#006A67",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#003161",
    color: '#FFF4B7',
    borderRadius: 5,
  },
});
