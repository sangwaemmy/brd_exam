import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import UpdatedComponent from '../Global/HOCForm'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import PrintCompanyInfo from '../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../Global/Loader';
import TableHead from '../Global/TableHead'
import SearchBox from '../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import SideBar from '../Navbar/SideBar'
import Dashboard from './Dashboard'
import About from './About'

import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwb, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputRowPsw } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'

import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { ListOptioncolWithActivate, ListOptioncolWithDeactivate, TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import { user } from 'react-icons-kit/icomoon/user'

function Account() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState(null)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState(123)
  const [account_category, setAccount_category] = useState()
  const [profileId, setProfile] = useState()
  // profile
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [gender, setGender] = useState()
  //list of categories
  const [catId, setCatId] = useState([]) //Data List
  const [account_categorys, setAccount_categorys] = useState([]) //Data List
  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [accounts, setAccounts] = useState([]) //Data List
  const [accountsAreEnabled, setAccountsAreEnabled] = useState([]) //Data List
  const [accountsAreDisabled, setAccountsAreDisabled] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [userType, setUserType] = useState()
  const [status, setStatus] = useState('enabled')


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var usersDTO = {
      id: id,
      name: name, surname: surname, gender, gender, account_category_id: catId, username: username, password: password
    }
    if (id) {
      let account_category_id = catId
      Commons.updateAccount(usersDTO, id, profileId, account_category_id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveAccount(usersDTO).then((res) => {
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured')
      })
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllAccounts = () => {
    Repository.findAccount().then((res) => {
      setAccounts(res.data);
      setDataLoad(true)
    });
  }


  const getAllAccount_categorys = () => {
    Repository.findAccount_category().then((res) => {
      setAccount_categorys(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllAccounts()
    getAllAccount_categorys()
    getAccountsAreDisenabled()
    getAccountsAreEnabled()
    document.body.style.backgroundColor = '#fff'

    var userid = 1;
    if (userid == 1) {
      console.log('The user is 1')
    }

    //Get Token and catname

    setUserType(localStorage.getItem('catname'))
  }, []);


  const getAccountById = (id) => {
    Repository.findAccountById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.mdl_profile.name)
      setSurname(res.data.mdl_profile.surname)
      setGender(res.data.mdl_profile.gender)
      setUsername(res.data.username)
      setPassword(res.data.password)
      setAccount_category(res.data.mdl_account_category.name)
      setCatId(res.data.mdl_account_category.id)

      setProfile(res.data.mdl_profile.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delAccountById = (id) => {
    Utils.Submit(() => {
      Delete.deleteAccountById(id, () => { getAllAccounts() })
    }, () => { })
  }
  const DisableUserHandler = (id) => {
    Utils.Submit(() => {
      Repository.disableUser('disabled', id).then(res => {
        getAllAccounts()
        getAllAccounts()
        getAccountsAreEnabled()
        getAccountsAreDisenabled()
      })
    }, () => { })
  }
  const enabledHandler = (id) => {
    Utils.Submit(() => {
      Repository.disableUser('enabled', id).then(res => {
        getAllAccounts()
        getAllAccounts()
        getAccountsAreEnabled()
        getAccountsAreDisenabled()
      })
    }, () => { })
  }
  const changeStatus = () => {

  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllAccounts()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setUsername("")
    setPassword("")
    setAccount_category("")
    setProfile("")

  }
  const clearHandle = () => {
    setId(null)
    setName("")
    setSurname("")
    setUsername("")
    setPassword("")
    setAccount_category("")
    setProfile("")
    setClearBtn(false)
  }


  const getAccountsAreEnabled = () => {
    Repository.findAccountByStatus('enabled').then((res) => {
      setAccountsAreEnabled(res.data);
      setDataLoad(true)
    });
  }
  const getAccountsAreDisenabled = () => {
    Repository.findAccountByStatus('disabled').then((res) => {
      setAccountsAreDisabled(res.data);
      setDataLoad(true)
    });
  }



  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/

  return (
    <PagesWapper>


      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form='User' showLoader={showLoader}>
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            {/* profile     */}

            <InputRow name='Name' val={name} handle={(e) => setName(e.target.value)} label='lblname' />
            <InputRow name='Surname' val={surname} handle={(e) => setSurname(e.target.value)} label='lblsurname' />

            <DropDownInput handle={(e) => setGender(e.target.value)} name='gender' label='Geender' >
              <option selected={gender === 'Male'} value='Male' key={2}> Male </option>
              <option selected={gender === 'Female'} value='Female' key={3}> Female </option>
            </DropDownInput>

            {/* Account */}
            <InputRow name='Username' val={username} handle={(e) => setUsername(e.target.value)} label='lblusername' />
            <InputRowPsw name='Password' val={password} handle={(e) => setPassword(e.target.value)} label='lblpassword' />
            {/* Account category */}
            <DropDownInput handle={(e) => setCatId(e.target.value)} name='category' label='category' >
              {account_categorys.map((cat) => (
                <option selected={catId === cat.id} value={cat.id} key={cat.id}> {cat.name} </option>
              ))}
            </DropDownInput>

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Accounts List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} >
          <a href="#" onClick={() => changeStatus()} className='mx-3 p-1 btn btn-info'>Enabled</a>
          <a href="#" onClick={() => changeStatus()} className='mx-3 p-1 btn btn-warning'>Disabled</a>
        </ListToolBar>
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>
        <h3>All users</h3>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>Name</td>
              <td>Surname</td>
              <td>username</td>
              <td>account_category</td>
              <td>Status</td>
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}   </td>
                  <td>{account.surname}   </td>
                  <td>{account.username}   </td>
                  <td>{account.catname}   </td>
                  <td>{account.status}   </td>
                  {userType == 'admin' &&
                    <ListOptioncolWithDeactivate getEntityById={() => getAccountById(account.id)} delEntityById={() => delAccountById(account.id)} />

                  }     </tr>
              ))}</tbody>
          </TableOpen>
        </div>
        <h3>Active users</h3>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>Name</td>
              <td>Surname</td>
              <td>username</td>
              <td>account_category</td>
              <td>Status</td>
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {accountsAreEnabled.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}   </td>
                  <td>{account.surname}   </td>
                  <td>{account.username}   </td>
                  <td>{account.catname}   </td>
                  <td>{account.status}   </td>
                  {userType == 'admin' &&
                    <ListOptioncolWithDeactivate getEntityById={() => getAccountById(account.id)} delEntityById={() => delAccountById(account.id)} delDisable={() => DisableUserHandler(account.id)} />

                  }     </tr>
              ))}</tbody>
          </TableOpen>
        </div>
        <h3>Deactivated users</h3>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>Name</td>
              <td>Surname</td>
              <td>username</td>
              <td>account_category</td>
              <td>Status</td>
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {accountsAreDisabled.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}   </td>
                  <td>{account.surname}   </td>
                  <td>{account.username}   </td>
                  <td>{account.catname}   </td>
                  <td>{account.status}   </td>
                  {userType == 'admin' &&
                    <ListOptioncolWithActivate getEntityById={() => getAccountById(account.id)} delEntityById={() => delAccountById(account.id)} enabled={() => enabledHandler(account.id)} />

                  }     </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />}
    </PagesWapper>
  )
}
export default Account