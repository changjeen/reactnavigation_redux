import React from 'react';
import {createStackNavigator, createBottomTabNavigator,createAppContainer, createSwitchNavigator, } from "react-navigation";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
import SettingScreen from './SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View, AsyncStorage} from "react-native";
import {LoginScreen, AuthLoadingScreen} from './Login';
import BadInstagramCloneApp from './BadInstagramCloneApp';
import ProductScanRNCamera from './ProductScanRNCamera';

class IconWithBadge extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            listCount : 0,
        };

        this._retrieveData = this._retrieveData.bind(this);

    }

    componentDidMount(): void {
        // this._retrieveData;
        AsyncStorage.getItem('badgeCount').then((value) => this.setState({ 'listCount': value }));
    }


    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                {this.state.listCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {this.state.listCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }

    _retrieveData = async () => {

        // let result = 0;

        try {
            const value = await AsyncStorage.getItem('unReadItemCount');
            if (value !== null) {
                // We have data!!
                console.log(value);
                this.setState({
                    listCount : value,
                });
            }
        } catch (error) {
            // Error retrieving data
            return 0;
        }
    }
}

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
};


const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;


    let IconComponent = Ionicons;
    let iconName;
    let listCount;
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // We want to add badges to home tab icon
        // listCount = navigation.getParam('listCount', -1);
        // listCount = navigation.state.params;
        // console.log(listCount);
        // IconComponent = HomeIconWithBadge;
        return <IconWithBadge name={iconName} size={25} color={tintColor} badgeCount={listCount}/>;
    } else if (routeName === 'Settings') {
        // iconName = `ios-settings${focused ? '' : '-outline'}`;
        iconName = 'ios-settings';
    } else if ( routeName === 'Camera'){
        iconName = 'ios-camera';
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};



const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailScreen,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        },
    }

);


const SettingsStack = createStackNavigator(
    {
        Settings: SettingScreen,
        Details: DetailScreen,
    },
    {
        initialRouteName: 'Settings',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        },
    }
);

// const CameraStack = createStackNavigator(
//     {
//         Camera: BadInstagramCloneApp,
//     }
// )

const AuthStack = createStackNavigator({Login: LoginScreen});

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Camera : BadInstagramCloneApp,
        // Camera : ProductScanRNCamera,
        Settings: SettingsStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),

        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: TabNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
)
)
