import React from "react"
import {
  GuideHomeScreen,
  GuidePageScreen,
  GuideSearchScreen,
  MarketplaceScreen,
  SettingsScreen,
} from "app/screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "i18n-js"
import { ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export type TabGuideHomeNavigatorParamList = {
  Settings: undefined
  Marketplace: undefined
  GuideHome: undefined
  GuidePage: undefined
  GuideSearch: undefined
}
const Tab = createBottomTabNavigator<TabGuideHomeNavigatorParamList>()

export const TabGuideHomeNavigator = () => {
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
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="GuideHome"
        component={GuideHomeScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="GuidePage"
        component={GuidePageScreen}
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
