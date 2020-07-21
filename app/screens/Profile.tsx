import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import Post from "../components/PostList";

const axios = require("axios").default;

const Profile = (props: any) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(result.data.payload);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  function goToSettings() {
    console.log("Settings Page Here");
    props.navigation.navigate("Settings")
  };
  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {user && <ProfileInfo user={user} />}
        <Button
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={goToSettings}
        >
          <Text>Settings</Text>
        </Button>
        {user && <Post user={user.googleID} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
