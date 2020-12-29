import React from 'react';
const DomParser = require('react-native-html-parser').DOMParser
import * as FileSystem from 'expo-file-system';

export const ApiContext = React.createContext({});

export class ApiContextProvider extends React.Component {
    state = {
        URL: 'https://iswork.org/',
        token: 'bd52c001-945a-4eef-8df3-c7643353add9',
        company: null,
        purchaseList223: null,
        purchaseList44_94: null,
        allowanceList: null,
        trialList: null,
        downloadLink: null,
    };


    getCompanyListAsync = async (text) => {
        return await fetch(`${this.state.URL}search/?name_inn=${text}`)
            .then(res => res.text())
            .then(res => {
                if (!text.match(/\d{10}/)) {
                    const doc = new DomParser().parseFromString(res, 'text/html').getElementsByTagName('tr')
                    const companyList = Array.from(doc)
                    companyList.map((value, index) => {
                        const tr = Array.from(value.childNodes)
                        tr.map((value, index) => tr[index] = value.textContent )
                        companyList[index] = {
                            name: tr[0],
                            inn: tr[1],
                            date: tr[2],
                            address: tr[3]
                        }
                    })
                    companyList.shift()
                    return companyList
                } else {
                    const doc = new DomParser().parseFromString(res, 'text/html').getElementsByTagName('table')[1]
                    const tbody = Array.from(doc.childNodes)[2]
                    const tr = Array.from(tbody.childNodes)
                    const companyList = []
                    companyList[0] = {
                        name: tr[1].textContent,
                        inn: Array.from(tr[3].childNodes)[0].textContent,
                        date: Array.from(tr[5].childNodes)[0].textContent,
                        address: tr[13].textContent
                    }
                    return companyList

                }
            })
    }

    getCompanyAsync = async (inn) => {
        await fetch(this.state.URL + 'api/v1/full/get-company/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                inn,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => this.setState({company: res.data[0]}))

        this.getPurchaseList(inn, '223')
            .then(res => this.setState({purchaseList223: res}))
            .then(() => this.getPurchaseList(inn, '44_94'))
            .then(res => this.setState({purchaseList44_94: res}))
            .then(() => this.getAllowanceList(inn))
            .then(res => this.setState({allowanceList: res}))
            .then(() => this.getTrialList(inn))
            .then(res => this.setState({trialList: res}))
            .then(() => this.getDownloadLink(inn))
            .then(res => this.setState({downloadLink: res}))
    }

    getPurchaseList = async (inn, type_query) => {
        return await fetch(this.state.URL + 'api/v1/get-zakupki/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                inn,
                type_query,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => res.status[0].count > 0 ? res.status[1]: null)
    }

    getAllowanceList = async (inn) => {
        return await fetch(this.state.URL + 'api/v1/get-sro/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                inn,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => res.result[0] ? res.result : null)
    }

    getTrialList = async (inn) => {
        return await fetch(this.state.URL + 'api/v1/get-arbitr/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                inn,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => res.result[0][0] ? res.result[0] : null)
    }

    getDownloadLink = async (inn) => {
        return await fetch(this.state.URL + 'api/v1/get-egrul-file/', {
            method: 'post',
            body: JSON.stringify({
                token: this.state.token,
                inn,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => res.link_file)
    }

    downloadEGRUL = async () => {
        FileSystem.downloadAsync(
            this.state.downloadLink,
            FileSystem.documentDirectory + this.state.company.basic_information.inn + '.pdf'
        )
            .then(() => {
                alert('Файл "' + this.state.company.basic_information.inn + '.pdf" успешно скачан' )
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <ApiContext.Provider value={{
                ...this.state,
                getCompanyListAsync: this.getCompanyListAsync,
                getCompanyAsync: this.getCompanyAsync,
                getPurchaseList: this.getPurchaseList,
                getAllowanceList: this.getAllowanceList,
                getTrialList: this.getTrialList,
                getDownloadLink: this.getDownloadLink,
                downloadEGRUL: this.downloadEGRUL,
            }}>
                {this.props.children}
            </ApiContext.Provider>
        );
    }
}

export const withContext = (ChildComponent) => props => (
    <ApiContext.Consumer>
        {context => <ChildComponent {...props} context={context} />}
    </ApiContext.Consumer>
);
