import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);
  const [editGoalId, setEditGoalId] = useState(null);

  let [fontsLoaded] = useFonts({
    'PoppinsBlack': require('./assets/fonts/Poppins/Poppins-Black.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const addOrEditGoalHandler = () => {
    if (goalText.trim() === "") return;
    if (editGoalId) {
      setGoalList((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === editGoalId ? { ...goal, text: goalText } : goal
        )
      );
      setEditGoalId(null);
    } else {
      setGoalList([...goalList, { id: Math.random().toString(), text: goalText }]);
    }
    setGoalText("");
  };

  const removeGoalHandler = (goalId) => {
    setGoalList(goalList.filter((goal) => goal.id !== goalId));
  };

  const editGoalHandler = (goalId) => {
    const goalToEdit = goalList.find((goal) => goal.id === goalId);
    if (goalToEdit) {
      setGoalText(goalToEdit.text);
      setEditGoalId(goalId);
    }
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
        <TouchableOpacity style={styles.addButton} onPress={addOrEditGoalHandler}>
          <Text style={styles.buttonText}>{editGoalId ? "SAVE" : "ADD GOAL"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={goalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>{item.text}</Text>
            <TouchableOpacity onPress={() => editGoalHandler(item.id)} style={styles.iconButton}>
              <FontAwesome name="edit" size={20} color="#FFA500" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeGoalHandler(item.id)} style={styles.iconButton}>
              <FontAwesome name="trash" size={20} color="#FF0000" />
            </TouchableOpacity>
          </View>
        )}
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
  backgroundColor: "#003161",
  color: "#FFF4B7",
  textAlign: "center",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 15,
  alignSelf: "center",
  marginBottom: 15,
  fontFamily: 'PoppinsBold',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#003161",
    fontFamily: 'PoppinsBlack',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    fontFamily: 'PoppinsBlack',
    color: "#003161",
  },
  addButton: {
    backgroundColor: "#003161",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    flex: 1,
    fontFamily: 'PoppinsBlack',
    color: "#FFF4B7",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003161",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'PoppinsBlack',
  },
  listItem: {
    color: "#FFF4B7",
    flex: 1,
    fontFamily: "PoppinsBlack",
  },
  iconButton: {
    padding: 5,
    marginHorizontal: 5,
  },
});

