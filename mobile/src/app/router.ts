import { createAppContainer, createStackNavigator } from 'react-navigation';

import { MainTabsNavigator } from '../components/Main/router';

const AppNavigator = createStackNavigator(
  {
    Main: MainTabsNavigator,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'auto',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
