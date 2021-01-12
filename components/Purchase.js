import React from "react";
import {View, StyleSheet} from "react-native";
import Info from "./Info";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const Purchase = ({purchase}) => {
    return(
        <View style={styles.purchase}>
            {/*<Text style={styles.h2}>Договор №{}</Text>*/}
            <Info attribute={'Предмет договора'} value={purchase.predmet_contract} />
            <Info attribute={'Тип договора'} value={purchase.type_contract_act} />
            <Info attribute={'Сумма договора'} value={purchase.summ_contract + ' руб.'} />
            <Info attribute={'ИНН заказчика'} value={purchase.inn_zakazchik} />
            <Info attribute={'Дата начала'} value={purchase.data_start_contract} />
            <Info attribute={'Дата окончания'} value={purchase.data_end_contract} />
        </View>
    )
}

const styles = StyleSheet.create({
    purchase: {
        backgroundColor: Colors.white,
        padding: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
    },
    h2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})

export default Purchase;
