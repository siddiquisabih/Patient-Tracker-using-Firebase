import React, { Component } from 'react'
import { Text,StatusBar, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, List, ListItem } from 'native-base';


class ViewPatient extends Component {
    static navigationOptions = {
        title : "Details",
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'blue'},
    }

componentWillMount() {
    console.disableYellowBox= true
}

    

    render() {
        return (
            <Container>
                    <StatusBar backgroundColor="black"/>

                <Container
                    style={{ backgroundColor: "#455A64" }}
                >

                    <Text style={styles.text}> Name : {this.props.navigation.state.params.name} </Text>
                    <Text style={styles.text}> Disease : {this.props.navigation.state.params.disease} </Text>
                    <Text style={styles.text}> Medication Provided : {this.props.navigation.state.params.medication} </Text>
                    <Text style={styles.text}> Cost : {this.props.navigation.state.params.cost} </Text>
                    <Text style={styles.text}> Date : {this.props.navigation.state.params.date} </Text>

                </Container>
            </Container>
        )
    }
}
export default ViewPatient

const styles = {
    text: {
        paddingTop: 20,
        fontSize: 16,
        color: "black"
    }
}


