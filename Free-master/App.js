import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Favorites from './Components/Favorites';
import LogIn from './Components/Login';
import LogIn1 from './Components/Login1';
import Registro1 from './Components/Registro1';
import Registro2 from './Components/Registro2';
import Perfil from './Components/Perfil';
import Chat from './Components/Chat';
import Explorar from './Components/Explorar';
import ChatConversation from './Components/ChatConversation';
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  FlatList,
  createDrawerNavigator,
 } from 'react-navigation';
import { Icon } from 'react-native-elements';

class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}

export default App;

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Explorar: 
    { 
      screen: Explorar,
      navigationOptions: {
            tabBarLabel: 'Explorar',
            tabBarIcon: ({tintColor, activeTintColor}) => (
              <Icon
                color = {tintColor}
                style={styles.icon}
                name="search"
                type='font-awesome'
              />
               )
          }, 
    },
    Favorites: 
    { 
      screen: Favorites,
      navigationOptions: {
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({tintColor, activeTintColor}) => (
              <Icon
                color = {tintColor}
                style={styles.icon}
                name="star"
                type='font-awesome'
              />
               )
          }, 
    },
    Chat: 
    { 
      screen: Chat,
      navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor, activeTintColor}) => (
              <Icon
                color = {tintColor}
                style={styles.icon}
                name="comment"
                type='font-awesome'
              />
               )
          }, 
    },
    Perfil:   
    { 
      screen: Perfil,
      navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({tintColor, activeTintColor}) => (
              <Icon
                color = {tintColor}
                style={styles.icon}
                name="user"
                type='font-awesome'
              />
               )
          }, 
    }
  },
  {
    tabBarOptions: {
       activeTintColor: '#F65E5B',
       inactiveTintColor: '#7e7b7b',
       showIcon: true,
       style: { height: 54,backgroundColor: '#fff',borderTopWidth:0.5,borderTopColor: '#fb9800' },
       showLabel: true,
       labelStyle: {
        fontSize: 10,
       }

    }
  }

);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
    LogIn: { screen: LogIn },
    LogIn1: { screen: LogIn1},
    Registro1: {screen: Registro1},
    Registro2: {screen: Registro2},
    ChatConversation: {screen: ChatConversation},
    Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botonIniciar:{
    marginRight:18,
    marginLeft:18,
   marginTop:50,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ff4d4d',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  }
});