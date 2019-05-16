import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

// Add Avenir to all screens (for Android)
import { Font } from 'expo';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';

Font.loadAsync({
  Avenir: require('../../assets/fonts/AvenirLTStd-Black.otf'),
});

export const MainTabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Home`,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='home'
            size={35}
            color={tintColor}
          />
        ),
      },
    },

    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: `Search`,
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon name='search' size={35} color={tintColor} />
        ),
      },
    },

    Timelines: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Timelines`,
        tabBarLabel: 'Timelines',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='music'
            size={35}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home', // Switch this to any route above for faster reload in dev
    tabBarOptions: {
      activeTintColor: 'orange',
    },
  }
);
