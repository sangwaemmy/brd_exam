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

function Profile() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id_id, setId_id] = useState()
const [Name, setName] = useState()
const [Surname, setSurname] = useState()
const [Gender, setGender] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [profiles, setProfiles] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_profile= {
id:id,name : name,surname : surname,gender : gender      
    }
    if (id) {
      Commons.updateUnit(mdl_profile, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveProfile(mdl_profile).then((res) => {
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
  const getAllProfiles = () => {
    Repository.findProfile().then((res) => {
      setProfiles(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllProfiles()
    setClearBtn(false)
  }, []);


  const getProfileById = (id) => {
    Repository.findProfileById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.id)
      setSurname(res.data.id)
      setGender(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delProfileById = (id) => {
    Utils.Submit(() => {
      Delete.deleteProfileById(id, () => { getAllProfiles() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllProfiles()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setName("")
setSurname("")
setGender("")
} 
 const clearHandle = () => {
setId(null)
setName("")
setSurname("")
setGender("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Profile' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='ID' val={ID} handle={(e) => setID(e.target.value)} label='lblID' />
            <InputRow name='Name' val={Name} handle={(e) => setName(e.target.value)} label='lblName' />
            <InputRow name='Name' val={Name} handle={(e) => setName(e.target.value)} label='lblName' />
            <InputRow name='Gender' val={Gender} handle={(e) => setGender(e.target.value)} label='lblGender' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Profile List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
 <td>ID</td>
 <td>Name</td>
 <td>Name</td>
 <td>Gender</td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.id}   </td>
                  <td>{profile.name}   </td>
                  <td>{profile.surname}   </td>
                  <td>{profile.gender}   </td>
                  <ListOptioncol getEntityById={() => getProfileById(profile.id)} delEntityById={() => delProfileById(profile.id)} />
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

export default Profile;
