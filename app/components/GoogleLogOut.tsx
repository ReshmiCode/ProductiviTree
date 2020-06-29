//Source for google auth: https://docs.expo.io/versions/latest/sdk/google/

import React, { useState, useEffect } from 'react';
import { TouchableOpacity , Image } from 'react-native';
import { Container, Content, Text, Button , Thumbnail } from "native-base";
import * as Google from "expo-google-app-auth";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID , ANDROID_APK_CLIENT_ID , IOS_APP_CLIENT_ID} from "../config";

const GoogleLogOut = ({navigate} : { navigate: any}) => {

    const signOutWithGoogle = async () => {
        try {
            const { type, accessToken, user } = await Google.logOutAsync({
                accessToken: "",
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                androidStandaloneAppClientId: ANDROID_APK_CLIENT_ID,
                iosStandaloneAppClientId: IOS_APP_CLIENT_ID,
                scopes: ["profile", "email"],
            });
      
            if (type === "success") {
              console.log("Logged out", user);
              navigate.navigate('Login');
              return accessToken;
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            console.log("Error with logout", e);
            return { error: true };
          }
    };

    return (
        <Content>
            <TouchableOpacity onPress={signOutWithGoogle}>
                <Image
                    source={require('../assets/google_sign_in.png')}
                    //Image from Google's branding guidlines
                    //https://developers.google.com/identity/branding-guidelines
                />
            </TouchableOpacity>
        </Content>
    );
}

export default GoogleLogOut;