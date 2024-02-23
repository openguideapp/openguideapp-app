import React, { useRef, useState } from "react"
import { Button, StyleProp, View, ViewStyle, TouchableOpacity, Text } from "react-native"
import { AVPlaybackStatus, Video } from "expo-av"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme" // Assuming these are defined elsewhere

export interface VideoPlayerProps {
  style?: StyleProp<ViewStyle>
}

export const VideoPlayer = observer(function VideoPlayer({ style }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null)
  const [isPlayed, setIsPlayed] = useState(false)

  // Function to determine if the video is paused
  const isPaused = () => {
    return status !== null && "isPlaying" in status && !status.isPlaying
  }

  // Function to play the video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.playAsync()
      setIsPlayed(true)
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={setStatus as (status: AVPlaybackStatus) => void}
      />
      {isPaused() && (
        <TouchableOpacity style={styles.playButton} onPress={playVideo}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      )}
    </View>
  )
})

// Styles
const styles = {
  container: {
    justifyContent: "center",
    position: "relative", // Add this to position children with absolute
  } as ViewStyle,
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  } as ViewStyle,
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust based on the size of your button
    width: 50, // Example size, adjust as needed
    height: 50, // Example size, adjust as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)", // Example styling, adjust as needed
    borderRadius: 25, // Half of width/height to make circle
  } as ViewStyle,
  playButtonText: {
    color: "#FFF",
    fontSize: 16,
  } as ViewStyle,
}
