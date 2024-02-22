import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import TrackPlayer, { State, usePlaybackState, useProgress } from "react-native-track-player"
import { Text } from "app/components/Text"
import { colors, typography } from "app/theme"
import { Forward, Pause, Play, Rewind } from "iconoir-react-native"
import { observer } from "mobx-react-lite"

export interface AudioPlayerProps {
  track: any // Specify a more detailed type according to your track object structure
  style?: StyleProp<ViewStyle>
}

export const AudioPlayer = observer(function AudioPlayer(props: AudioPlayerProps) {
  const { track, style } = props
  const playbackState = usePlaybackState()
  const progress = useProgress(1000) // Update progress every milli second

  React.useEffect(() => {
    setupTrackPlayer(track)
  }, [track])

  const setupTrackPlayer = async (track: any) => {
    await TrackPlayer.reset()
    await TrackPlayer.add(track)
  }

  const formatTime = (seconds: number): string => {
    const pad = (num: number) => num.toString().padStart(2, "0")
    return `${pad(Math.floor(seconds / 60))}:${pad(Math.floor(seconds % 60))}`
  }

  const skip = async (seconds: number) => {
    const newPosition = progress.position + seconds
    await TrackPlayer.seekTo(newPosition > 0 ? newPosition : 0)
  }

  const togglePlayback = async () => {
    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause()
    } else {
      await TrackPlayer.play()
    }
  }

  return (
    <View style={[style, $audioPlayer]}>
      <View style={$progressBarContainer}>
        <Text style={$progressText}>{formatTime(progress.position)}</Text>
        <View style={$progressBar}>
          <View
            style={[$progress, { width: `${(progress.position / progress.duration) * 100}%` }]}
          ></View>
        </View>
        <Text style={$progressText}>{formatTime(progress.duration)}</Text>
      </View>
      <View style={$controls}>
        <TouchableOpacity onPress={() => skip(-10)}>
          <Rewind height={30} width={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
          {playbackState.state === State.Playing ? (
            <Pause height={30} width={30} color="#000" />
          ) : (
            <Play height={30} width={30} color="#000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => skip(10)}>
          <Forward height={30} width={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
})

// Assuming these objects are defined elsewhere in your project
// const typography = {
//   primary: {
//     normal: "System", // Replace 'System' with your actual font family
//   },
// }

// const colors = {
//   palette: {
//     primary500: "#000", // Example color, replace with your actual color
//     background: "#ddd",
//     progress: "#000",
//   },
// }

const $audioPlayer: ViewStyle = {
  alignItems: "center",
  padding: 20,
}

const $progressBarContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginBottom: 20,
}

const $progressBar: ViewStyle = {
  flex: 1,
  height: 5,
  backgroundColor: colors.background,
  marginHorizontal: 10,
}

const $progress: ViewStyle = {
  height: "100%",
  // backgroundColor: colors.progress,
  backgroundColor: colors.error,
}

const $progressText: TextStyle = {
  width: 50,
  textAlign: "center",
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $controls: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
