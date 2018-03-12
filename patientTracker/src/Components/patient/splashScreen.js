import React, { Component } from 'react'
import { Image, AsyncStorage } from 'react-native'
import { Container, Spinner } from "native-base"
import Midware from "../../Store/Middleware/patientMiddleware"
import { connect } from "react-redux"



function mapStateToProps(state) {
    return {
        authError: state.Reducer.userAuthError,
        userAuthentic: state.Reducer.userAuthentic
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAuth: () => {
            dispatch(Midware.checkingForAuthentication())
        }
    }
}


class Splash extends Component {

    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            error: false,
            validUser: false,
        }
    }


    componentWillReceiveProps(prop) {
        if (prop.authError) {
            this.setState({ error: true })
        }

        if (prop.userAuthentic) {
            this.setState({ validUser: true })
        }
    }


    componentWillMount() {
        if (this.props.userAuthentic) {
            this.props.navigation.navigate("DrawerRoute")
        }

        this.props.checkAuth()
        setTimeout(() => { this.navigateUser() }, 1000)

        console.disableYellowBox = true
    }



    navigateUser() {
        if (this.state.error) {
            this.props.navigation.navigate("LoginRoute")
        }

        if (this.state.validUser) {
            this.props.navigation.navigate("DrawerRoute")
        }
    }


    render() {
        return (
                <Image
                    source={require("../../images/stethoscope.jpg")}
                    style={styles.imageBackground}
                >
                    <Container style={styles.spinner} >
                        
                <Spinner
                            color="red"
                        />

                    </Container>
                </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = {
    imageBackground: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    spinner: {
        justifyContent: "center"
    }
}