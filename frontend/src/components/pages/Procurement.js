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
import InputRow, { DropDownInput, EmptyInputRow } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
         
function Procurement() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [account_category, setAccount_category] = useState()
  const [profile, setProfile] = useState()


  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [accounts, setAccounts] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_account = {
      id: id, username: username, password: password, account_category: account_category, profile: profile
    }
    if (id) {
      Commons.updateUnit(mdl_account, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveAccount(mdl_account).then((res) => {
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

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllAccounts()
    setClearBtn(false)
  }, []);


  const getAccountById = (id) => {
    Repository.findAccountById(id).then((res) => {
      setId(res.data.id)
      setUsername(res.data.id)
      setPassword(res.data.id)
      setAccount_category(res.data.id)
      setProfile(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delAccountById = (id) => {
    Utils.Submit(() => {
      Delete.deleteAccountById(id, () => { getAllAccounts() })
    }, () => { })
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
    setUsername("")
    setPassword("")
    setAccount_category("")
    setProfile("")
  }


  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  })
  /*#endregion Listing data*/

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form='Procurement' showLoader={showLoader} >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
          
            
            <InputRow name='Username' val={username} handle={(e) => setUsername(e.target.value)} label='lblUsername' />
            <InputRow name='AccountCategory' val={account_category} handle={(e) => setAccount_category(e.target.value)} label='lblAccountCategory' />
            <InputRow name='Profile' val={profile} handle={(e) => setProfile(e.target.value)} label='lblProfile' />

          </FormInnerRightPane>

        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Procurement List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Username</td>
              <td>Username</td>
              <td>Account Category</td>
              <td>Profile</td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}   </td>
                  <td>{account.username}   </td>
                  <td>{account.password}   </td>
                  <td>{account.account_category}   </td>
                  <td>{account.profile}   </td>
                  <ListOptioncol getEntityById={() => getAccountById(account.id)} delEntityById={() => delAccountById(account.id)} />
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

    </PagesWapper>
  );
}

export default Procurement;
