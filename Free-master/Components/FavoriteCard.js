import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


class FavoriteCard extends React.Component {
    render() {
      return (
        <View>
            <Text style={{
            backgroundColor: "rgba(246, 94, 91, 85)", 
            position: "absolute", 
            zIndex: 10, 
            color: "#FFF", 
            top: 25, 
            left: 45, 
            borderRadius: 5,
            padding: 5 }}> Cara </Text>
            <Image 
            style={{
            width: 300, 
            height: 170, 
            alignSelf: "center", 
            marginTop: 10, 
            marginBottom: 10, 
            borderRadius: 5,
            borderWidth: 5,
            borderColor: '#ffcccc',
            borderBlur: 9}}
            source = {require('./../assets/cara.jpg')} />
        </View>
      );
    }
  }

export default FavoriteCard;
