import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import { Icon } from "app/components/Icon"
import { translate } from "app/i18n"
import { GuideSearchScreen, HomeScreen, SettingsScreen } from "app/screens"
import { colors, spacing, typography } from "app/theme"
import MagnifyingGlass from "assets/icons/magnifying_glass.svg"
import OpenGuideLogoBW from "assets/icons/openguide_icon_bw.svg"
import OpenGuideLogoColor from "assets/icons/openguide_icon_color.svg"
import { DocMagnifyingGlass, FaceId, HomeSimple, Map, Settings } from "iconoir-react-native"

import {
  GuidePageStackNavigator,
  GuidePageStackNavigatorParamList,
} from "./GuidePageStackNavigator"

export type GuideTabNavigatorParamList = {
  Settings: undefined
  Home: undefined
  GuidePageStackNavigator: NavigatorScreenParams<GuidePageStackNavigatorParamList>
  GuideSearch: undefined
}
const Tab = createBottomTabNavigator<GuideTabNavigatorParamList>()

export const GuideTabNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: translate("tabNavigator.settings"),
          tabBarIcon: ({ focused }) => (
            <Settings height={30} width={30} color={focused ? colors.tint : colors.text} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("tabNavigator.home"),
          tabBarIcon: ({ focused }) => (
            <HomeSimple height={30} width={30} color={focused ? colors.tint : colors.text} />
          ),
        }}
      />

      <Tab.Screen
        name="GuidePageStackNavigator"
        component={GuidePageStackNavigator}
        options={{
          tabBarLabel: translate("tabNavigator.guidePage"),
          tabBarIcon: ({ focused }) =>
            // <FaceId height={30} width={30} color={focused ? colors.tint : colors.text} />
            focused ? (
              // <OpenGuideLogoColor height={30} width={30} />
              <Icon icon="openguide_color" size={30} />
            ) : (
              <OpenGuideLogoBW height={30} width={30} />
            ),
        }}
      />

      <Tab.Screen
        name="GuideSearch"
        component={GuideSearchScreen}
        options={{
          tabBarLabel: translate("tabNavigator.guideSearch"),
          tabBarIcon: ({ focused }) => (
            <MagnifyingGlass height={33} width={33} color={focused ? colors.tint : colors.text} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
