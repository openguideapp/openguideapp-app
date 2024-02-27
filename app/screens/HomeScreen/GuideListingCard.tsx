import * as React from "react"
import { useEffect } from "react"
import {
  AccessibilityProps,
  Platform,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
// import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import { Carousel } from "react-native-basic-carousel"
import FastImage from "react-native-fast-image"
import { useSharedValue, withSpring } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { Button, ButtonAccessoryProps, Card, Text } from "app/components"
import { GuideListing, useStores } from "app/models"
import { useComponentSize } from "app/utils/useComponentSize"
import { observer } from "mobx-react-lite"

import { translate } from "../../i18n"
import { colors, spacing } from "../../theme"

export const GuideListingCard = observer(function GuideListingCard({
  guideListing,
  isFavorite,
  onPressFavorite,
}: {
  guideListing: GuideListing
  onPressFavorite: () => void
  isFavorite: boolean
}) {
  const liked = useSharedValue(isFavorite ? 1 : 0)
  const windowWidth = useWindowDimensions().width
  const scrollOffsetValue = useSharedValue<number>(0)
  const [data, setData] = React.useState([...new Array(4).keys()])
  const [isVertical, setIsVertical] = React.useState(false)
  const [isFast, setIsFast] = React.useState(false)
  const [isAutoPlay, setIsAutoPlay] = React.useState(false)
  // const ref = React.useRef<ICarouselInstance>(null)
  const progressValue = useSharedValue<number>(0)
  const { guideStore } = useStores()
  const [guideUrl, setGuideUrl] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const navigation = useNavigation()
  const { userSettings } = useStores()

  //   const imageUri = React.useMemo<ImageSourcePropType>(() => {
  //     return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  //   }, [])

  useEffect(() => {
    const fetchGuide = async () => {
      setGuideUrl("")
      // setIsError
      setIsLoading(true)
      try {
        await guideStore.fetchGuide()
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)

      const lng = userSettings.lng

      navigation.replace("GuideTabNavigator", {
        screen: "GuidePageStackNavigator",
        params: {
          screen: "GuidePage",
          params: {
            // TODO: Check if this part exists!
            path: `content/${lng}/home.md`,
          },
        },
      })
    }
    if (guideUrl !== "") {
      fetchGuide()
    }
  }, [guideUrl])

  // https://reanimated-carousel.dev/Examples/normal
  const Content = () => {
    const { size, onLayout } = useComponentSize()
    const width = size?.width ?? windowWidth * 0.9

    // console.log("isVertical", isVertical)
    // console.log("width", width)

    const baseOptions = isVertical
      ? ({
          vertical: true,
          width,
          height: width / 1.5,
        } as const)
      : ({
          vertical: false,
          width,
          height: width / 1.5,
        } as const)

    return (
      <>
        <View onLayout={onLayout}>
          {/* <Carousel
            {...baseOptions}
            loop
            enabled // Default is true, just for demo
            ref={ref}
            defaultScrollOffsetValue={scrollOffsetValue}
            testID={"xxx"}
            style={{ width: "100%" }}
            autoPlay={isAutoPlay}
            autoPlayInterval={isFast ? 100 : 2000}
            data={guideListing.thumbnails}
            onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
            // onScrollStart={() => {
            //   console.log("===1")
            // }}
            onScrollEnd={() => {
              console.log("===2")
            }}
            // onConfigurePanGesture={(g) => g.enabled(false)}
            pagingEnabled={true}
            onSnapToItem={(index) =>
              console.log("current index:", index, guideListing.thumbnails[index])
            }
            renderItem={({ index }) => (
              <View>
                <FastImage
                  source={{ uri: guideListing.thumbnails[index] }}
                  style={{ width, height: width / 1.5 }}
                  // style={{ width: 290, height: "100%" }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            )}
          />
          <AnimatedDotCarousel
            length={guideListing.thumbnails.length}
            progressValue={progressValue}
            index={0}
            backgroundColor={""}
            colors={["#000", "#000", "#000", "#000"]}
          /> */}

          <Carousel
            data={data}
            renderItem={({ item, index }) => (
              <View>
                <FastImage
                  source={{ uri: guideListing.thumbnails[index] }}
                  style={{ width, height: width / 1.5 }}
                  // style={{ width: 290, height: "100%" }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            )}
            itemWidth={width}
            // onSnapItem={(item) => console.log(item)}
            pagination
            paginationType="circle"
            autoplay
          />

          <Text style={$heading} size="xs">
            {guideListing.title}
          </Text>
          <Text style={$metadataText} size="xs">
            {guideListing.description}
          </Text>
        </View>
      </>
    )
  }

  // Grey heart
  // const animatedLikeButtonStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
  //       },
  //     ],
  //     opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  //   }
  // })

  // Pink heart
  // const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         scale: liked.value,
  //       },
  //     ],
  //     opacity: liked.value,
  //   }
  // })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = React.useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: guideListing.title,
          accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: guideListing.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [guideListing, isFavorite],
  )

  const handlePressFavorite = () => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  const handlePressCard = () => {
    console.log("Card pressed")
    console.log("Setting guideUrl to", guideListing.downloadUrl)
    setGuideUrl(guideListing.downloadUrl)
  }

  const ButtonLeftAccessory: React.ComponentType<ButtonAccessoryProps> = React.useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            {/* <Animated.View
                style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
              >
                <Icon
                  icon="heart"
                  size={ICON_SIZE}
                  color={colors.palette.neutral800} // dark grey
                />
              </Animated.View>
              <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
                <Icon
                  icon="heart"
                  size={ICON_SIZE}
                  color={colors.palette.primary400} // pink
                />
              </Animated.View> */}
          </View>
        )
      },
    [],
  )

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            // accessibilityLabel={episode.datePublished.accessibilityLabel}
          >
            {/* {episode.datePublished.textLabel} */}
            test
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
            // accessibilityLabel={episode.duration.accessibilityLabel}
          >
            {/* {episode.duration.textLabel} */}
            hallo
          </Text>
        </View>
      }
      ContentComponent={Content()}
      // `${guideListing.title} - ${guideListing.description}`}
      // {...accessibilityHintProps}
      // RightComponent={<Image source={imageUri} style={$itemThumbnail} />}
      FooterComponent={
        <Button
          onPress={handlePressFavorite}
          onLongPress={handlePressFavorite}
          style={[$favoriteButton, isFavorite && $unFavoriteButton]}
          accessibilityLabel={
            isFavorite
              ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
              : translate("demoPodcastListScreen.accessibility.favoriteIcon")
          }
          LeftAccessory={ButtonLeftAccessory}
        >
          <Text
            size="xxs"
            // accessibilityLabel={episode.duration.accessibilityLabel}
            weight="medium"
            text={
              isFavorite
                ? translate("demoPodcastListScreen.unfavoriteButton")
                : translate("demoPodcastListScreen.favoriteButton")
            }
          />
        </Button>
      }
    />
  )
})

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $heading: TextStyle = {
  color: colors.text,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}
