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
            url: "",
            email: "",
            buro: "",
            sat: "",
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
                error: "Please fill all the Inputs"
            });
        } else {
                this.setState({
                    error: ""
                })
                this.props.navigation.navigate('Registro2', 
                { 
                    nombreEmpresa: this.state.name,
                    companySite: this.state.url,
                    correo: this.state.email, 
                    puntosBuro: this.state.buro,
                    puntosSat: this.state.sat,
                })

            
        }
    }

    render(){
        return (         
            <ScrollView style={styles.scroll}>
                <Text style={styles.login}>
                    CrediBit
                </Text>

                <Text style={[styles.tipoInput, styles.emailPadding]}>
                    Nombre de la Empresa
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Zubut"
                    onChangeText={(name) => this.setState({name})}
                />

                <Text style={styles.tipoInput}>
                    Url de la Empresa
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="https://zubut.com"
                    onChangeText={(url) => this.setState({url})}
                />

                <Text style={styles.tipoInput}>
                    Correo
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="luis@zubut.com"
                    onChangeText={(email) => this.setState({email})}
                />

                <Text style={styles.tipoInput}>
                    Puntos Buró
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="65"
                    onChangeText={(buro) => this.setState({buro})}
                />
               <Text style={styles.tipoInput}>
                    Puntos del SAT
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="75"
                    onChangeText={(sat) => this.setState({sat})}
                />

                <Text style={styles.errorEmailPassword}>
                    {this.state.error}
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