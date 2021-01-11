import React, {useState} from 'react';
import {ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Keyboard} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import {withContext} from "./Context";
// import {Grid, XAxis, YAxis, BarChart} from "react-native-svg-charts";


const CompanyList = (companyList, navigation, onPressMethod) => companyList.map(company => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPressMethod(company.inn).then(() => navigation.navigate('Company', {headerTitle: company.name}))
            }}
            key={company.inn + company.name}>
            <View style={styles.companyItem}>
                <Text style={styles.companyTitle}>{company.name}</Text>
                <Text style={styles.companyText}><Text style={styles.span}>ИНН: </Text>{company.inn}</Text>
                <Text style={styles.companyText}><Text style={styles.span}>Дата регистрации: </Text>{company.date}</Text>
                <Text style={styles.companyText}><Text style={styles.span}>Адрес: </Text>{company.address}</Text>
            </View>
        </TouchableOpacity>
    )
})

const goToTop = scrollView => {
    scrollView.scrollTo({x: 0, y: 0, animated: true});
}


const CompanyListScreen = ({navigation, context}) => {
    const [companyList, setCompanyList] = useState()
    const [inputText, setInputText] = useState()
    const [scrollView, setScrollView] = useState()

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollBox} ref={(c) => {setScrollView(c)}}>
                { companyList ? CompanyList(companyList, navigation, context.getCompanyAsync) : null}
            </ScrollView>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setInputText(text)}
                    value={inputText}
                    placeholder={'Введите название или инн'}
                />
                <TouchableOpacity onPress={() => {
                    context.getCompanyListAsync(inputText)
                    context.getCompanyListAsync(inputText).then(res => setCompanyList(res))
                    goToTop(scrollView)
                    Keyboard.dismiss()
                }}>
                    <View style={styles.button}><Text style={styles.buttonText}>Найти</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        // textTransform: 'uppercase',
        fontSize: 18,
        lineHeight: 34,
    },
    scrollBox: {
        marginBottom: 10,
        // minHeight: Dimensions.get('window').height - 175,
    },
    companyText: {
        color: '#b3b3b3',
    },
    companyTitle: {
        fontSize: 20,
    },
    span: {
        color: Colors.black,
        textTransform: 'uppercase',
    },
    companyItem: {
        backgroundColor: Colors.white,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
    },
    inputBox: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: Colors.white,
        height: 60,
    },
    searchInput: {
        width: '80%',
        backgroundColor: Colors.light,
        // borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        // textTransform: 'uppercase',
        lineHeight: 34,
        fontSize: 18,
    }
})

export default withContext(CompanyListScreen);
