import Action from "../Action/patientAction"


const initialState = {
    signup: false,
    login: false,
    logout: false,
    dataAdded: false,
    getAllPatients: false,
    getAllPatientsData: [],
    getPatientByDate: false,
    getPatientDataByDate: [],
    loginError: false,
    loginErrorMessage: '',
    signupError: false,
    signupErrorMessage: '',
    getPatientByName: false,
    getPatientByNameData: [],
    dataEmpty: true,
    userUid: "",
    userAuthentic: false,
    userAuthError: false,
}


function Reducer(state = initialState, action) {
    switch (action.type) {
        case Action.signup:
            return Object.assign({}, state, { signup: true })

        case Action.signupError:
            return Object.assign({}, state, { signupError: true, signupErrorMessage: action.errorMessage })

        case Action.login:
            return Object.assign({}, state, { login: true })

        case Action.loginError:
            return Object.assign({}, state, { loginError: true, loginErrorMessage: action.errorMessage })

        case Action.logout:
            return Object.assign({}, state, {
                logout: true, signup: false, login: false, dataAdded: false, getAllPatients: false, getAllPatientsData: [],
                getPatientByDate: false, getPatientDataByDate: [], loginError: false, loginErrorMessage: '', signupError: false, signupErrorMessage: '',
                getPatientByName: false, getPatientByNameData: [], dataEmpty: true, userUid: "", userAuthentic: false,
                userAuthError: false,
            })

        case Action.dataEntry:
            return Object.assign({}, state, { dataAdded: true })

        case Action.getPatient:
            return Object.assign({}, state, { getAllPatients: true, getAllPatientsData: action.data })

        case Action.getBYDate:
            return Object.assign({}, state, { getPatientByDate: true, getPatientDataByDate: action.data, dataEmpty: false })

        case Action.getByName:
            return Object.assign({}, state, { getPatientByName: true, dataEmpty: false, getPatientByNameData: action.data })

        case Action.emptyData:
            return Object.assign({}, state, {
                dataEmpty: true, getPatientByName: false, getPatientByNameData: [], getSpecificPatientByDate: false,
                getSpecificPatientDataByDate: []
            })

        case Action.authentic:
            return Object.assign({}, state, { userUid: action.data, userAuthentic: true })

        case Action.authenticError:
            return Object.assign({}, state, { userAuthError: true })


        default:
            return state;
    }
};

export default Reducer