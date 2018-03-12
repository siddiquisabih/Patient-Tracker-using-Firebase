import React, { Component } from 'react';
import { Container, Content, Button, Header, Text, Input, Icon, Item, List, ListItem, Toast, Card, CardItem, Left, Right, Body } from "native-base"
import DatePicker from "react-native-datepicker"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMiddleware"
import { StatusBar, Dimensions, View } from "react-native"

const mapStateToProps = (state) => {
    return {
        componentState: state,
        patientData: state.Reducer.getPatientDataByDate,
        getPatient: state.Reducer.getPatientByDate,
        isEmpty: state.Reducer.dataEmpty,
        allPatientData: state.Reducer.getAllPatientsData,
        allPatient: state.Reducer.getAllPatients,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getPatient: (date) => {
            dispatch(Midware.getPatientByDateFromDataBase(date))
        }
    }
}


class SearchByDate extends Component {
    static navigationOptions = {
        header: false,
        title: "Search By Date",
        drawerIcon: () => {
            return (
                <Icon name="ios-calendar" />
            )
        }
    }
    constructor() {
        super()
        this.state = {
            date: '',
            Patients: [],
            error: false,
            showToast: false,

        }
    }


    search() {
        let date = this.state.date
        if (date !== '') {
            this.props.getPatient(date)
        }
        else {
            Toast.show({
                text: 'Select Date',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 2000,
            })

        }

    }



    componentWillMount() {

        if (this.props.allPatient) {
            this.setState({ Patients: this.props.allPatientData })

        }
        console.disableYellowBox = true
        // console.log("all data" , this.props.allPatientData)

    }


    componentWillReceiveProps(prop) {

        if (!prop.isEmpty) {
            this.setState({ Patients: prop.patientData, error: false })
        }

        if (prop.isEmpty) {
            this.setState({ Patients: [], error: true })
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
                                style={{ backgroundColor: "#263238" }}
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
        return (
            <Container>
                < Header  rounded style={{ backgroundColor: "blue" }}>
                    <StatusBar backgroundColor="black" />


                    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>

                        <Button
                        style={{backgroundColor : "blue"}}
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name='menu' />
                        </Button>


<Item style={{justifyContent : "center"}} >



<DatePicker
style={{width : Dimensions.get('window').width /2    , backgroundColor : "white"}}
        date={this.state.date}
        mode="date"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        minDate="2017-05-01"
        maxDate="2019-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
        }}
        onDateChange={(date) => { this.setState({ date: date }) }}
    />





</Item>


<Button
style={{backgroundColor : "blue" }}
        onPress={this.search.bind(this)}>
        <Text style={{ alignItems : "center"}} >
            Search
</Text>
    </Button>





</View>







                </Header>
                {this.handleError()}

                <Container style={{ backgroundColor: "#455A64" }}>

                    {this.renderData()}


                </Container>




            </Container>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchByDate)





















// < Header searchBar rounded style={{ backgroundColor: "blue" }}>
// <StatusBar
//     backgroundColor="black"
// />
// <Item>



//     <Button
//         onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
//         <Icon name='menu' />
//     </Button>



//     <DatePicker
//         date={this.state.date}
//         mode="date"
//         placeholder="Search Patient By Date"
//         format="YYYY-MM-DD"
//         minDate="2017-05-01"
//         maxDate="2019-06-01"
//         confirmBtnText="Confirm"
//         cancelBtnText="Cancel"
//         customStyles={{
//             dateIcon: {
//                 position: 'absolute',
//                 left: 0,
//                 top: 4,
//                 marginLeft: 0
//             },
//         }}
//         onDateChange={(date) => { this.setState({ date: date }) }}
//     />




//     <Button
//         onPress={this.search.bind(this)}>
//         <Text>
//             Search
// </Text>
//     </Button>
// </Item>
// </Header>