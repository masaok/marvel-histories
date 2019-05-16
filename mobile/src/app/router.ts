import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../components/Main/screens/HomeScreen';
import SearchScreen from '../components/Main/screens/SearchScreen';
import ViewCharacterScreen from '../components/Detail/screens/ViewCharacterScreen';
import ViewComicScreen from '../components/Detail/screens/ViewComicScreen';
import ViewSeriesScreen from '../components/Detail/screens/ViewSeriesScreen';
import CharacterTimelineScreen from '../components/Timelines/screens/CharacterTimelineScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    ViewCharacter: ViewCharacterScreen,
    ViewComic: ViewComicScreen,
    ViewSeries: ViewSeriesScreen,
    CharacterTimeline: CharacterTimelineScreen
  },
  {
    // initialRouteName: 'CharacterTimeline'
    initialRouteName: 'Home'
    // headerMode: 'none',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
