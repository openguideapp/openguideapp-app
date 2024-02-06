import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"

export const customRenderers = {
  button: ({ tnode }: any) => {
    const { path } = tnode.attributes
    const navigation = useNavigation()

    const handlePress = () => {
      console.log("inside customrender button path", path)

      navigation.push("GuidePage", {
        path: "home.md",
      })

      //   navigation.push("GuidePage", { params: { path } })
    }
    return <Button title="Button Title" onPress={handlePress} />
  },
}
