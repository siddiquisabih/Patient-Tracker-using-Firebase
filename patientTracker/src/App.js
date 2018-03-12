import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from "react-redux"
import Store from "../src/Store/index"
import MainRoute from "../src/Navigation/StackNavigator"
import DataEntry from "../src/Components/patient/DataEntry"
import * as firebase from "firebase"
import AllPatient from "../src/Components/patient/AllPatients"
import SearchByDate from "../src/Components/patient/SearchByDate"
import { Root } from "native-base"


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQp06WmfwHZtcfm6Ata18X5_O-Hc-OuF0",
    authDomain: "patient-tracker-5a519.firebaseapp.com",
    databaseURL: "https://patient-tracker-5a519.firebaseio.com",
    projectId: "patient-tracker-5a519",
    storageBucket: "patient-tracker-5a519.appspot.com",
    messagingSenderId: "476880753581"
};
firebase.initializeApp(config);




class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Root>
                    <MainRoute />
                </Root>
            </Provider>

        );
    }
}
export default App
{/* <Tab /> */ }
{/* <DataEntry /> */ }
{/* <AllPatient /> */ }
{/* <SearchByDate /> */ }