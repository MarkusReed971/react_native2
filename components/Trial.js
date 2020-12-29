import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Info from "./Info";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const Trial = ({trial}) => {
    return(
        <View style={styles.card}>
            <Text style={styles.h1}>{'Дело №' + trial.name_delo}</Text>
            <Info attribute={'Дата'} value={trial.date_delo} />
            <Info attribute={'Истцы'} value={trial.plaintiff.join("\r\n\n")} />
            <Info attribute={'Ответчики'} value={trial.respondent} />
        </View>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        margin: 10,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 5,
    },
})

export default Trial;
