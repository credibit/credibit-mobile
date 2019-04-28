import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';

export default class OtherMessage extends Component {
    render() {
        return (
            <View style={{alignItems:'flex-end'}}>
            <View style={styles.view}>
                <Text style={styles.nameText}>{this.props.name}</Text>
                <Text style={styles.messageText}>{this.props.message}</Text>
            </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    view:{
        width: 150,
        backgroundColor: '#FBAED2', 
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    nameText:{
        color:'#eeeeee',
        textAlign: "right"
    },
    messageText: {
        color: '#FFFFFF',
    }
});


OtherMessage.propTypes = {
    message : PropTypes.string,
    name: PropTypes.string,
}