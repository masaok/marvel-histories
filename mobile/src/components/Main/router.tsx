import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

// Add Avenir to all screens (for Android)
import { Font } from "expo";
import SearchScreen from "./screens/SearchScreen";
import HomeScreen from "./screens/HomeScreen";
import BrowseTimelinesScreen from "../Timelines/screens/BrowseTimelinesScreen";
import ViewCharacterScreen from "../Detail/screens/ViewCharacterScreen";
import CharacterTimelineScreen from "../Timelines/screens/CharacterTimelineScreen";
import { Colors } from "../../assets";
import SeriesScreen from "./screens/SeriesScreen";
import MyTimelinesScreen from "../Timelines/screens/MyTimelinesScreen";

const HomeNavigator = createStackNavigator({ Home: HomeScreen });
const SearchNavigator = createStackNavigator({ Search: SearchScreen });
const TimelinesNavigator = createStackNavigator(
  {
    Timelines: BrowseTimelinesScreen
  },
  {
    initialRouteName: "ViewCharacter",
    headerMode: "screen"
  }
);

Font.loadAsync({
  Avenir: require("../../assets/fonts/AvenirLTStd-Black.otf")
});

export const MainTabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Home`,
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="home"
            size={35}
            color={tintColor}
          />
        )
      }
    },

    Series: {
      screen: SeriesScreen,
      navigationOptions: {
        title: `Series`,
        tabBarLabel: "Series",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="home"
            size={35}
            color={tintColor}
          />
        )
      }
    },

    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: `Search`,
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon name="search" size={35} color={tintColor} />
        )
      }
    },

    Timelines: {
      screen: ViewCharacterScreen,
      navigationOptions: {
        title: `Timelines`,
        tabBarLabel: "Timelines",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="folder"
            size={35}
            color={tintColor}
          />
        )
      }
    },

    // Temporary page for testing
    CharacterTimeline: {
      screen: CharacterTimelineScreen,
      navigationOptions: {
        title: `Character Timeline`,
        tabBarLabel: "Char TL",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="folder"
            size={35}
            color={tintColor}
          />
        )
      }
    },

    // Temporary page for testing
    BrowseTimelines: {
      screen: BrowseTimelinesScreen,
      navigationOptions: {
        title: `Browse Timelines`,
        tabBarLabel: "Browse TLs",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="folder"
            size={35}
            color={tintColor}
          />
        )
      }
    },

    MyTimelines: {
      screen: MyTimelinesScreen,
      navigationOptions: {
        title: `My Timelines`,
        tabBarLabel: "My TLs",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="folder"
            size={35}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home", // Switch this to any route above for faster reload in dev
    tabBarOptions: {
      activeTintColor: Colors.orange
    },

    // https://github.com/react-navigation/react-navigation/issues/4203#issuecomment-390995610
    navigationOptions: ({ navigation }) => {
      const component = MainTabsNavigator.router.getComponentForState(
        navigation.state
      );
      if (typeof component.navigationOptions === "function") {
        return component.navigationOptions({ navigation });
      }
      return component.navigationOptions;
    }
  }
);

const MainModalRoutes = {
  SaveToMyTimelines: MyTimelinesScreen,
}

// Non-modal StackNavigator
export const MainWithoutModalsNavigator = createStackNavigator(
  {
    MainTabs: MainTabsNavigator,
    // ...MainRoutes,
  },
  {
    initialRouteName: 'MainTabs',
    headerMode: 'none',

    navigationOptions: ({ navigation }) => {
      const component = MainWithoutModalsNavigator.router.getComponentForState(
        navigation.state
      );
      if (typeof component.navigationOptions === "function") {
        return component.navigationOptions({ navigation });
      }
      return component.navigationOptions;
    }
  }
);

// Create a "Modals Only" StackNavigator and include the "Main Without Modals" navigator
export const MainNavigator = createStackNavigator(
  {
    MainWithoutModals: MainWithoutModalsNavigator,
    // MainTabs: MainTabsNavigator,
    ...MainModalRoutes,
    // ...SearchModalRoutes,
    // ...ProfileModalRoutes,
    // ...SettingsModalRoutes,
  },
  {
    initialRouteName: 'MainWithoutModals',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => {
      const component = MainNavigator.router.getComponentForState(
        navigation.state
      );
      if (typeof component.navigationOptions === "function") {
        return component.navigationOptions({ navigation });
      }
      return component.navigationOptions;
    }
  }
);


