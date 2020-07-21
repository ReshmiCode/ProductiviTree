import React, { useState, useEffect, useContext } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Left, Right } from 'native-base';
import { FlatList, RefreshControl } from "react-native";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const Search = () => {
    const auth = useContext(AuthContext);
    let [user, setUser] = useState(null);
    let [users, setUsers] = useState([]);
    var [filtered, setFiltered] = useState([]);

  async function fetchData() {
    var data = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/`
      );
    setUsers(data.data.payload);
    data = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(data.data.payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilterFunction = text => {    
    if(text != ""){
        const filteredData = users.filter(item => {      
            const itemData = item.Username.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;    
        });
        for(var i = 0; i < filteredData.length; i++){
            if(filteredData[i].googleID == user.googleID){
                let temp = filteredData[i];
                filteredData[i] = filteredData[filteredData.length - 1];
                filteredData[filteredData.length - 1] = temp;
                filteredData.pop();
            }
        }
        setFiltered(filteredData); 
    }
    else{
        setFiltered([]);
    }
  };

  const userCard = ({ item }) => {
    return (
      <ListItem>
        <Text>{item.Username}</Text>
      </ListItem>
    );
}

  return (
    <Container>
        <Header searchBar rounded >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text => {searchFilterFunction(text)}} autoCorrect={false} />
          <Icon name="ios-people" />
        </Item>
        
      </Header>
    <List>
      <FlatList          
        data={filtered}          
        renderItem={userCard}
        keyExtractor={item => item.googleID}
         
      />            
    </List>
    </Container>
      
  );
};

export default Search;