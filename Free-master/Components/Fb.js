import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import Expo, { Constants } from 'expo';

export default class App extends Component {
  state = {
    responseJSON: null,
  };
  callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  login = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('383589649130181', {
      permissions: ['public_profile', 'email', 'user_friends'],
    });

    if (type === 'success') {
      this.callGraph(token);

      this.firebaseLogin(token);
    }
  };

  // Sign in with credential from the Facebook user.
  firebaseLogin = token => {
    // firebase.auth().signInWithCredential(token).catch((error) => {
    //     // Handle Errors here.
    //     console.warn("Add Error for login", error)
    //   });
  };

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login to Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
  renderValue = value => (
    <Text key={value} style={styles.paragraph}>{value}</Text>
  );
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.responseJSON &&
          this.renderValue('User data : ' + this.state.responseJSON)}

        {this.renderButton()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});