import * as React from "react"
import {
  AccessibilityProps,
  ImageSourcePropType,
  Platform,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import FastImage from "react-native-fast-image"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import {
  AutoImage,
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
  Toggle,
} from "app/components"
import { GuideListing } from "app/models"
import { useComponentSize } from "app/utils/useComponentSize"
import { observer } from "mobx-react-lite"

import { isRTL, translate } from "../../i18n"
import { colors, spacing } from "../../theme"

import { AnimatedDotCarousel } from "./AnimatedDotCarousel"

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
  const ref = React.useRef<ICarouselInstance>(null)
  const progressValue = useSharedValue<number>(0)

  //   const imageUri = React.useMemo<ImageSourcePropType>(() => {
  //     return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  //   }, [])

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
          <Carousel
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
    // openLinkInBrowser(guideListing.enclosure.link)
    console.log("Card pressed")
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
