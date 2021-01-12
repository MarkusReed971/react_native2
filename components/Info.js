import React from "react";
import {Text, View, StyleSheet} from "react-native";

const Info = ({attribute, value}) => {
    return(
        <View style={styles.info}>
            <Text style={styles.value}><Text style={styles.attribute}>{attribute + ': '}</Text>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        marginVertical: 10,
    },
    attribute: {
        // textTransform: 'uppercase',
        // color: '#b3b3b3',
        color: '#fa8128',
    },
    value: {
        fontSize: 16,
    },
})

export default Info;
