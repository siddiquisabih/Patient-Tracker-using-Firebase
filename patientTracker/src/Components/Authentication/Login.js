import React, { Component } from 'react';
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { Image, StatusBar, BackHandler } from 'react-native'
import * as firebase from "firebase"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMiddleware"


function mapStateToProps(state) {
    return {
        componentState: state,
        loginState: state.Reducer.login,
        loginError: state.Reducer.loginError,
        loginErrorMessage: state.Reducer.loginErrorMessage
    }
}


function mapDispatchToProps(dispatch) {
    return {
        signinuser: (data) => {
            dispatch(Midware.loginUser(data))
        }
    }
}

var a = 0;
class Login extends Component {
    static navigationOptions = {
        title: "Login",
        header: false
    }

    constructor() {
        super()
        this.state = {
            email: '',
            pass: '',
            // email: 's@a.com',
            // pass: "sabihsabih",
            loading: false
        }
    }

    componentWillReceiveProps(prop) {
        if (prop.loginState && a === 0) {
            // prop.navigation.navigate('HomeRoute')
            prop.navigation.navigate('AllPatientsRoute')
            a = a + 1
        }
        if (prop.loginError) {
            this.setState({ loading: false })
            console.log(prop.loginError)
        }
    }


    componentWillMount() {
        console.disableYellowBox = true
        BackHandler.addEventListener('backPress'
            ,
            () => {
                BackHandler.exitApp()
            }
        );

    }


    loginUser() {
        let data = {
            email: this.state.email,
            pass: this.state.pass

        }
        this.props.signinuser(data)
        this.setState({ loading: true })
    }

    ErrorHandle() {
        if (this.props.loginError) {
            return <Text note style={style.errorText}>{this.props.loginErrorMessage}</Text>
        }
    }

    handleSpinner() {
        if (this.state.loading) {
            return <Spinner />
        }


        return <Item style={style.buttonStyle}>

            <Button transparent
                onPress={this.loginUser.bind(this)}
            >
                <Text>Login</Text>

            </Button>
        </Item>



    }

    render() {

        return (
            <Image
                source={require("../../../src/images/main.jpg")}
                style={style.backgroundImage}
            >

                <Header style={{ backgroundColor: "blue" }}  >
                    <StatusBar
                        backgroundColor="black" />
                    <Left />
                    <Body>
                        <Title>Authentication</Title>
                    </Body>
                    <Right />
                </Header>
                <Container style={style.containerStyle}>
                    <Content>
                        <Item >
                        <Icon name="ios-at-outline" />
                            <Input placeholder='Email' placeholderTextColor="black"
                                onChangeText={(text) => { this.setState({ email: text }) }}
                                keyboardType="email-address"
                            />
                        </Item>
                        <Item>
                            <Icon name="ios-lock-outline" />
                            <Input placeholder='Password' secureTextEntry placeholderTextColor="black"
                                onChangeText={(text) => { this.setState({ pass: text }) }}
                            />
                        </Item >
                        {this.handleSpinner()}
                        {this.ErrorHandle()}
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate("SignupRoute") }}
                        >
                            <Text style={{ color: "green" }} >No Account? Create One !</Text>
                        </Button>
                    </Content>
                </Container>
            </Image>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
var style = {
    errorText: {
        color: "red",
        textAlign: "center",

    },
    containerStyle: {
        // flex: 1,        
        justifyContent: 'center',
        marginTop: 200,
        // backgroundColor: "red"
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },


}