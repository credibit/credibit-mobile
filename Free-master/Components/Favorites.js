import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FavoriteCard from './FavoriteCard';


class Favorites extends React.Component {
    render() {
      return (
        <ScrollView>
          <FavoriteCard/>
          <FavoriteCard/>
          <FavoriteCard/>
          <FavoriteCard/>
        </ScrollView>
      );
    }
  }


export default Favorites;