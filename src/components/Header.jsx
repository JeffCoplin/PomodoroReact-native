import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


  const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({currentTime, setCurrentTime, setTime}) {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }
    return ( 
        <View style={{flexDirection: 'row'}}>
            {options.map((item, index) => (
                <TouchableOpacity onPress={() => handlePress(index)} key={index} style={[styles.itemStyle, currentTime === index ? {borderColor: 'white'} : {borderColor: 'transparent'}]}> 
                    <Text style={{fontWeight: "bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    ) }

const styles = StyleSheet.create({
    text: {
      fontSize: 20,},

    itemStyle:{
    width: "33%",
     flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 2,

    }
    
    
    });