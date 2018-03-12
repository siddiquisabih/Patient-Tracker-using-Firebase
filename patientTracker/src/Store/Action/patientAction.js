class Action {

    static signup = "signup"
    static login = "login"
    static dataEntry = "dataEntry"
    static getPatient = "getpatient"
    static getBYDate = "getBYDate"
    static loginError = "loginError"
    static signupError = "signupError"
    static getByName = "getbyname"
    static emptyData = "emptyData"
    static authentic = "authentic"
    static authenticError = "authenticError"
    static logout = "logout"





    static userSignup() {
        return {
            type: Action.signup
        }
    }

    static signupErrorAction(error) {
        return {
            type: Action.signupError,
            errorMessage: error
        }
    }




    static userLogin() {
        return {
            type: Action.login
        }
    }

    static loginErrorAction(error) {
        return {
            type: Action.loginError,
            errorMessage: error
        }

    }



    static DataEnter() {
        return {
            type: Action.dataEntry

        }
    }



    static getAllPatient(value) {
        return {
            type: Action.getPatient,
            data: value
        }
    }


    static getPatientByDate(value) {
        return {
            type: Action.getBYDate,
            data: value
        }

    }

    static getPatientByName(value) {
        return {
            type: Action.getByName,
            data: value
        }
    }


    static userAuthentic(value) {
        return {
            type: Action.authentic,
            data: value
        }
    }


    static userAuthenticError() {
        return {
            type: Action.authenticError
        }
    }


    static noData() {
        return {
            type: Action.emptyData
        }
    }


    static userLogout(){
        return {
            type : Action.logout
        }
    }


}
export default Action