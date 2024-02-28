import React from "react"
// import { translate } from "i18n-js"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Icon } from "app/components"
import { HomeScreen, SettingsScreen } from "app/screens"
import { colors, spacing, typography } from "app/theme"
import { Community, HomeSimple, Settings } from "iconoir-react-native"

import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type TabNavigatorParamList = {
  Settings: undefined
  Home: undefined
}

export type TabNavigatorScreenProps<T extends keyof TabNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

export const TabNavigator = () => {
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
            // <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
            <Settings height={30} width={30} color={focused ? colors.tint : colors.text} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <HomeSimple height={30} width={30} color={focused ? colors.tint : colors.text} />
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
