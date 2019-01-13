import React from 'react';
import {View, StatusBar, Text} from 'react-native'


export default class DetailScreen extends React.Component {
    static navigationOptions = (navigation) =>{
        return {
            headerTitle: 'Details',
        }
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
                <StatusBar barStyle="default" backgroundColor = "#00BCD4" />
            </View>
        );
    }
}

