import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";

export default function ChatScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatBox}>
        <TouchableHighlight
          underlayColor={"#bfbfbf80"}
          style={styles.touchStyle}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={styles.backBtn}>
            <Ionicons name="ios-chevron-back" size={24} color="#20a869" />
          </View>
        </TouchableHighlight>
        <View style={styles.chatContent}>
          <ImageBackground
            source={{
              uri: "https://png.pngtree.com/png-clipart/20190619/original/pngtree-hand-painted-cartoon-beauty-avatar-png-image_3978904.jpg",
            }}
            style={styles.image}
            width={20}
            height={20}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#d8e1e3",
  },
  touchStyle: {
    width: 20,
    borderRadius: 8,
    marginBottom: 8,
  },
  chatBox: {
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    marginTop: 20,
    borderRadius: 12,
  },
  chatContent: {
    alignItems: "center",
    marginTop: 7,
    borderWidth: 2,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingLeft: 12,
    paddingVertical: 4,
    borderRadius: 25,
    backgroundI,
  },
  backBtn: {
    paddingTop: 4,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
