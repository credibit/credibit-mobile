import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Button, 
    Image
} from 'react-native';
import { ImagePicker } from 'expo';
import { FileSystem } from 'expo';


export default class Registro2 extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ingresoMensual: "",
            ingresoNeto: "",
            plazoDeseado: "",
            cantidadDeseada: "",
            error: "",
            is_valid: null,
            months: [],
            ammount: null,
        }
        this.registrar = this.registrar.bind(this);
      }
    registrar(){
        if (this.state.ingresoMensual === "" || 
        this.state.ingresoNeto === "" || 
        this.state.plazoDeseado === "" ||
        this.state.cantidadDeseada === ""){
            this.setState({
                error: "Please Fill All the Inputs"
            });
        } else {
            console.log("HERE");
            console.log(this.props.navigation.getParam('nombreEmpresa', 'NO-NAME'));
            console.log(this.props.navigation.getParam('companySite', 'NO-NAME'));
            console.log(this.props.navigation.getParam('correo', 'NO-NAME'));
            console.log(this.props.navigation.getParam('puntosBuro', 'NO-NAME'));
            console.log(this.props.navigation.getParam('puntosSat', 'NO-NAME'));
            fetch("http://gotaroja.com:5000/creditEligibility",
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreEmpresa: this.props.navigation.getParam('nombreEmpresa', 'NO-NAME'),
                companySite: this.props.navigation.getParam('companySite', 'NO-SITE'),
                correo: this.props.navigation.getParam('correo', 'NO-EMAIL'),
                puntosBuro: this.props.navigation.getParam('puntosBuro', 'NO-BURO'),
                puntosSat: this.props.navigation.getParam('puntosSat', 'NO-SAT'),
                ingresoMensual: this.state.ingresoMensual,
                ingresoNeto: this.state.ingresoNeto,
                cantidadDeseada: this.state.cantidadDeseada,
                plazoDeseado: this.state.plazoDeseado,
            })
            })
            .then((response) => {
                response.json()
                console.log(response);
                response = JSON.parse(response["_bodyText"])
                console.log(response["userId"])
                this.setState({
                    is_valid: response["is_valid"],
                    months: response["months"],
                    ammount: response["ammount"],
                    error: "",
                });
                this.props.navigation.navigate('Perfil', { 
                    is_valid: this.state.is_valid,
                    months: this.state.months,
                    ammount: this.state.ammount
                 });
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
                    Ingreso Mensual
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="21000"
                    onChangeText={(ingresoMensual) => this.setState({ingresoMensual})}
                />

                <Text style={styles.tipoInput}>
                    Ingreso Neto
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="4200"
                    onChangeText={(ingresoNeto) => this.setState({ingresoNeto})}
                />

                <Text style={styles.tipoInput}>
                    Cantidad Deseada
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="335000"
                    onChangeText={(cantidadDeseada) => this.setState({cantidadDeseada})}
                />

               <Text style={styles.tipoInput}>
                    Plazo Deseado
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="42"
                    onChangeText={(plazoDeseado) => this.setState({plazoDeseado})}
                />

                <Text style={styles.errorEmailPassword}>
                    {this.state.error}
                </Text>

                <TouchableOpacity
                        style={styles.botonIniciar}
                        onPress={this.registrar}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>

                </ScrollView>
            )
 
        }
        _pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
            });
        
            console.log(result);
        
            if (!result.cancelled) {
              this.setState({ image: result.uri });
              console.log("HERE");
              this.setState({imageUri: await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingTypes.Base64 })});
            }
          };


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
        color: '#8972da'
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