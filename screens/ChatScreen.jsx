import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatBox}>
        <Text style={{ color: "red" }}>Chatnya mas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});
