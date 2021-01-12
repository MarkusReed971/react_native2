import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Info from "./Info";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const Allowance = ({allowance}) => {
    return(
        <View style={styles.card}>
            <Text style={styles.h1}>{allowance.sro}</Text>

                {allowance.status_member === 'Является членом' ? (
                    <View style={styles.statusBox}>
                        <Icon style={styles.icon} name={'check'} size={20} color="green"  />
                        <Text style={styles.green}>Состоит в СРО</Text>
                    </View>
                ) : (
                    <View style={styles.statusBox}>
                        <Icon style={styles.icon} name={'minus'} size={20} color="red"  />
                        <Text style={styles.red}>Исключен</Text>
                    </View>
                    )}


            <Info attribute={'Регистрационный номер'} value={allowance.reg_numb} />
            <Info attribute={'Дата регистрации'} value={allowance.date_reg} />
            <Info attribute={'Контактный телефон'} value={allowance.phone} />
            <Info attribute={'Сумма взноса'} value={allowance.vznos} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        borderWidth: 1,
    },
    h1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusBox: {
        flexDirection: 'row',
        marginTop: 10,
    },
    icon: {
        marginTop: -1,
        marginRight: 10,
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    },

})

export default Allowance;
