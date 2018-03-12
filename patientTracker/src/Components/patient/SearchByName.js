import React, { Component } from 'react';
import { Container, Content, Button, Header, Text, Input, Toast, Icon, Item, List, ListItem, Left, Body, Right, Title, Card, CardItem } from "native-base"
import Midware from "../../Store/Middleware/patientMiddleware"
import { connect } from "react-redux"
import { StatusBar } from "react-native"


const mapStateToProps = (state) => {
    return {
        componentState: state,
        data: state.Reducer.getPatientByNameData,
        isEmpty: state.Reducer.dataEmpty,
        allPatientData: state.Reducer.getAllPatientsData,
        allPatient: state.Reducer.getAllPatients
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        getData: (name) => {
            dispatch(Midware.getPatientByNameFromDataBase(name))
        }
    }
}


class SearchByName extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            showToast: false,
            Patients: [],
            error: false
        }
    }


    componentWillMount() {

        if (this.props.allPatient) {
            this.setState({ Patients: this.props.allPatientData })

        }

        console.disableYellowBox = true

    }

    componentWillReceiveProps(prop) {

        if (!prop.isEmpty) {
            this.setState({ Patients: prop.data, error: false })
        }

        if (prop.isEmpty) {
            this.setState({ Patients: [], error: true })
        }

    }

    static navigationOptions = {
        header: false,
        title: "Search By Name",
        drawerIcon: () => {
            return (
                <Icon name="ios-search" />
            )
        }
    }

    getDataByName() {
        let name = this.state.name
        if (name !== '') {
            this.props.getData(name)
        }

        else {
            Toast.show({
                text: 'Enter Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 2000,
            })

        }


    }

    handleError() {
        if (this.state.Patients[0] === undefined) {
            return (
                <Container style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#455A64" }}>
                    <Text style={{ color: "white" }}>No Record</Text>

                </Container>
            )
        }
    }




    renderData() {
        return <Content>
            {
                this.state.Patients.map((m, v) => {
                    return (
                        <Card
                            key={v}
                        >
                            <CardItem
                                style={{ backgroundColor: "#004D40" }}
                            >
                                <Left>
                                    <Text
                                        style={{ color: "#03A9F4" }}
                                    >
                                        {m.name}
                                    </Text>
                                </Left>
                                <Text
                                    style={{ color: "#03A9F4" }}
                                >
                                    {m.date}
                                </Text>

                                <Right>
                                    <Button transparent
                                        onPress={() => { this.props.navigation.navigate("ViewPatientRoute", { name: m.name, cost: m.cost, medication: m.medication, date: m.date, disease: m.disease }) }}>
                                        <Text
                                            style={{ color: "yellow" }}
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
        console.log(this.props)
        return (

            <Container>
                <Header searchBar rounded style={{ backgroundColor: "blue" }}>
                    <StatusBar
                        backgroundColor="black"
                    />
                    <Item>
                        <Button
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name='menu' />
                        </Button>
                        <Icon name="ios-people" />
                        <Input placeholder="Search By Name"
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />
                        <Icon name="ios-search" />
                        <Button onPress={this.getDataByName.bind(this)}
                        >
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>
                {this.handleError()}
                <Container style={{ backgroundColor: "#455A64" }}>

                    {this.renderData()}

                </Container>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchByName)