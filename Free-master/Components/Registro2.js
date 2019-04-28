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
            age: "",
            ciudad: "",
            interests: "",
            gender: "",
            estado: "",
            imageUri: "",
            error: "",
            userId: "",
            image: null
        }
        this.registrar = this.registrar.bind(this);
      }
    registrar(){
        if (this.state.age === "" || 
        this.state.ciudad === "" || 
        this.state.interests === "" ||
        this.state.gender === "" ||
        this.state.estado === "" ||
        this.state.imageUri === ""){
            this.setState({
                error: "Please fill all the inputs"
            });
        } else {
            fetch("http://10.43.103.69:8080/register",
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
                nombre: this.props.navigation.getParam('name', 'NO-NAME'),
                apellido: this.props.navigation.getParam('surname', 'NO-SURNAME'),
                email: this.props.navigation.getParam('email', 'NO-EMAIL'),
                password: this.props.navigation.getParam('password', 'NO-PASSWORD'),
                edad: this.state.age,
                ciudad: this.state.ciudad,
                genero: this.state.gender,
                estado: this.state.estado,
                interes: this.state.interests,
                fotoPerfil: this.state.imageUri
            })
            })
            .then((response) => {
                response.json()
                response = JSON.parse(response["_bodyText"])
                console.log(response["userId"])
                this.setState({
                    userId: response["userId"],
                    error: "",
                });
                global.user = this.state.userId;
                this.props.navigation.navigate('Perfil', { userID: this.state.userId });
            })
            }
    }
    render(){
        return (         
            <ScrollView style={styles.scroll}>
                <Text style={styles.login}>
                    Free
                </Text>

                <Text style={[styles.tipoInput, styles.emailPadding]}>
                    Edad
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="18"
                    onChangeText={(age) => this.setState({age})}
                />

                <Text style={styles.tipoInput}>
                    Ciudad
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Zapopan"
                    onChangeText={(ciudad) => this.setState({ciudad})}
                />

                <Text style={styles.tipoInput}>
                    Gender
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Male / Female"
                    onChangeText={(gender) => this.setState({gender})}
                />

               <Text style={styles.tipoInput}>
                    Me interesa
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Males / Females"
                    onChangeText={(interests) => this.setState({interests})}
                />

                <Text style={styles.tipoInput}>
                    Que tipo de relacion buscar
                </Text>

                <TextInput  
                    style={styles.inputs}
                    placeholder="Busco a alguien que tenga ganas :)"
                    onChangeText={(estado) => this.setState({estado})}
                />

                <Text style={styles.tipoInput}>
                    Foto
                </Text>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margintTop: 10}}>
                    <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                    />
                    {this.state.image &&
                    <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </View>

                <Text style={styles.errorEmailPassword}>
                    {this.state.error}
                </Text>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                        ¿Ya tienes una cuenta?
                    </Text>
                </TouchableOpacity>

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