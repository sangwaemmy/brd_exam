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

function Tender_req() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/

  const [done_by, setDone_by] = useState()
  const [tender_subm, setTender_subm] = useState()
  const [date_time, setDate_time] = useState()
  const [specification, setSpecification] = useState()
  const [deadline, setDeadline] = useState()
  const [status, setStatus] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tender_reqs, setTender_reqs] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_tender_req = {
      id: id, done_by: done_by, tender_subm: tender_subm, date_time: date_time, specification: specification, deadline: deadline, status: status
    }
    if (id) {
      Commons.updateUnit(mdl_tender_req, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveTender_req(mdl_tender_req).then((res) => {
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
  const getAllTender_reqs = () => {
    Repository.findTender_req().then((res) => {
      setTender_reqs(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllTender_reqs()
    setClearBtn(false)
  }, []);


  const getTender_reqById = (id) => {
    Repository.findTender_reqById(id).then((res) => {
      setId(res.data.id)
      setDone_by(res.data.id)
      setTender_subm(res.data.id)
      setDate_time(res.data.id)
      setSpecification(res.data.id)
      setDeadline(res.data.id)
      setStatus(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTender_reqById = (id) => {
    Utils.Submit(() => {
      Delete.deleteTender_reqById(id, () => { getAllTender_reqs() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTender_reqs()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDone_by("")
    setTender_subm("")
    setDate_time("")
    setSpecification("")
    setDeadline("")
    setStatus("")
  }
  const clearHandle = () => {
    setId(null)
    setDone_by("")
    setTender_subm("")
    setDate_time("")
    setSpecification("")
    setDeadline("")
    setStatus("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Tender_req' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <InputRow name='Done By ' val={done_by} handle={(e) => setDone_by(e.target.value)} label='lblDone By ' />
            <InputRow name='Tender Subm ' val={tender_subm} handle={(e) => setTender_subm(e.target.value)} label='lblTender Subm ' />
            <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lblDate Time ' />
            <InputRow name='Specification ' val={specification} handle={(e) => setSpecification(e.target.value)} label='lblSpecification ' />
            <InputRow name='Deadline ' val={deadline} handle={(e) => setDeadline(e.target.value)} label='lblDeadline ' />
            <InputRow name='Status ' val={status} handle={(e) => setStatus(e.target.value)} label='lblStatus ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Tender_req List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Done By </td>
              <td>Tender Subm </td>
              <td>Date Time </td>
              <td>Specification </td>
              <td>Deadline </td>
              <td>Status </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {tender_reqs.map((tender_req) => (
                <tr key={tender_req.id}>
                  <td>{tender_req.id}   </td>
                  <td>{tender_req.done_by}   </td>
                  <td>{tender_req.tender_subm}   </td>
                  <td>{tender_req.date_time}   </td>
                  <td>{tender_req.specification}   </td>
                  <td>{tender_req.deadline}   </td>
                  <td>{tender_req.status}   </td>
                  <ListOptioncol getEntityById={() => getTender_reqById(tender_req.id)} delEntityById={() => delTender_reqById(tender_req.id)} />
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

export default Tender_req;
