import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';


export default class Perfil extends Component {
    constructor() {
        super()
        this.state = {
            nombre: "Dafne",
            imagen: "https://static.thenounproject.com/png/17241-200.png",
            genero: "Female",
            estado: "Hello there",
        }
    }
    componentDidMount(){
        console.log(global.user)
        fetch("http://10.43.103.69:8080/getProfile",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            userID: global.user,
        })
      })
          .then((response) => {
              response.json()
              response = JSON.parse(response["_bodyText"])
              this.setState({
                  nombre: response["name"],
                  imagen: response["image"],
                  genero: response["gender"],
                  estado: response["userState"],
              });
            })
    }
    render() {
        return (
                <View style={{ flex:1, backgroundColor: 'transparent' }}>
                  <View>
                      <Image 
                      style={{ height: 510, width: 400, position: 'absolute', top:0, left:0 }} 
                      source = {require('./../assets/free.png')} />
                  </View>
                  <ScrollView style={{ flex:1 }}>
                        <View style={{
                            height: 220, 
                            backgroundColor: "#ffcccc"}}>
                            <Image
                            style={{height: 128, width: 128, borderRadius: 64, alignSelf: 'center', marginTop: 20, marginBottom: 30}}
                            source= {{uri: this.state.imagen }}/>
                            <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Text style={styles.textInfo}>
                                    Fotos
                                </Text >
                                <Text style={styles.textInfo}>
                                    {this.state.nombre}
                                </Text>
                                <Text style={styles.textInfo}> 
                                    {this.state.genero}
                                </Text>
                            </View>
                        </View>
                        <View style={{height: 150, backgroundColor: "#fff"}}>
                            <Text style={{color: '#ff8080', alignSelf: 'center', fontWeight: 'bold', marginTop: 60}}>Estado</Text>
                            <Text style={{color: '#ff8080', alignSelf: 'center'}}>{this.state.estado}</Text>
                        </View>
                        <View style={{height: 400, backgroundColor: "#ffcccc", display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={styles.boxButton}>
                                    <Icon
                                        color = '#F65E5B'
                                        style={styles.icon}
                                        name="camera"
                                        type='font-awesome'
                                    />
                                    <Text style={{color: '#F65E5B', alignSelf:'center'}}>Mis Fotos</Text>
                                </View>
                                <View style={styles.boxButton}>
                                    <Icon
                                        color = '#F65E5B'
                                        style={styles.icon}
                                        name="map-pin"
                                        type='font-awesome'
                                    />
                                    <Text style={{color: '#F65E5B', alignSelf: 'center'}}>Lugares</Text>
                                </View>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={styles.boxButton}>
                                    <Icon
                                        color = '#F65E5B'
                                        style={styles.icon}
                                        name="check"
                                        type='font-awesome'
                                    />
                                    <Text style={{color: '#F65E5B', alignSelf:'center'}}>Mis Gustos</Text>
                                </View>
                                <View style={styles.boxButton}>
                                    <Icon
                                        color = '#F65E5B'
                                        style={styles.icon}
                                        name="times"
                                        type='font-awesome'
                                    />
                                    <Text style={{color: '#F65E5B', alignSelf:'center'}}>Restricciónes</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                            style={{backgroundColor: "transparent", alignSelf: "center", padding: 10, borderRadius: 5, borderWidth: 2, borderColor: "white"}}
                            onPress={() => this.props.navigation.navigate('LogIn')}
                            underlayColor='#fff'>
                                <Text style={{color: '#F65E5B'}}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                  </ScrollView>
                </View>
            )
    }
}
const styles = StyleSheet.create({
    textInfo: {
        color: 'white',
    },
    boxButton: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 5,
    },
    icon: {
        height: 70,
        width: 70,
    }
});
