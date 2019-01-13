import React from 'react';
import {StatusBar, Text, View, AsyncStorage, Button} from "react-native";

export default class SettingScreen extends React.Component {
    static navigationOptions = (navigation) => {
        return {
            headerTitle: 'Setting',
        }
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Setting</Text>
                {/*<StatusBar barStyle="default" backgroundColor="#00BCD4"/>*/}
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}
