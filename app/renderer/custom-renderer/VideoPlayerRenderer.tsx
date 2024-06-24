import React, { useEffect, useRef, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Slider from "@react-native-community/slider"
import type { GuideStylesDictionary } from "app/services/guide-builder/types/data-types"
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
  styles: GuideStylesDictionary
}

export const VideoPlayerRenderer = observer(function VideoPlayer({
  styles,
  uri,
}: VideoPlayerProps) {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess | AVPlaybackStatusError | null>(null)
  const [progress, setProgress] = useState<number>(0) // Progress of the video
  const [duration, setDuration] = useState<number>(0) // Duration of the video in milliseconds

  function isAVPlaybackStatusSuccess(status: AVPlaybackStatus): status is AVPlaybackStatusSuccess {
    return "isLoaded" in status && status.isLoaded && !("error" in status)
  }
  // Update progress and duration based on status changes
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
    <View style={styles.videoColorContainer}>
      <View style={styles.videoControlButton}>
        <Video
          ref={videoRef}
          style={styles.videoPlayer}
          source={{ uri }}
          useNativeControls={true}
          onPlaybackStatusUpdate={setStatus as (status: AVPlaybackStatus) => void}
        />
        <View style={styles.videoTimeContainer}>
          <Text style={styles.videoTimeText}>
            {formatTime((status?.positionMillis ?? 0) / 1000)}
          </Text>
          <Slider
            style={styles.videoSlider}
            maximumTrackTintColor={styles.videoSlider.maximumTrackTintColor as string}
            minimumTrackTintColor={styles.videoSlider.minimumTrackTintColor as string}
            thumbTintColor={styles.videoSlider.thumbTintColor as string}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onSlidingComplete={handleSliderValueChange}
          />
          <Text style={styles.videoTimeText}>{formatTime(duration / 1000)}</Text>
        </View>
        <View style={styles.videoControlsContainer}>
          <TouchableOpacity onPress={() => handleSeek(-15000)}>
            <Rewind color={styles.videoControls.iconColor as string} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            {isPlaying() ? (
              <Pause color={styles.videoControls.iconColor as string} width={30} height={30} />
            ) : (
              <Play color={styles.videoControls.iconColor as string} width={30} height={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSeek(15000)}>
            <Forward color={styles.videoControls.iconColor as string} width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})
