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

function Comm_notify() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  
  const [date_time, setDate_time] = useState()
  const [user, setUser] = useState()
  const [tender_status, setTender_status] = useState()
  const [tender_subm, setTender_subm] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [comm_notifys, setComm_notifys] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_comm_notify = {
      id: id, date_time: date_time, user: user, tender_status: tender_status, tender_subm: tender_subm
    }
    if (id) {
      Commons.updateUnit(mdl_comm_notify, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveComm_notify(mdl_comm_notify).then((res) => {
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
  const getAllComm_notifys = () => {
    Repository.findComm_notify().then((res) => {
      setComm_notifys(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllComm_notifys()
    setClearBtn(false)
  }, []);


  const getComm_notifyById = (id) => {
    Repository.findComm_notifyById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setUser(res.data.id)
      setTender_status(res.data.id)
      setTender_subm(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delComm_notifyById = (id) => {
    Utils.Submit(() => {
      Delete.deleteComm_notifyById(id, () => { getAllComm_notifys() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllComm_notifys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setUser("")
    setTender_status("")
    setTender_subm("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setUser("")
    setTender_status("")
    setTender_subm("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Comm_notify' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            
            <InputRow name='Date Time ' val={date_time } handle={(e) => setDate_time (e.target.value)} label='lblDate Time ' />
            <InputRow name='User ' val={user} handle={(e) => setUser(e.target.value)} label='lblUser ' />
            <InputRow name='Tender Status ' val={tender_status } handle={(e) => setTender_status (e.target.value)} label='lblTender Status ' />
            <InputRow name='Tender Subm ' val={tender_subm } handle={(e) => setTender_subm (e.target.value)} label='lblTender Subm ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Comm_notify List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Date Time </td>
              <td>User </td>
              <td>Tender Status </td>
              <td>Tender Subm </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {comm_notifys.map((comm_notify) => (
                <tr key={comm_notify.id}>
                  <td>{comm_notify.id}   </td>
                  <td>{comm_notify.date_time}   </td>
                  <td>{comm_notify.user}   </td>
                  <td>{comm_notify.tender_status}   </td>
                  <td>{comm_notify.tender_subm}   </td>
                  <ListOptioncol getEntityById={() => getComm_notifyById(comm_notify.id)} delEntityById={() => delComm_notifyById(comm_notify.id)} />
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

export default Comm_notify;
