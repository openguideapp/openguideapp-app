import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GuidePageScreen, GuidePageScreenProps } from "app/screens"

export type GuidePageStackNavigatorParamList = {
  GuidePage: { path: string }
}

const Stack = createNativeStackNavigator<GuidePageStackNavigatorParamList>()
export const GuidePageStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GuidePage" component={GuidePageScreen} />
    </Stack.Navigator>
  )
}
