import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Info from "./Info";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const FoundersScreen = ({navigation, context}) => {
    const founderList = context.company.founder_list;
    const FounderList = founderList => founderList.map(founder =>
        <View key={founder.inn} style={styles.card}>
            <Info attribute={'Название'} value={founder.name ? founder.name : 'нет данных'}/>
            <Info attribute={'ИНН'} value={founder.inn ? founder.inn : 'нет данных'}/>
            <Info attribute={'ОГРН'} value={founder.ogrn ? founder.ogrn : 'нет данных'}/>
        </View>)

    return (
        <View>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                { founderList[0] ? FounderList(founderList) : <Text style={{textAlign: 'center'}}>Информация отсутствует</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: Colors.white,
        padding: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    scrollView: {
        marginBottom: 50,
    },
})

export default withContext(FoundersScreen);
