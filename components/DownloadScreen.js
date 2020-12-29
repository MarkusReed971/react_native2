import React from "react";
import {Button, StyleSheet, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";


const DownloadScreen = ({navigation, context}) => {
    return (
        <View>
            <TabBar navigation={navigation} />
            <View style={styles.container}>
                <Button title={'Скачать файл выписки ЕГРЮЛ'} onPress={() => {context.downloadEGRUL()}} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
})

export default withContext(DownloadScreen);
