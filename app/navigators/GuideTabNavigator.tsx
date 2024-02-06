import React from "react"
import { GuidePageScreen, GuideSearchScreen, HomeScreen, SettingsScreen } from "app/screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "i18n-js"
import { ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  GuidePageStackNavigator,
  GuidePageStackNavigatorParamList,
} from "./GuidePageStackNavigator"
import { NavigatorScreenParams } from "@react-navigation/native"

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
          // tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="GuidePageStackNavigator"
        component={GuidePageStackNavigator}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="GuideSearch"
        component={GuideSearchScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
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
