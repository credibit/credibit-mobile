import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import YouMessage from './YouMessage';
import OtherMessage from './OtherMessage';

export default class ChatConversation extends Component {
    constructor() {
        super()
    this.state = {
        message: "",
        userConversation: []
      }
      messagesRender = () => {
            return this.state.userConversation.map((item, i) => {
                if (item.id === global.user){
                    return (
                    <YouMessage
                    message = {item.message}
                    name = {item.name}
                    />
                    );
                } else {
                    return (
                    <OtherMessage
                    message = {item.message}
                    name = {item.name}
                    />
                    );
                }
            })
    }
    this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount(){
        fetch("http://10.43.103.69:8080/getMessages",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            userId: global.user,
            otherUserId: this.props.navigation.getParam('otherUserId', 'NO-ID')
        })
      })
          .then((response) => {
              response.json()
              response = JSON.parse(response["_bodyText"])
              this.setState({
                  userConversation: response["messages"],
              });
            })
            this.timer = setInterval(()=> this.fetchConversation(), 250)
    }

    async fetchConversation() {
        fetch("http://10.43.103.69:8080/getMessages",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        userId: global.user,
        otherUserId: this.props.navigation.getParam('otherUserId', 'NO-ID')
    })
  })
      .then((response) => {
          response.json()
          response = JSON.parse(response["_bodyText"])
          this.setState({
              userConversation: response["messages"],
          });
        })
    }

    addMessage() {
        fetch("http://10.43.103.69:8080/sendMessage",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            who: global.user,
            toWhom: this.props.navigation.getParam('otherUserId', 'NO-ID'),
            message: this.state.message
        })
      })
      this.setState({
        message: ""
      });
    }

    render() {
        return (
            <View>
            <View>
                <TouchableOpacity
                        style={{position:'absolute', top: 20, zIndex: 10, paddingBottom: 20, paddingTop: 20}}
                        onPress={() => this.props.navigation.navigate('Chat')}
                        underlayColor='#fff'>
                        <Text > Regresa </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{padding: 20, marginBottom: 30, marginTop: 80}}>
                {messagesRender()}
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <TextInput  
                        style={styles.inputs}
                        placeholder="add message"
                        onChangeText={(message) => this.setState({message})}
                    />
                    <TouchableOpacity
                            style={styles.botonSubmit}
                            onPress={this.addMessage}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    inputs:{
        paddingTop: 10,
        paddingBottom: 10,
        width: 220
    },
    botonSubmit:{
        width: 70,
        marginLeft: 10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#ff4d4d',
        borderColor: '#FFFFFF',
        borderRadius:10,
        borderWidth: 1,
    },
    submitText:{
        color:'#ffffff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
});