import React, { Component } from 'react'
import axios from "axios"
import Conn from './Conn'
class Commons {
    static server = Conn.server.name + Conn.port.val
    static apiPath = Conn.basicPath.val

    RedirectToLogin() {
        localStorage.removeItem('token')
        localStorage.removeItem('catname')
        localStorage.removeItem('userid')
        localStorage.clear()
        if (localStorage.getItem('token') == '' && localStorage.getItem('catname') == '' && localStorage.getItem('userid') == '') {
            window.location.replace('/login')
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('catname')
            localStorage.removeItem('userid')
            localStorage.clear()
            window.location.replace('/login')
        }
    }


    saveAccount(user) {
        return axios.post(Conn.wholePath.name + "/account/", user, { headers: Conn.GetToken })
    }
    saveAccount_category(user) {
        return axios.post(Conn.wholePath.name + "/account_category/", user, { headers: Conn.GetToken })
    }
    saveTender_subm(user) {
        return axios.post(Conn.wholePath.name + "/tender_subm/", user, { headers: Conn.GetToken })
    }

    changePassword(user, id){
        return axios.put(Conn.wholePath.name+"/account/changePassword/"+ id, user,{headers: Conn.GetToken})
    }


    saveItemCategory(itemsCategory) {
        return axios.post(Conn.wholePath.name + "/itemsCategory/", itemsCategory, { headers: Conn.GetToken })
    }
    saveItem(mdl_items, itemsCategoryId) {
        return axios.post(Conn.wholePath.name + "/items/" + itemsCategoryId, mdl_items, { headers: Conn.GetToken })
    }
    savewhMovement(mdl_Hw_movement) {
        return axios.post(Conn.wholePath.name + "/hwmovement/", mdl_Hw_movement, { headers: Conn.GetToken })
    }
    savePurchases(mdl_purchases, accountId, itemsId, carrier, reference) {
        return axios.post(Conn.wholePath.name + "/purchases/" + accountId + "/" + itemsId + "/" + carrier + "/" + reference, mdl_purchases, { headers: Conn.GetToken })
    }
    saveReturn(mdl_sales, accountId, itemsId, reference) {
        return axios.post(Conn.wholePath.name + "/return/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: Conn.GetToken })
    }
    saveDamage(mdl_sales, accountId, itemsId, reference) {
        return axios.post(Conn.wholePath.name + "/damage/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: Conn.GetToken })
    }
    saveSales(mdl_sales, accountId, itemsId, reference) {
        return axios.post(Conn.wholePath.name + "/sales/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: Conn.GetToken })
    }
    savePurcSalesJournal(mdl_Sale_purchase_journal) {
        return axios.post(Conn.wholePath.name + "/Sale_purchase_journal/", mdl_Sale_purchase_journal, { headers: Conn.GetToken })
    }


   


    updateItem(item, id, itemsCategoryId) {
        return axios.put(Conn.wholePath.name + "/items/items/" + id + "/" + itemsCategoryId, item, { headers: Conn.GetToken })
    }
    updateItemCategory(itemCategory, itemsCategoryId) {
        return axios.put(Conn.wholePath.name + "/itemsCategory/itemsCategory/" + itemsCategoryId, itemCategory, { headers: Conn.GetToken })
    }
    updateAccount(usersDTO, id, profileId, catId) {
        return axios.put(Conn.wholePath.name + "/account/" + id + "/" + profileId + "/" + catId, usersDTO, { headers: Conn.GetToken })
    }

}

export default new Commons()
