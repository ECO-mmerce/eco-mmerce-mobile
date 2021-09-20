import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import { checkToken, logout } from "../store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Toast from "react-native-toast-message";
import { fetchHistory } from "../store";

export default function UserScreen() {
  const [history, setHistory] = useState([]);
  const [isToken, setIsToken] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchHistory().then((returnValue) => {
      setHistory(returnValue);
    });
  }, []);

  console.log(history, `INI HISTORY`);

  useEffect(() => {
    checkToken().then((returnValue) => {
      setIsToken(returnValue);
    });
  }, []);

  if (isToken) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.spaceContainer}>
          <Text style={styles.subTitle}>My Orders</Text>
          <ScrollView>
            {history.map((data) => {
              return <OrderCard data={data} />;
            })}
          </ScrollView>
        </View>
        <Button
          title="Logout"
          color="#f44336"
          onPress={() => {
            logout();
            checkToken().then((returnValue) => {
              if (!returnValue) {
                Toast.show({
                  type: "info",
                  text1: "Info",
                  text2: "Logged out",
                  position: "bottom",
                });
              }
              setIsToken(returnValue);
            });
          }}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.formContainer}>
          <View style={styles.background}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Welcome to ECO-mmerce!
            </Text>
            <TouchableHighlight
              style={{ marginBottom: 12 }}
              underlayColor="#333"
              onPress={() => {
                navigation.replace("Login");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#20a869",
                  borderRadius: 4,
                  padding: 8,
                }}
              >
                <Ionicons name="enter-outline" size={16} color="white" />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 12,
                    width: 60,
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#333"
              onPress={() => {
                navigation.replace("Register");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#20a869",
                  borderRadius: 4,
                  padding: 8,
                }}
              >
                <Ionicons name="person-add-outline" size={16} color="white" />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 12,
                    width: 60,
                  }}
                >
                  Register
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d8e1e3",
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    width: "100%",
  },
  spaceContainer: {
    flex: 1,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 12,
  },
});
