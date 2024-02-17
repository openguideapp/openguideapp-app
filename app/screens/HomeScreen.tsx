import React, { ComponentType, FC, useEffect, useMemo } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  Animated,
  ImageSourcePropType,
  ImageStyle,
  Modal,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { ContentStyle } from "@shopify/flash-list"
import {
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  Image,
  ListView,
  Screen,
  Text,
  Toggle,
} from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { GuideListing, useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
// import { isRTL } from "expo-localization"
// import { translate } from "i18n-js"
import { observer } from "mobx-react-lite"

import { isRTL, translate } from "../i18n"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { guideListingStore } = useStores()
  // const [guideUrl, setGuideUrl] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  // const [isError, setIsError] = React.useState(false)

  const [refreshing, setRefreshing] = React.useState(false)

  // const { navigation } = _props

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await guideListingStore.fetchGuideListings()
      setIsLoading(false)
    })()
  }, [guideListingStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([guideListingStore.fetchGuideListings(), delay(750)])
    setRefreshing(false)
  }

  // useEffect(() => {
  //   const fetchGuide = async () => {
  //     setGuideUrl("")
  //     setIsError
  //     setIsLoading(true)
  //     try {
  //       await guideStore.fetchGuide()
  //     } catch (error) {
  //       setIsError(true)
  //     }
  //     setIsLoading(false)

  //     navigation.replace("GuideTabNavigator", {
  //       screen: "GuidePageStackNavigator",
  //       params: {
  //         screen: "GuidePage",
  //         params: {
  //           path: "home.md",
  //         },
  //       },
  //     })
  //   }
  //   if (guideUrl !== "") {
  //     fetchGuide()
  //   }
  // }, [guideUrl])

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ListView<GuideListing>
        contentContainerStyle={$listContentContainer}
        data={guideListingStore.guideListingsForList.slice()}
        extraData={guideListingStore.favorites.length + guideListingStore.guideListings.length}
        refreshing={refreshing}
        estimatedItemSize={177}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={
                guideListingStore.favoritesOnly
                  ? "demoPodcastListScreen.noFavoritesEmptyState.heading"
                  : undefined
              }
              contentTx={
                guideListingStore.favoritesOnly
                  ? "demoPodcastListScreen.noFavoritesEmptyState.content"
                  : undefined
              }
              button={guideListingStore.favoritesOnly ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoPodcastListScreen.title" />
            {(guideListingStore.favoritesOnly ||
              guideListingStore.guideListingsForList.length > 0) && (
              <View style={$toggle}>
                <Toggle
                  value={guideListingStore.favoritesOnly}
                  onValueChange={() =>
                    guideListingStore.setProp("favoritesOnly", !guideListingStore.favoritesOnly)
                  }
                  variant="switch"
                  labelTx="demoPodcastListScreen.onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <GuideListingCard
            guideListing={item}
            isFavorite={guideListingStore.hasFavorite(item)}
            onPressFavorite={() => guideListingStore.toggleFavorite(item)}
          />
        )}
      />
    </Screen>
  )
})

const GuideListingCard = observer(function GuideListingCard({
  guideListing,
  isFavorite,
  onPressFavorite,
}: {
  guideListing: GuideListing
  onPressFavorite: () => void
  isFavorite: boolean
}) {
  const liked = useSharedValue(isFavorite ? 1 : 0)

  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

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
  const accessibilityHintProps = useMemo(
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

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
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
      content={<Image source={imageUri} style={$itemThumbnail} />}
      // `${guideListing.title} - ${guideListing.description}`}
      // {...accessibilityHintProps}
      RightComponent={<Image source={imageUri} style={$itemThumbnail} />}
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

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.sm,
}

const $metadata: TextStyle = {
  color: colors.textDim,
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

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion
