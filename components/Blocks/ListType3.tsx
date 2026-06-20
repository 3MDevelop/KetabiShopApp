import { View, StyleSheet, ScrollView } from "react-native";
import CustomText from "@/components/common/CustomText";

export default function ListType3() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <CustomText>
                    Sample Text 4
                </CustomText>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        width: "100%",
        maxWidth: 950,
        paddingHorizontal: 12
    }
})