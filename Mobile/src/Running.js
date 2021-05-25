import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Button, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Running = (props) => {
    const [timerOn, setTimerOn] = useState(false)
    const [restart, setRestart] = useState(false)
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState()
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const start = () => {
        if (timerOn == false) {
            if (restart == true) {
                setCounter(0)
                setRestart(false)
            }
            setTimerOn(true)
            setTimer(setInterval(() => {
                setCounter(counter => counter + 1)
            }, 1000))
        }
    }

    const pause = () => {
        if (timerOn == true) {
            setTimerOn(false)
            clearInterval(timer)
        }
    }

    const stop = () => {
        if (timerOn == true) {
            setTimerOn(false)
            setRestart(true)
            clearInterval(timer)
        }
    }


    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center' }}>
            <Image
                style={{ height: 150, width: '100%', top: 0 }}
                source={{
                    uri: 'https://cdn.discordapp.com/attachments/771665604977491978/840167041507655680/logo_small_mobile.png'
                }} />
            <Text style={{ fontSize: 30, color: '#e00974' }}>{day} / {month} / {year}</Text>
            <View style={styles.container}>
                <Text style={styles.time}>km</Text>
                <Text style={styles.time}>{counter} s</Text>
                <View style={styles.block}>
                    <TouchableOpacity
                        style={styles.playBtn}
                        onPress={() => start()}
                    >
                        <Ionicons name="play" size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.pauseBtn}
                        onPress={() => pause()}
                    >
                        <Ionicons name="pause" size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.stopBtn}
                        onPress={() => stop()}
                    >
                        <Ionicons name="stop" size={25} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    playBtn: {
        width: '15%',
        height: '35%',
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    pauseBtn: {
        width: '15%',
        height: '35%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    stopBtn: {
        width: '15%',
        height: '35%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    time: {
        fontSize: 30,
        color: "black",
        marginBottom: 30,
        textAlign: "center",
    },
    block: {
        flexDirection: 'row'
    }
});

export default Running