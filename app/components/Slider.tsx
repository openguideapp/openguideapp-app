import * as React from "react"
import React, { ReactNode, useState } from "react"
import {
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  View,
  ViewStyle,
} from "react-native"
import { Text } from "app/components/Text"
import { colors, typography } from "app/theme"
import { observer } from "mobx-react-lite"

export interface SliderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: ReactNode
  sliderWidth?: number
}

const defaultWidth = Dimensions.get("window").width

export const Slider = observer(function Slider(props: SliderProps) {
  const { style } = props
  const $styles = [$container, style]
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = React.Children.count(children)

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / sliderWidth)
    setActiveIndex(currentIndex)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={{ width: sliderWidth }}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            style: [{ width: sliderWidth }, child.props.style],
          }),
        )}
      </ScrollView>
      <View style={styles.dotView}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <Text key={index} style={[styles.dot, index === activeIndex ? styles.activeDot : null]}>
            •
          </Text>
        ))}
      </View>
      {totalSlides > 1 && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPress={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPress={() => setActiveIndex(Math.min(totalSlides - 1, activeIndex + 1))}
          >
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  activeDot: {
    color: "#fff",
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 10,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -15 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  container: {
    position: "relative",
  },
  dot: {
    color: "#888",
    margin: 3,
  },
  dotView: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
})

export default Slider

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
