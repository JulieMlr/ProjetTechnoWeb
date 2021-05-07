import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Running from './Running'
import RunningHistory from './RunningHistory'
import MyAccount from './MyAccount'
import { Ionicons } from '@expo/vector-icons'

const Tabs = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                //activeTintColor: '#e00974',
                //inactiveTintColor: 'white',
                activeBackgroundColor: '#1abc9c',
                inactiveBackgroundColor: '#e00974',
                labelStyle: {
                    fontSize: 13,
                    color: 'white'
                }
            }}
        >

            <Tabs.Screen name="Running" component={Running} options={{
                tabBarIcon: () => <Ionicons name="timer-outline" size={25} color='white' />,
            }} />

            <Tabs.Screen name="Historique" component={RunningHistory} options={{
                tabBarIcon: () => <Ionicons name="file-tray-full-outline" size={25} color='white' />,
            }} />

            <Tabs.Screen name="Mon Compte" component={MyAccount} options={{
                tabBarIcon: () => <Ionicons name="person-outline" size={25} color='white' />,
            }} />

        </Tabs.Navigator >
    )
}

export default TabNavigation