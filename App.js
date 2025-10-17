import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import {Audio} from 'expo-av';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Promo />
    </SafeAreaProvider>
  );
}

function Promo() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);


 useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsWorking(!isWorking);
      setTime(isWorking ? 5 * 60 : 25 * 60);
      alarmSound();

    }
    return () => clearInterval(interval);
  }, [isActive, time]);


  function handleStartPause() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    await sound.playAsync();
  }

  async function alarmSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/alarma.mp3')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={styles.view}>
      <Text style={styles.text}>POMODORO</Text>
      <Header currentTime={currentTime} 
      setCurrentTime={setCurrentTime}
      setTime={setTime} />

      <Timer time={time}/>
      <TouchableOpacity style={{
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
      onPress={() => handleStartPause()}
      >
        <Text style={{color: "white", fontSize: 20}}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
        

        
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  view: {
    paddingTop: 3,
    paddingHorizontal: 15,
    flex: 1,

  },
  text: {
    fontSize: 30,
    fontWeight: "600",
  },
});