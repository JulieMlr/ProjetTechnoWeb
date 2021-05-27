import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Button, Text, Image, Alert, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MapView, { Marker } from "react-native-maps"
import Geolocation from 'react-native-geolocation-service'
import * as Location from 'expo-location'

const Running = (props) => {
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
    const [timerOn, setTimerOn] = useState(false)
    const [restart, setRestart] = useState(false)
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState()
    const latitudeDelta = 0.009
    const longitudeDelta = 0.009
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const [distanceCourse, setDistCourse] = useState(0)

    const [region, setRegion] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    const [newRegion, setNewRegion] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    const LOCATION_SETTINGS = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0
    }

    const start = () => {
        if (timerOn == false) {
            if (restart == true) {
                setCounter(0)
                setDistCourse(0)
                setRestart(false)
            }
            setTimerOn(true)
            setTimer(setInterval(() => {
                setCounter(counter => counter + 1)
            }, 1000))
            GetEvolutiveLocation()
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

    useEffect(() => {
        CheckIfLocationEnabled()
        GetCurrentLocation()
    }, [])

    useEffect(() => {
        //console.log('region : ' + JSON.stringify(region)+'\n\n')
        CalcKm()
    }, [newRegion])

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        if (!enabled) {
            Alert.alert(
                'Services de localisation non activés',
                'Merci de les activés pour continuer',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        } else {
            setLocationServiceEnabled(enabled)
        }
    }

    const GetCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Permission non accordée',
                "Autorisez l'application à utiliser les services de localisation",
                [{ text: 'OK' }],
                { cancelable: false }
            )
        }
        const { coords } = await Location.getCurrentPositionAsync()
        if (coords) {
            const { latitude, longitude } = coords
            //console.log('coords : ' + JSON.stringify(coords))
            setRegion({ latitude, longitude, latitudeDelta, longitudeDelta })
            setNewRegion({ latitude, longitude, latitudeDelta, longitudeDelta })
        }
    }

    const GetEvolutiveLocation = async () => {
        await Location.watchPositionAsync(LOCATION_SETTINGS, (loc) => GetNewLocation(loc))
    }

    const degreesToRadians = (degrees) => {
        const pi = Math.PI
        return degrees * (pi / 180)
    }

    const calcDist2Points = (lat1, long1, lat2, long2) => {
        return Math.acos(
            Math.sin(degreesToRadians(lat1))
            *
            Math.sin(degreesToRadians(lat2))
            +
            Math.cos(degreesToRadians(lat1))
            *
            Math.cos(degreesToRadians(lat2))
            *
            Math.cos(degreesToRadians(long1 - long2))
        ) * 637100
    }

    const GetNewLocation = (geolocation) => {
        const { latitude, longitude } = geolocation.coords

        const tmpRegion = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
        setNewRegion(tmpRegion)
    }

    const CalcKm = () => {
        const distance = calcDist2Points(region.latitude, region.longitude, newRegion.latitude, newRegion.longitude)
        //console.log('region.latitude : '+region.latitude+' region.longitude : '+region.longitude+' newregion.latitude : '+newRegion.latitude+' newRegion.longitude : '+newRegion.longitude)
        if (!Number.isNaN(distance) && timerOn == true) {
            console.log('distance : ' + parseInt(distance))
            setDistCourse(parseInt(distanceCourse) + parseInt(distance))
            setRegion(newRegion)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ height: 150, width: '100%', top: 5 }}
                source={{
                    uri: 'https://cdn.discordapp.com/attachments/771665604977491978/840167041507655680/logo_small_mobile.png'
                }} />
            <Text style={{ fontSize: 25, color: '#e00974', marginTop: '-5%', marginBottom: '2.5%' }}>{day} / {month} / {year}</Text>
            {region.latitude != null && <MapView
                style={{ height: '55%', width: '90%' }}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>}
            <View style={styles.infoRun}>
                <Text style={styles.time}>{distanceCourse} m</Text>
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
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    infoRun: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    playBtn: {
        width: '15%',
        height: '65%',
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    pauseBtn: {
        width: '15%',
        height: '65%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    stopBtn: {
        width: '15%',
        height: '65%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: '2.5%'
    },
    time: {
        fontSize: 25,
        color: "black",
        textAlign: "center",
        marginVertical: '1.5%'
    },
    block: {
        flexDirection: 'row'
    }
});

export default Running