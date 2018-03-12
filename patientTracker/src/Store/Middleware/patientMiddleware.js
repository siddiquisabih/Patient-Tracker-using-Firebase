import Action from "../Action/patientAction"
import * as firebase from "firebase"
import { AsyncStorage } from "react-native"


var uid = ''

class Midware {

    static signupUser(data) {
        return (dispatch) => {
            let email = data.email
            let pass = data.pass
            let auth = firebase.auth()
            auth.createUserWithEmailAndPassword(email, pass)
                .then((data) => {
                    uid = data.uid


                    AsyncStorage.setItem("auth", uid)
                        .then(() => {
                            console.log("id saved", uid)
                            dispatch(Action.userSignup())
                        })


                })
                .catch((err) => {
                    dispatch(Action.signupErrorAction(err.message))
                    console.log(err.message)
                })
        }
    }



    static loginUser(data) {
        return (dispatch) => {
            let email = data.email
            let pass = data.pass

            let auth = firebase.auth()
            auth.signInWithEmailAndPassword(email, pass)
                .then((data) => {
                    uid = data.uid


                    AsyncStorage.setItem("auth", uid)
                        .then(() => {
                            console.log("id saved", uid)
                            dispatch(Action.userLogin())
                        })
                }).catch((err) => {
                    dispatch(Action.loginErrorAction(err.message))
                    console.log(err.message, "error")
                })
        }
    }

    static dataEntry(data) {
        return (dispatch) => {
            let database = firebase.database().ref("UserData").child(uid)
            let patient = { data }
            database.push(patient).then(() => {
                dispatch(Action.DataEnter())
            })
        }
    }


    static getAllPatientsFromDataBase() {
        return (dispatch) => {
            let arrayData = []
            let database = firebase.database().ref("UserData").child(uid)
            database.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    arrayData.push(key[a].data);
                }
                dispatch(Action.getAllPatient(arrayData))
            })
        }
    }

    static getPatientByDateFromDataBase(findDate) {
        return (dispastch) => {
            let database = firebase.database().ref("UserData").child(uid)
            let arrydata = []
            let dataFilter = []
            database.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    arrydata.push(key[a].data)
                }
                arrydata.map((obj) => {
                    if (obj.date === findDate) {
                        dataFilter.push(obj)
                    }
                })
                console.log(findDate)
                dispastch(Action.getPatientByDate(dataFilter))
            })
        }
    }

    static getPatientByNameFromDataBase(findName) {
        return (dispastch) => {
            const smallName = findName.toLowerCase()
            let database = firebase.database().ref("UserData").child(uid)
            let arrydata = []
            let dataFilter = []
            database.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    arrydata.push(key[a].data)
                }
                arrydata.map((obj) => {
                    let objName = obj.name.toLowerCase()
                    if (objName === smallName) {
                        dataFilter.push(obj)
                    }
                })
                if (dataFilter[0] === undefined) {
                    dispastch(Action.noData())
                }
                else {

                    dispastch(Action.getPatientByName(dataFilter))
                }

            })
        }
    }

    static checkingForAuthentication() {
        return (dispatch) => {
            AsyncStorage.getItem("auth")
                .then((responce) => {
                    if (responce) {
                        uid = responce
                        dispatch(Action.userAuthentic(responce))
                    }
                    else {
                        dispatch(Action.userAuthenticError())
                    }
                })
        }
    }



    static LogoutUser() {
        return (dispatch) => {

            const logout = firebase.auth()
            logout.signOut().then(() => {
                AsyncStorage.removeItem("auth")
                    .then(() => {
                        uid = ''
                        dispatch(Action.userLogout())

                    })
            })
        }
    }




}
export default Midware