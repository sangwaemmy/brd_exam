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

function Tender_resp_att() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/

  const [name, setName] = useState()
  const [file_path, setFile_path] = useState()
  const [date_time, setDate_time] = useState()
  const [done_by, setDone_by] = useState()
  const [tender_subm, setTender_subm] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tender_resp_atts, setTender_resp_atts] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_tender_resp_att = {
      id: id, name: name, file_path: file_path, date_time: date_time, done_by: done_by, tender_subm: tender_subm
    }
    if (id) {
      Commons.updateUnit(mdl_tender_resp_att, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveTender_resp_att(mdl_tender_resp_att).then((res) => {
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
  const getAllTender_resp_atts = () => {
    Repository.findTender_resp_att().then((res) => {
      setTender_resp_atts(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllTender_resp_atts()
    document.body.style.backgroundColor = '#fff'

    setClearBtn(false)
  }, []);


  const getTender_resp_attById = (id) => {
    Repository.findTender_resp_attById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.id)
      setFile_path(res.data.id)
      setDate_time(res.data.id)
      setDone_by(res.data.id)
      setTender_subm(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTender_resp_attById = (id) => {
    Utils.Submit(() => {
      Delete.deleteTender_resp_attById(id, () => { getAllTender_resp_atts() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTender_resp_atts()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setName("")
    setFile_path("")
    setDate_time("")
    setDone_by("")
    setTender_subm("")
  }
  const clearHandle = () => {
    setId(null)
    setName("")
    setFile_path("")
    setDate_time("")
    setDone_by("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Tender_resp_att' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <InputRow name='Name ' val={name} handle={(e) => setName(e.target.value)} label='lblName ' />
            <InputRow name='File Path ' val={file_path } handle={(e) => setFile_path (e.target.value)} label='lblFile Path ' />
            <InputRow name='Date Time ' val={date_time } handle={(e) => setDate_time (e.target.value)} label='lblDate Time ' />
            <InputRow name='Done By ' val={done_by } handle={(e) => setDone_by (e.target.value)} label='lblDone By ' />
            <InputRow name='Tender Subm ' val={tender_subm } handle={(e) => setTender_subm (e.target.value)} label='lblTender Subm ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Tender_resp_att List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Name </td>
              <td>File Path </td>
              <td>Date Time </td>
              <td>Done By </td>
              <td>Tender Subm </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {tender_resp_atts.map((tender_resp_att) => (
                <tr key={tender_resp_att.id}>
                  <td>{tender_resp_att.id}   </td>
                  <td>{tender_resp_att.name}   </td>
                  <td>{tender_resp_att.file_path}   </td>
                  <td>{tender_resp_att.date_time}   </td>
                  <td>{tender_resp_att.done_by}   </td>
                  <td>{tender_resp_att.tender_subm}   </td>
                  <ListOptioncol getEntityById={() => getTender_resp_attById(tender_resp_att.id)} delEntityById={() => delTender_resp_attById(tender_resp_att.id)} />
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

export default Tender_resp_att;
