import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../components/Main/screens/HomeScreen';
import SearchScreen from '../components/Main/screens/SearchScreen';
import ViewCharacterScreen from '../components/Detail/screens/ViewCharacterScreen';
import ViewComicScreen from '../components/Detail/screens/ViewComicScreen';
import ViewSeriesScreen from '../components/Detail/screens/ViewSeriesScreen';
import { MainTabsNavigator } from '../components/Main/router';

const AppNavigator = createStackNavigator(
  {
    Main: MainTabsNavigator,
  },
  {
    initialRouteName: 'Main',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
