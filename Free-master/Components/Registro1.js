import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';


export default class Registro1 extends Component {
    constructor(props){
        super(props);
        this.state = { 
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: ""
        }
        this.checkPassword = this.checkPassword.bind(this);
      }
    checkPassword(){
        if (this.state.name === "" || 
        this.state.surname === "" || 
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.confirmPassword === ""){
            this.setState({
                error: "Please fill all the inputs"
            });
        } else {
            if (this.state.password === this.state.confirmPassword){
                this.setState({
                    error: ""
                })
                this.props.navigation.navigate('Registro2', 
                { 
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email, 
                    password: this.state.password,
                })
            } else {
                this.setState({
                    error: "Please check the passwords are the same"
                });
            }
        }
    }

    render(){
        return (         
            <ScrollView style={styles.scroll}>
                <Text style={styles.login}>
                    Free
                </Text>

                <Text style={[styles.tipoInput, styles.emailPadding]}>
                    Nombre
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Danniela"
                    onChangeText={(name) => this.setState({name})}
                />

                <Text style={styles.tipoInput}>
                    Apellido
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Medina"
                    onChangeText={(surname) => this.setState({surname})}
                />

                <Text style={styles.tipoInput}>
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
                    onChangeText={(password) => this.setState({password})}
                />
               <Text style={styles.tipoInput}>
                    Confirmar Contraseña
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="* * * * * * * *"
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                />

                <Text style={styles.errorEmailPassword}>
                    {this.state.error}
                </Text>

                <Text style={styles.forgotPassword}>
                    ¿Ya tienes una cuenta?
                </Text>



                <TouchableOpacity
                        style={styles.botonIniciar}
                        onPress={this.checkPassword}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>Continuar</Text>
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
        color:'#ff8080'
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
        color:'#ff8080',
        fontSize: 17
      },
      inputs:{
          paddingTop: 10,
          paddingBottom: 10
      },
      emailPadding:{
        paddingTop: 20
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
        backgroundColor:'#ff4d4d',
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
        color: '#ff4d4d'
      }

})