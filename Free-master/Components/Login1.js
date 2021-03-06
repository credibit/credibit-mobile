
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
} from 'react-native';


export default class Login1 extends Component {
    constructor(props){
        super(props);
        this.state = { 
            load: "False",
            email: "",
            password: "",
            userId: "",
            error: "",
        }
        this.iniciarSesion = this.iniciarSesion.bind(this);
      }

    iniciarSesion(){
        console.log("HERE");
        fetch("http://gotaroja.com:5000/login",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.email,
            password: this.state.password,
        })
      })
          .then((response) => {
              
              response = response["_bodyText"];
              console.log(response);
              this.setState({
                  load: response,
                  error: "",
              });
              if (this.state.load === "Successful") {
                this.props.navigation.navigate('Perfil');
              } 
              else {
                this.setState({
                    error: "Username or Password Incorrect",
                });
              } 
            })
    }
    render(){
        return (         
            <ScrollView style={styles.scroll}>
                <Text style={styles.login}>
                    CrediBit
                </Text>

                <Text style={[styles.tipoInput, styles.emailPadding]}>
                    Email
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="correo@example.com"
                    onChangeText={(email) => this.setState({email})}
                />

                <Text style={styles.tipoInput}>
                    Contraseña
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="* * * * * * * *"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />

                <Text style={styles.errorEmailPassword}>
                    {this.state.error}
                </Text>

                <TouchableOpacity
                        style={styles.botonIniciar}
                        onPress={this.iniciarSesion}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                </ScrollView>
            )
 
        }


}

const styles = StyleSheet.create({
    login:{
        textAlign: 'center',
        fontSize: 27,
        marginTop: 50,
        color:'#8972da'
    },
    slogan:{
        textAlign: 'center',
        fontSize:18,
        color:'#ff8080'
    },
      loginText:{
          color:'#ffffff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      },
      tipoInput:{
        color:'#8972da',
        fontSize: 20
      },
      inputs:{
          paddingTop: 10,
          paddingBottom: 10
      },
      emailPadding:{
        paddingTop: 90,
        color: '#8972da'
      },
      forgotPassword:{
        textAlign:'right',
        fontSize: 12,
        color: '#ff4d4d'
      },
        botonIniciar:{
        marginRight:18,
        marginLeft:18,
       marginTop:50,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#8972da',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
      scroll:{
          padding:20,
          backgroundColor: '#FFFFFF'
      },
      errorEmailPassword: {
        textAlign:'center',
        fontSize: 15,
        color: '#8972da'
      }
}) 
