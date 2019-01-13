import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
import SettingScreen from './SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from "react-native";


export class IconWithBadge extends React.Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                {badgeCount > 0 && (
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
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

export const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
};

export const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // We want to add badges to home tab icon
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        // iconName = `ios-settings${focused ? '' : '-outline'}`;
        iconName = 'ios-settings';
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


export const AppNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
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
