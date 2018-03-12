import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMiddleware"


function mapStateToProps(State) {
    return {
        logoutState: State.Reducer.logout
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => {
            dispatch(Midware.LogoutUser())
        }
    }
}


class Logout extends Component {

    componentWillReceiveProps(prop) {
        if(prop.logoutState){
            this.props.navigation.navigate("LoginRoute")
        }
    }

    componentWillMount() {
        this.props.userLogout()

        console.disableYellowBox = true
    }


    static navigationOptions = {
        title: "Logout",
        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }

    render() {
        return (
            <Container>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout) 