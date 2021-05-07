import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Running = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.playBtn}
            >
                <Ionicons name="play" size={25} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.stopBtn}
            >
                <Ionicons name="stop" size={25} color='white' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '25%'
    },
    playBtn: {
        width: '14%',
        height: '7.5%',
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: '25%'
    },
    stopBtn: {
        width: '14%',
        height: '7.5%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginLeft: '25%',
        marginTop: '-13.25%'
    }
});

export default Running