import React, { useState, useEffect, useContext } from "react";
import { Text, View, Card, CardItem, Left, Body, Thumbnail, Right, Button } from "native-base";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const BoardList = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);

  async function fetchData() {
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.user}`
    );
    setUser(result.data.payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function goToUser() {
    console.log("User Page Here");
    const userID = user.googleID.toString();
    console.log(userID);
    if (userID == auth.googleID) {
      console.log("Your profile here");
      props.navigation.navigate("Profile");
    } else {
      console.log("Friend's profile here", user.googleID);
      props.navigation.navigate("FriendProfile", { user: user.googleID });
    }
  }

  return (
    <Card style={{ borderRadius: 1000 }}>
      {user && (
        <TouchableOpacity onPress={goToUser}>
          <CardItem>
            <Left>
                <Text> # {props.position} </Text>
                <Thumbnail
                  source={{ uri: user.ProfilePic }}
                  style={{ height: 30, width: 30, borderRadius: 30 }}
                />
                <Text>{user.Username}</Text>
              </Left>
              <Right>
                <CardItem style={{height: 0}}>
                  <Text>{user.Trees}</Text>
                  <Thumbnail
                    source={ require('../assets/tree_icon.png') }
                    style={{ height: 30, width: 30, borderRadius: 30 }}
                  />
                  <Text>{user.Points}</Text>
                  <Thumbnail
                    source={ require('../assets/study_icon.png') }
                    style={{ height: 30, width: 30, borderRadius: 30 }}
                  />
                </CardItem>
              </Right>
          </CardItem>
        </TouchableOpacity>
      )}
    </Card>
  );
};

export default BoardList;
