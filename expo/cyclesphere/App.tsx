import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptor } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import SettingsScreen from './pages/register/Form'; 
import LoginScreen from './pages/login/Form';
import Home2Screen from './pages/main/Form'

type RootTabParamList = {
  Home: undefined;
  Home2: undefined;
  Login: undefined;
  Register: undefined;
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

type Props = {
  state: {
    index: number;
    routes: Array<RouteProp<RootTabParamList, keyof RootTabParamList>>;
  };
  descriptors: { [key: string]: any }; 
  navigation: BottomTabNavigationProp<RootTabParamList>;
};

function MyTabBar({ state, descriptors, navigation }: Props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel :
          options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          // Handle long press event if needed
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Home2" component={Home2Screen}/>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Register" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
