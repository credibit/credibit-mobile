import React, { Component } from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ChatCard from './ChatCard';

export default class Chat extends Component {
    constructor() {
        super()
    this.state = {
        mesages: []
      }
      renderUserMessages = () => {
          return this.state.mesages.map((item, i) => {
              return (
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('ChatConversation', {otherUserId: item.id})}>
                    <ChatCard 
                    nombre= {item.name}
                    imagen= {item.image}
                    dia={item.date}
                    ultimoMensaje={item.lastMessage}
                    active={item.active}
                    />
                </TouchableOpacity>
              )
          })
      }
      updateSearch = search => {
        this.setState({ search });
      }
    }
    componentDidMount(){
        fetch("http://10.43.103.69:8080/getConversations",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            userId: global.user,
        })
      })
          .then((response) => {
              response.json()
              response = JSON.parse(response["_bodyText"])
              this.setState({
                  mesages: response["users"],
              });
            })
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <SearchBar
                    lightTheme
                    round
                    placeholder="Type Here..."
                    onChange={this.updateSearch}
                    value= {this.search}
                    containerStyle={{backgroundColor: 'white'}}
                />
                <View style={{ flex: 1 }}>
                    {renderUserMessages()}
                </View>
            </ScrollView>
            )
    }
}