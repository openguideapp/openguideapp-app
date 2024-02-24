import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Slider from "@react-native-community/slider"
import { Text } from "app/components/Text" // Assuming you have this component
import { colors, typography } from "app/theme" // Assuming these are defined
import { Audio } from "expo-av"
import { Forward, Pause, Play, Rewind } from "iconoir-react-native"
import { observer } from "mobx-react-lite"

export interface AudioPlayerProps {
  uri: string // Ideally, define a more detailed type for your track object
  style?: StyleProp<ViewStyle>
}

export const AudioPlayer = observer(function AudioPlayer({ style, uri }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      // Prepare audio session
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      })
      const sound = new Audio.Sound()
      setSound(sound)
      await sound.loadAsync({
        uri,
      })
      setIsLoading(false)
    }

    if (uri) init()
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [])

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync()
        if ("positionMillis" in status && "durationMillis" in status) {
          setProgress(status.positionMillis)
          setDuration(status.durationMillis || 0)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [sound, isPlaying])

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  }

  const playSound = async () => {
    console.log("Loading Sound")
    if (isLoading || !sound) {
      // TODO: Implement feedback for user eg. spinner
      console.log("Still Loading ...")
      return
    }
    setIsPlaying(true)
    sound.playAsync()
    console.log("Playing Sound")
  }

  const pauseSound = async () => {
    console.log("Pause Sound")
    if (sound) {
      await sound.pauseAsync()
      setIsPlaying(false)
    }
  }

  const skipBackwards = async () => {
    if (sound && duration > 0) {
      let newPosition = progress - 15000 // Skip back 15 seconds
      if (newPosition < 0) newPosition = 0
      await sound.setPositionAsync(newPosition)
      setProgress(newPosition)
    }
  }

  const skipForwards = async () => {
    if (sound && duration > 0) {
      let newPosition = progress + 15000 // Skip forward 15 seconds
      if (newPosition > duration) newPosition = duration
      await sound.setPositionAsync(newPosition)
      setProgress(newPosition)
    }
  }

  const handleSliderValueChange = async (value: number) => {
    if (sound && duration > 0) {
      const position = value * duration
      await sound.setPositionAsync(position)
      setProgress(position)
    }
  }

  return (
    <View style={[styles.paddingContainer, style]}>
      <View style={[styles.colorContainer, style]}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress)}</Text>
          <Slider
            style={styles.slider}
            maximumTrackTintColor={colors.palette.primary100}
            minimumTrackTintColor={colors.palette.primary400}
            thumbTintColor={colors.palette.primary600}
            minimumValue={0}
            maximumValue={1}
            value={duration > 0 ? progress / duration : 0}
            onSlidingComplete={handleSliderValueChange}
            disabled={!sound}
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={skipBackwards}>
            <Rewind color={colors.palette.primary500} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            {isPlaying ? (
              <Pause color={colors.palette.primary500} width={30} height={30} />
            ) : (
              <Play color={colors.palette.primary500} width={30} height={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForwards}>
            <Forward color={colors.palette.primary500} width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  colorContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 5,
    padding: 10,
  },
  controlsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 5,
  },
  paddingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    padding: 5,
  },
  slider: {
    color: colors.palette.neutral100,
    height: 40,
    width: "80%",
  },
  timeContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // This will place the time labels on the sides
    // marginBottom: 10, // Add some space above the controls
  },
  timeText: {
    color: colors.palette.primary500,
    fontFamily: typography.primary.normal,
  },
})
