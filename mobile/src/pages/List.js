import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, AsyncStorage, ScrollView, Image } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);
    
    /* quando n ha nd no array, o useEffect executa 1 vez */
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    }
});