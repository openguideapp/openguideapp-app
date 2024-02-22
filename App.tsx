import React from "react"
import * as SplashScreen from "expo-splash-screen"

import App from "./app/app"
import { PlaybackService } from "app/services/trackPlayer/playbackService"
import TrackPlayer from "react-native-track-player"

SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => PlaybackService)

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
