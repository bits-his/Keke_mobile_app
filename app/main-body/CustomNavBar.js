import { StyleSheet, Text, View } from "react-native"


export default function CustomNavBar() {
    return (
        <View style={styles.container}>
            <Text>
                CustomNavBar
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        height: 60,
        position: "relative",
        marginTop: 440,
        color: "#fff",
        padding: 10,
        borderColor: "gray",
        // borderWidth: 1,
        shadowColor: "gray",
        shadowOffset: { width: 20, height: 40 }, // Adjust to make shadow only on the top
        shadowOpacity: 0.2,
        elevation: 30
    }
})