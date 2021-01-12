import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import {useRoute} from '@react-navigation/native';

const tabList = [
    {
        title: 'Основное',
        screenName: 'Information',
    },
    {
        title: 'Финансы',
        screenName: 'Finances',
    },
    {
        title: 'Учредители',
        screenName: 'Founders',
    },
    {
        title: 'Лицензии',
        screenName: 'Licenses',
    },
    {
        title: 'Госзакупки',
        screenName: 'Purchases',
    },
    {
        title: 'Допуски СРО',
        screenName: 'Allowances',
    },
    {
        title: 'Суды',
        screenName: 'Trials',
    },
    {
        title: 'Скачать',
        screenName: 'Download',
    },

]


const TabList = (tabList, navigation, routeName) => tabList.map(tab =>
    <TouchableOpacity key={tab.screenName + tab.title} onPress={() => navigation.navigate(tab.screenName)}>
        <View style={routeName !== tab.screenName ? styles.tab : styles.selectTab}>
            <Text style={styles.tabText}>{tab.title}</Text>
        </View>
    </TouchableOpacity>)


const TabBar = ({navigation}) => {
    const route = useRoute();

    return (
        <ScrollView style={styles.tabBox} horizontal={true} showsHorizontalScrollIndicator={false}>
            {TabList(tabList, navigation, route.name)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tabBox: {
        backgroundColor: '#333',
        padding: 5,
    },
    tab: {
        padding: 10,
        backgroundColor: Colors.white,
        marginRight: 10,
        borderRadius: 50,
        marginBottom: 5,
    },
    selectTab: {
        padding: 10,
        backgroundColor: '#fa8128',
        marginRight: 10,
        borderRadius: 50,
        marginBottom: 5,
    },
    tabText: {
        textTransform: 'uppercase',
    },
})

export default TabBar;
