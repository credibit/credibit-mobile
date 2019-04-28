import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    Image
} from 'react-native';
import { Facebook, Constants } from 'expo';
import { LinearGradient } from 'expo';

export default class Login extends Component {

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
        Alert.alert(responseJSON);

      };
    
      /*  login() {
            return Facebook.logInWithReadPermissionsAsync('383589649130181', {
                permissions: ['public_profile', 'email', 'user_friends'],
              }).then(function(type, token) {
                //if (type === 'success') {
                    Alert.alert("llega feliz "+ token);
                    this.callGraph(token);
                    this.firebaseLogin(token);

                return "jojo";
            }).catch(function(err) {
                Alert.alert("llega sad");
                
                return {
                  name: "jeje"
                };
            });
        }
    */
           login() {
            return Facebook.logInWithReadPermissionsAsync('383589649130181', {
                permissions: ['public_profile', 'email', 'user_friends'],
              }).then((response )=>{
                switch (response.type) {
                    case "success":
                      // token is a string giving the access token to use
                      // with Facebook HTTP API requests.
                      return response.token;
                   case "cancel":
                     reject({
                       type: "error",
                       msg: "login canceled"
                      })
                     break;
                   default:
                     reject({
                       type: "error",
                       msg: "login failed"
                     })
                  }   
            })
            .then((token) => {

                accessToken = token;
                return fetch(`https://graph.facebook.com/me?   fields=id,name,email,birthday&access_token=${token}`);
            })
            .then((response) => {
                return response.json();
             })
             .then((value)=> {
                Alert.alert("Bienvenido "+ value.name);
             })
            .catch(function(err) {
                Alert.alert("adios");
               return "error";
            });
        }
    /*

   login = () => {
    return new Promise(function (resolve, reject) {
    let accessToken = "";
      Expo.Facebook.logInWithReadPermissionsAsync('383589649130181', {
      permissions: ["public_profile", "email", "user_birthday"],
    })
      .then((response) => {
        switch (response.type) {
          case "success":
            // token is a string giving the access token to use
            // with Facebook HTTP API requests.
            return response.token;
         case "cancel":
           reject({
             type: "error",
             msg: "login canceled"
            })
           break;
         default:
           reject({
             type: "error",
             msg: "login failed"
           })
        }
      })
      .then((token) => {
        accessToken = token;
        return fetch(`https://graph.facebook.com/me?   fields=id,name,email,birthday&access_token=${token}`);
      })
      .then((response) => {
         return response.json();
      })
      .then((facebookJSONResponse) => {
        console.log({ facebookJSONResponse });
        if (facebookJSONResponse.hasOwnProperty("error")) {
          reject({
            type: "error",
          });
        }
        resolve({
          type: "success",
          credentials: Object.assign({}, facebookJSONResponse, { accessToken })
        });
      })
      .catch(function (error) {
        reject({
          type: "error",
          msg: "Facebook login failed"
        })
      });
     });
    }*/

    
      // Sign in with credential from the Facebook user.
      firebaseLogin = token => {
          return 1;
        // firebase.auth().signInWithCredential(token).catch((error) => {
        //     // Handle Errors here.
        //     console.warn("Add Error for login", error)
        //   });
      };
      
      combinadas(){
        this.login();
        this.props.navigation.navigate('Perfil');
      }
      renderButton = () => (
        <TouchableOpacity onPress={() =>this.combinadas()}>
          <View
            style={styles.botonFacebook}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Iniciar Sesión con Facebook
            </Text>
          </View>
        </TouchableOpacity>
      );

    render(){
        return (    
              <ScrollView >
              <LinearGradient
                colors={['#f5f6fc','#8972da']}
                style={styles.back}>  
                  <Image 
                      style={{ height: 200, width: 200, position: 'absolute', top:0, left:70, marginBottom: 100 }} 
                      source = {require('./../assets/konfio.png')} />
                  <Text style={styles.login}>
                      CrediBit
                  </Text>
                  <View style={{margin:7}} />
              
                  <TouchableOpacity
                          style={styles.botonIniciar}
                          onPress={() => this.props.navigation.navigate('LogIn1')}
                          underlayColor='#fff'>
                          <Text style={styles.loginText}>Iniciar Sesión</Text>
                  </TouchableOpacity>
              
                  <TouchableOpacity
                          style={styles.botonIniciar}
                          onPress={() => this.props.navigation.navigate('Registro1')}
                          underlayColor='#fff'>
                          <Text style={styles.loginText}>Solicitar Credito</Text>
                  </TouchableOpacity>
              {this.state.responseJSON &&
              this.renderValue('User data : ' + this.state.responseJSON)}
              </LinearGradient> 
              </ScrollView>  
        )
    }
}

const styles = StyleSheet.create({
    login:{
        textAlign: 'center',
        fontSize: 27,
        marginTop: 170,
        paddingBottom: 80,
        color:'#FFFFFF'
    },
    slogan:{
        textAlign: 'center',
        fontSize:18,
        color:'#FFFFFF'
    },
    back:{
      padding: 20,  
      height: 650
    },
    botonRegistrar:{
        marginRight:18,
        marginLeft:18,
       marginTop:100,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'transparent',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
      botonFacebook:{
        textAlign: 'center',
        marginRight:18,
        marginLeft:18,
       marginTop:100,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#3B5998',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
      loginText:{
          color:'#8972da',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      },
        botonIniciar:{
        marginRight:18,
        marginLeft:18,
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
      container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      }
})
