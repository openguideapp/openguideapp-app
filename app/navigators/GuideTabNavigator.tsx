import React from "react"
import { TextStyle,ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import { Icon } from "app/components"
import { translate } from "app/i18n"
import { GuidePageScreen, GuideSearchScreen, HomeScreen, SettingsScreen } from "app/screens"
import { colors, spacing, typography } from "app/theme"
import { DocMagnifyingGlass, FaceId, HomeSimple, Settings } from "iconoir-react-native"

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
          tabBarLabel: translate("tabNavigator.hom"),
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
          tabBarIcon: ({ focused }) => (
            <FaceId height={30} width={30} color={focused ? colors.tint : colors.text} />
          ),
        }}
      />

      <Tab.Screen
        name="GuideSearch"
        component={GuideSearchScreen}
        options={{
          tabBarLabel: translate("tabNavigator.guideSearch"),
          tabBarIcon: ({ focused }) => (
            <DocMagnifyingGlass
              height={30}
              width={30}
              color={focused ? colors.tint : colors.text}
            />
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
