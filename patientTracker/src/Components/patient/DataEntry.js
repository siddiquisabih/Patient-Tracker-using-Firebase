import React, { Component } from 'react';
import { Container, Content, Button, Form, Text, Input, Label, Item, Header, Icon, Left, Right, Body, Title, Toast } from "native-base"
import DatePicker from "react-native-datepicker"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMiddleware"
import { StatusBar } from "react-native"

const mapStateToProps = (state) => {
    return {
        componentState: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        patientEntry: (data) => {
            dispatch(Midware.dataEntry(data))
        }
    }
}

class DataEntry extends Component {
    static navigationOptions = {
        header: false,
        title: "Add Patient",
        drawerIcon: () => {
            return (
                <Icon name="ios-create" />
            )
        }

    }
    constructor() {
        super()
        this.state = {
            name: '',
            disease: '',
            cost: '',
            date: '',
            medication: '',
            showToast: false,
        }
    }

    componentWillMount() {
        const date = new Date().getDate()
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        if (month <= 8) {
            const newDate = `${year}-0${month + 1}-${date}`
            this.setState({ date: newDate })
            // console.log(newDate)
        }
        if (month >= 9) {
            const newDate = `${year}-${month + 1}-${date}`
            this.setState({ date: newDate })
        }

        console.disableYellowBox = true
    }


    userData() {
        let data = {
            name: this.state.name,
            disease: this.state.disease,
            cost: this.state.cost,
            date: this.state.date,
            medication: this.state.medication
        }
        if (data.name != '' && data.disease != '' && data.date != '' && data.cost != '' && data.medication != '') {
            this.props.patientEntry(data)
            Toast.show({
                text: 'Patient Added',
                position: 'bottom',
                buttonText: 'Okay',
                type: "success",
                duration: 2000,

            })

            this.setState({
                name: '',
                disease: '',
                cost: '',
                medication: '',
            })
        }

        else {
            Toast.show({
                text: 'Fill Missing Data',
                position: 'bottom',
                buttonText: 'Okay',
                type: "warning",
                duration: 2000,
            })
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#455A64" }}>
                <Header style={{ backgroundColor: "blue" }}>
                    <StatusBar
                        backgroundColor="black"
                    />
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Patient</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <Form>

                        <Item floatingLabel>
                            <Icon name="ios-person-outline" />
                            <Label style={styles.label} >Name</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    name: text
                                })}
                                value={this.state.name}
                            />
                        </Item>


                        <Item floatingLabel>
                            <Icon name="ios-aperture-outline" />

                            <Label style={styles.label}>Disease</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    disease: text
                                })}
                                value={this.state.disease}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Icon name="ios-medkit-outline" />

                            <Label style={styles.label}>Medicine</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    medication: text
                                })}
                                value={this.state.medication}

                            />
                        </Item>

                        <Item floatingLabel >
                            <Icon name="logo-usd" />

                            <Label style={styles.label}>Cost</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    cost: text
                                })}
                                value={this.state.cost}
                                keyboardType="phone-pad"

                            />
                        </Item>
                        <Item style={styles.buttonStyle}>
                            <Button
                                rounded
                                dark
                                onPress={this.userData.bind(this)}>
                                <Text>
                                    Save
                                    </Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataEntry)

const styles = {
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },

    label: {
        color: "#ECEFF1"
    }

}