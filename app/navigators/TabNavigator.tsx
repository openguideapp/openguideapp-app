import React from "react"
import { HomeScreen, SettingsScreen } from "app/screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "app/components"
import { colors, spacing, typography } from "app/theme"
// import { translate } from "i18n-js"
import { ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Community, Settings } from "iconoir-react-native"

export type TabNavigatorParamList = {
  Settings: undefined
  Home: undefined
}

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
            <Community height={30} width={30} color={focused ? colors.tint : colors.text} />
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
