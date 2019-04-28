import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ChatCard extends Component {
    render() {
        const activeCircle = this.props.active === "true" ? <View style={{height: 15, width: 15, borderRadius: 7.5, backgroundColor: '#F65E5B'}}></View> : <Text></Text>;
        return (
                <View style={{display: "flex", flexDirection: "row", borderBottomWidth: 1, padding: 4, marginTop: 10}}>
                    <Image
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30
                    }}
                    source={{uri: this.props.imagen}}
                    />
                    <View style={{display: "flex", flexDirection: "row" ,justifyContent: "space-between", marginLeft: 25}}>
                        <View>
                            <Text style={{marginBottom: 15}}>
                                {this.props.nombre}
                            </Text>
                            <Text numberOfLines={1} style={{width: 120}}>
                                {this.props.ultimoMensaje}
                            </Text>
                        </View>
                        <View style={{display:"flex", flexDirection:"column", alignItems: "flex-end", marginLeft: 70}}>
                            <Text style={{marginBottom: 15}}>{this.props.dia}</Text>
                            {activeCircle}
                        </View>
                    </View>
                </View>
            )
    }
}

ChatCard.propTypes = {
    nombre : PropTypes.string,
    ultimoMensaje: PropTypes.string,
    imagen: PropTypes.string,
    dia: PropTypes.string,
    active: PropTypes.string,
}