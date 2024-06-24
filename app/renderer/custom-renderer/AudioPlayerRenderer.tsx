import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import Slider from "@react-native-community/slider"
import { Text } from "app/components/Text" // Assuming you have this component
import type { GuideStylesDictionary } from "app/services/guide-builder/types/data-types"
import { Audio } from "expo-av"
import { Forward, Pause, Play, Rewind } from "iconoir-react-native"
import { observer } from "mobx-react-lite"

export interface AudioPlayerProps {
  uri: string
  styles: GuideStylesDictionary
}

export const AudioPlayerRenderer = observer(function AudioPlayer({
  styles,
  uri,
}: AudioPlayerProps) {
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
    if (!sound) return
    const interval = setInterval(async () => {
      const status = await sound.getStatusAsync()
      if ("positionMillis" in status && "durationMillis" in status) {
        setProgress(status.positionMillis)
        setDuration(status.durationMillis || 0)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound, isPlaying])

  const formatTime = (millis: number): string => {
    const minutes = Math.floor(millis / 60000)
    const seconds = (millis % 60000) / 1000
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed(0)}`
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

  // console.log(styles)

  return (
    <View style={styles.audioPaddingContainer}>
      <View style={styles.audioColorContainer}>
        <View style={styles.audioTimeContainer}>
          <Text style={styles.audioTimeText}>{formatTime(progress)}</Text>
          <Slider
            style={styles.audioSlider}
            maximumTrackTintColor={styles.audioSlider.maximumTrackTintColor as string}
            minimumTrackTintColor={styles.audioSlider.minimumTrackTintColor as string}
            thumbTintColor={styles.audioSlider.thumbTintColor as string}
            minimumValue={0}
            maximumValue={1}
            value={duration > 0 ? progress / duration : 0}
            onSlidingComplete={handleSliderValueChange}
            disabled={!sound}
          />
          <Text style={styles.audioTimeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.audioControlsContainer}>
          <TouchableOpacity onPress={skipBackwards}>
            <Rewind color={styles.audioControls.iconColor as string} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            {isPlaying ? (
              <Pause color={styles.audioControls.iconColor as string} width={30} height={30} />
            ) : (
              <Play color={styles.audioControls.iconColor as string} width={30} height={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForwards}>
            <Forward color={styles.audioControls.iconColor as string} width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})
