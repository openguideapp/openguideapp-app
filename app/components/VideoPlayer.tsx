import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from "react-native"
import Slider from "@react-native-community/slider"
import { colors, typography } from "app/theme" // Assuming these are defined elsewhere
import {
  type AVPlaybackStatus,
  type AVPlaybackStatusError,
  type AVPlaybackStatusSuccess,
  Video,
} from "expo-av"
import { Forward, Pause, Play, Rewind } from "iconoir-react-native"
import { observer } from "mobx-react-lite"

export interface VideoPlayerProps {
  uri: string
  style?: ViewStyle
}

// TODO: observer???
export const VideoPlayer = observer(function VideoPlayer({ style, uri }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess | AVPlaybackStatusError | null>(null)
  const [progress, setProgress] = useState<number>(0) // Progress of the video
  const [duration, setDuration] = useState<number>(0) // Duration of the video in milliseconds

  function isAVPlaybackStatusSuccess(status: AVPlaybackStatus): status is AVPlaybackStatusSuccess {
    return "isLoaded" in status && status.isLoaded && !("error" in status)
  }
  // Update progress and duration based on status changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (status && isAVPlaybackStatusSuccess(status)) {
      // Inside this block, TypeScript knows status is AVPlaybackStatusSuccess
      const newDuration = status.durationMillis ?? 0
      const newProgress = status.positionMillis ? status.positionMillis / newDuration : 0

      setDuration(newDuration)
      setProgress(newProgress)
    }
  }, [status])

  // Determines if the video is playing
  const isPlaying = () => {
    return status !== null && "isPlaying" in status && status.isPlaying
  }

  // Play or pause the video
  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying() ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
    }
  }

  // Seek the video by a given amount (in milliseconds)
  const handleSeek = async (amount: number) => {
    if (status && isAVPlaybackStatusSuccess(status) && videoRef.current) {
      const newPosition = status.positionMillis + amount >= 0 ? status.positionMillis + amount : 0
      await videoRef.current.setPositionAsync(newPosition)
    }
  }

  // Handle slider change
  const handleSliderValueChange = async (value: number) => {
    const newPosition = value * duration
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(newPosition)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <View style={[styles.paddingContainer, style]}>
      <View style={[styles.colorContainer, style]}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri }}
          useNativeControls={true}
          onPlaybackStatusUpdate={setStatus as (status: AVPlaybackStatus) => void}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime((status?.positionMillis ?? 0) / 1000)}</Text>
          <Slider
            style={styles.slider}
            maximumTrackTintColor={colors.palette.primary100}
            minimumTrackTintColor={colors.palette.primary400}
            thumbTintColor={colors.palette.primary500}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onSlidingComplete={handleSliderValueChange}
          />
          <Text style={styles.timeText}>{formatTime(duration / 1000)}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={() => handleSeek(-15000)}>
            <Rewind color={colors.palette.primary500} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            {isPlaying() ? (
              <Pause color={colors.palette.primary500} width={30} height={30} />
            ) : (
              <Play color={colors.palette.primary500} width={30} height={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSeek(15000)}>
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
  controlButton: {
    marginHorizontal: 5, // Space between buttons
    padding: 10, // Touchable area
    justifyContent: "center",
    alignItems: "center",
  },
  controlText: {
    color: colors.palette.primary500,
    fontSize: 14, // Adjust based on your typography settings
    fontFamily: typography.primary.bold, // Assuming bold is defined in your typography settings
  },
  controlsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  paddingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    padding: 5,
  },
  slider: {
    flex: 1, // Take up all available space
    marginHorizontal: 10, // Space between text and slider
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "100%", // Ensure the slider and time text span the full container width
    paddingHorizontal: 20, // Padding to ensure content doesn't touch the edges
  },
  timeText: {
    color: colors.palette.primary500,
    fontFamily: typography.primary.normal,
    fontSize: 12, // Adjust based on your typography settings
  },
  video: {
    width: 320, // Fixed width, can be adjusted
    height: 180, // Based on a 16:9 aspect ratio, can be adjusted
    borderRadius: 10, // Optional: for rounded corners
    overflow: "hidden", // Keeps the rounded corners effect
  },
})
