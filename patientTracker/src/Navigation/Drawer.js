import { DrawerNavigator } from "react-navigation"

import DataEntry from "../Components/patient/DataEntry"
import AllPatients from "../Components/patient/AllPatients"
import SearchByDate from "../Components/patient/SearchByDate"
import SearchByName from "../Components/patient/SearchByName"
import Logout from "../Components/Authentication/Logout"



Drawer = DrawerNavigator({
    AllPatientsRoute: { screen: AllPatients },
    DataEntryRoute: { screen: DataEntry },
    SearchByDateRoute: { screen: SearchByDate },
    SearchByNameRoute: { screen: SearchByName },
    LogoutRoute: { screen: Logout },

},
    {
        contentOptions: { activeTintColor: "blue" },
    })
export default Drawer