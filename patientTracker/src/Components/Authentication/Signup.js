import React, { Component } from 'react';
import { Container, Header, Icon, Content, Item, Input, Button, Text, Spinner, Left, Body, Right, Title } from 'native-base';
import * as firebase from "firebase"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMiddleware"
import { Image, StatusBar } from 'react-native'


function mapStateToProps(state) {
    return {
        componentState: state,
        signupState: state.Reducer.signup,
        signupError: state.Reducer.signupError,
        signupErrorMessage: state.Reducer.signupErrorMessage,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        usersignup: (data) => {
            dispatch(Midware.signupUser(data))
        }
    }
}





var a = 0;
class Signup extends Component {
    static navigationOptions = {
        title: "Signup",
        header: false,

    }

    constructor() {
        super()
        this.state = {
            email: '',
            pass: '',
            loading: false,
        }
    }
    componentWillReceiveProps(prop) {
        console.log(prop, "orios")
        if (prop.signupState === true && a === 0) {
            prop.navigation.navigate('AllPatientsRoute')
            a = a + 1
        }

        if (prop.signupError) {
            this.setState({ loading: false })
        }

    }

componentWillMount() {
    console.disableYellowBox = true
}




    signupUser() {

        let data = {
            email: this.state.email,
            pass: this.state.pass

        }
        this.props.usersignup(data)
        this.setState({ loading: true })
    }


    ErrorHandle() {
        if (this.props.signupError) {
            return <Text note style={style.errorText}>{this.props.signupErrorMessage}</Text>
        }
    }

    handleSpinner() {
        if (this.state.loading) {
            return <Spinner />
        }
        return <Item style={style.buttonStyle}>
            <Button transparent
                onPress={this.signupUser.bind(this)}>
                <Text>Signup</Text>
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
                        backgroundColor="black"
                    />
                    <Left >
                        <Button transparent onPress={() => this.props.navigation.navigate("LoginRoute")}>

                            <Icon name="arrow-back" />

                        </Button>



                    </Left>
                    <Body>
                        <Title>Authentication</Title>
                    </Body>
                    <Right />
                </Header>

                <Container style={style.containerStyle} >
                    <Content>
                        <Item>
                        <Icon name="ios-person-outline" />
                            <Input placeholder='Name' placeholderTextColor="black"
                            />
                        </Item>
                        <Item>

                        <Icon name="ios-at-outline" />
                            <Input placeholder='Email' placeholderTextColor="black"
                                onChangeText={(text) => { this.setState({ email: text }) }}
                                keyboardType="email-address"

                            />
                        </Item>
                        <Item>
                        <Icon name="ios-lock-outline" />
                            <Input placeholder='Password' placeholderTextColor="black" secureTextEntry
                                onChangeText={(text) => { this.setState({ pass: text }) }}

                            />
                        </Item>

                        {this.handleSpinner()}

                        {this.ErrorHandle()}

                    </Content>
                </Container>
            </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)

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