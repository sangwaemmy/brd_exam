import axios from 'axios'
import React, { Component } from 'react'
import Conn from './Conn';

class Repository {
    static page = (Repository.page < 1 || Repository.page == undefined) ? 1 : Repository.page;
    static size = (Repository.size < 1) ? 50 : Repository.size;
    static server = Conn.wholePath.name;
    // static url = "http://" + Repository.server + ":8089/guru/api"


    static headers = Conn.LoginToken
    static getHeaders = Conn.GetToken

    findCategories() {
        return axios.get(Repository.server + "/", { headers: Repository.getHeaders })
    }
    findCategoriesCount() {
        return axios.get(Repository.server + "/count/")
    }
    findProfile() {
        return axios.get(Repository.server + "/profile/")
    }
    findAccount() {
        return axios.get(Repository.server + "/account")
    }
    findTender_subm () {
        return axios.get(Repository.server + "/tender_subm/")
    }
    findTender_eval() {
        return axios.get(Repository.server + "/tender_eval/")
    }
    findComm_notify() {
        return axios.get(Repository.server + "/comm_notify/")
    }
    findRating() {
        return axios.get(Repository.server + "/codes/rating")
    }
    findApssDownloadSingleApp(appName) {/*Backend*/
        fetch(Repository.server + '/codes/download/' + appName)
            .then(response => {

                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = appName + 'Backend.zip';
                    a.click();
                });
            });
    }
    findApssDownloadSingleFrontEndApp(appName) { /*FrontEnd*/
        fetch(Repository.server + '/codes/downloadfront/' + appName)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = appName + 'FrontEnd.zip';
                    a.click();
                });
            });
    }
    Login(authRequest) {

        return axios.post(Conn.server.name + Conn.port.val + "authenticate", authRequest, { headers: Repository.headers }
        )
    }
    
    findAccount_category() {
        return axios.get(Repository.server + "/account_category/" , { headers: Repository.getHeaders })
    }
    findTender_req() {
        return axios.get(Repository.server + "/tender_req/", { headers: Repository.headers })
    }
    findTender_resp() {
        return axios.get(Repository.server + "/tender_resp/", { headers: Repository.headers })
    }
    findCriteria(id) {
        return axios.get(Repository.server + "/criteria/" + id, { headers: Repository.headers })
    }
    findCriteria_group(id) {
        return axios.get(Repository.server + "/criteria_group/" + id, { headers: Repository.headers })
    }
    findTuples() {
        return axios.get(Repository.server + "/tuple/", { headers: Repository.headers })
    }
    findTupleById(id) {
        return axios.get(Repository.server + "/tuple/singleTuple/" + id)
    }
    findTuplesByUnitId(id) {
        return axios.get(Repository.server + "/tuple/tupleByunitid/" + id)
    }

    updateUnitByUnitname(name, unitId) {
        return axios.get(Repository.server + "/unit/update/unitbyid/" + name + '/' + unitId)

    }



}

export default new Repository()