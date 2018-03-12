import { StackNavigator } from "react-navigation"

import Drawer from "./Drawer"
import ViewPatient from "../Components/patient/ViewPatient"
import Login from "../Components/Authentication/Login"
import Signup from "../Components/Authentication/Signup"
import Splash from "../Components/patient/splashScreen"


const MainRoute = StackNavigator({

    SplashRoute: { screen: Splash },

    LoginRoute: { screen: Login },

    DrawerRoute: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    SignupRoute: {
        screen: Signup
    },

    ViewPatientRoute: {
        screen: ViewPatient
    },



})

export default MainRoute