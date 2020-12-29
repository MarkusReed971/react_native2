import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Info from "./Info";


const formatDate = dateStr => dateStr.split('-').reverse().join('.')

const formatCategory = category => {
    switch (category) {
        case 'MICRO':
            return 'Микро'
        case 'SMALL':
            return 'Малая'
        case 'MEDIUM':
            return 'Средняя'
        default:
            return 'Не определено'
    }
}

const formatStatus = status => {
    switch (status) {
        case 'ACTIVE':
            return (<View style={styles.statusBox}>
                        <Icon style={styles.icon} name={'check'} size={20} color="green"  />
                        <Text style={styles.green}>Активно</Text>
                    </View>)
        case 'LIQUIDATING':
            return (<View style={styles.statusBox}>
                <Icon style={styles.icon} name={'fire-alt'} size={20} color="yellow"  />
                <Text style={styles.yellow}>Ликвидируется</Text>
            </View>)
        case 'LIQUIDATED':
            return (<View style={styles.statusBox}>
                <Icon style={styles.icon} name={'cross'} size={20} color="red"  />
                <Text style={styles.red}>Ликвидировано</Text>
            </View>)
        case 'REORGANIZING':
            return (<View style={styles.statusBox}>
                <Icon style={styles.icon} name={'edit'} size={20} color="yellow"  />
                <Text style={styles.yellow}>Реорганизация</Text>
            </View>)
    }
}

const formatOKVED = okveds => okveds.map(okved => <Info key={okved.code} attribute={okved.code} value={okved.name} />)

const InformationScreen = ({navigation, context}) => {
    const basicInfo = context.company.basic_information;

    return (
        <View>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.h1}>Информация о юрлице</Text>
                    {formatStatus(basicInfo.status_organisation)}
                    <Info attribute={'Наименование'} value={basicInfo.name_org.full_with_opf} />
                    <Info attribute={'ИНН'} value={basicInfo.inn} />
                    <Info attribute={'ОГРН'} value={basicInfo.ogrn} />
                    <Info attribute={'КПП'} value={basicInfo.kpp} />
                    <Info attribute={'Дата регистрации'} value={formatDate(basicInfo.registration_date)} />
                    <Info attribute={'Категория'} value={formatCategory(basicInfo.category_bizness)} />
                    <Info attribute={'Юридический адрес'} value={basicInfo.yur_address_egrul} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.h1}>ОКВЭД</Text>
                    {basicInfo.okveds ? formatOKVED(basicInfo.okveds) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
    status: {
        color: 'green'
    },
    card: {
        margin: 10,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 5,
    },
    scrollView: {
        marginBottom: 50,
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    },
    yellow: {
        color: 'yellow'
    },
})

export default withContext(InformationScreen);
