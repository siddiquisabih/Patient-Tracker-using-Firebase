import React, { Component } from 'react';
import { Button, Container, Content, Text, Header, Icon, Left, Right, Body, Title, List, ListItem, Spinner, Card, CardItem } from "native-base"
import { connect } from "react-redux"
import Midware from "../../../src/Store/Middleware/patientMiddleware"
import { NavigationActions } from "react-navigation"
import { StatusBar , BackHandler } from "react-native"


const mapStateToProps = (state) => {
    return {
        componentState: state,
        allPatientData: state.Reducer.getAllPatientsData,
        getPatient: state.Reducer.getAllPatients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => {
            dispatch(Midware.getAllPatientsFromDataBase())
        }
    }
}



class AllPatients extends Component {
    static navigationOptions = {
        header: false,
        title: "View Patients",
        drawerIcon: () => {
            return (
                <Icon name="ios-people" />
            )
        }
    }

    constructor() {
        super()
        this.state = {
            error: true
        }
    }

    componentWillMount() {
        this.props.getData()
        console.disableYellowBox = true
    }

   

    componentWillReceiveProps(prop) {
        if (prop.getPatient) {
            this.setState({ error: false })
        }
    }


    handleError() {
        if (this.state.error) {
            return (
                <Container style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#455A64" }}>
                    <Text style={{ color: "white" }}>No Record</Text>

                </Container>
            )
        }
    }


    getPatient() {
        this.props.getData()
    }

    renderData() {
        if (this.props.getPatient === false) {
            return <Spinner />

        }
        return <Content style={{ backgroundColor: "#455A64" }} >
            {
                this.props.allPatientData.map((m, v) => {
                    return (

                        <Card
                            key={v}
                        >
                            <CardItem
                                style={{ backgroundColor: "black" }}
                            >
                                <Left>
                                    <Text
                                        style={{ color: "#d50000" }}
                                    >
                                        {m.name}
                                    </Text>
                                </Left>
                                <Text
                                    style={{ color: "#d50000" }}
                                >
                                    {m.date}
                                </Text>

                                <Right>
                                    <Button transparent
                                        onPress={() => { this.props.navigation.navigate("ViewPatientRoute", { name: m.name, cost: m.cost, medication: m.medication, date: m.date, disease: m.disease }) }}>
                                        <Text
                                            style={{ color: "#1B5E20" }}
                                        >View</Text></Button>
                                </Right>
                            </CardItem>
                        </Card>
                    )
                })


            }
        </Content>
    }




    render() {
        return (

            <Container>
                <Header style={{ backgroundColor: "blue" }}  >
                    <StatusBar backgroundColor="black"/>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>All Patient</Title>
                    </Body>
                    <Right />
                </Header>
                {this.handleError()}
                <Container style={{ backgroundColor: "#455A64" }}>
                    {this.renderData()}

                </Container>


            </Container>


        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllPatients)