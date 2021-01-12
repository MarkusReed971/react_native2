import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const DownloadScreen = ({navigation, context}) => {
    return (
        <View>
            <TabBar navigation={navigation} />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { context.downloadEGRUL() }}>
                    <View style={styles.button}><Text style={styles.buttonText}>Скачать файл выписки ЕГРЮЛ</Text></View>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        padding: 20,
        minHeight: 670,
    },
    button: {
        backgroundColor: '#fa8128',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
    },
})

export default withContext(DownloadScreen);
