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

function Tender_resp() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  
  const [tender_subm, setTender_subm] = useState()
  const [response, setResponse] = useState()
  const [done_by, setDone_by] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tender_resps, setTender_resps] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_tender_resp = {
      id: id, tender_subm: tender_subm, response: response, done_by: done_by
    }
    if (id) {
      Commons.updateUnit(mdl_tender_resp, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveTender_resp(mdl_tender_resp).then((res) => {
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
  const getAllTender_resps = () => {
    Repository.findTender_resp().then((res) => {
      setTender_resps(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllTender_resps()
    setClearBtn(false)

  }, []);


  const getTender_respById = (id) => {
    Repository.findTender_respById(id).then((res) => {
      setId(res.data.id)
      setTender_subm(res.data.id)
      setResponse(res.data.id)
      setDone_by(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTender_respById = (id) => {
    Utils.Submit(() => {
      Delete.deleteTender_respById(id, () => { getAllTender_resps() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTender_resps()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setTender_subm("")
    setResponse("")
    setDone_by("")
  }
  const clearHandle = () => {
    setId(null)
    setTender_subm("")
    setResponse("")
    setDone_by("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Tender_resp' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <InputRow name='Tender Subm ' val={tender_subm } handle={(e) => setTender_subm (e.target.value)} label='lblTender Subm ' />
            <InputRow name='Response ' val={response} handle={(e) => setResponse(e.target.value)} label='lblResponse ' />
            <InputRow name='Done By ' val={done_by } handle={(e) => setDone_by (e.target.value)} label='lblDone By ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Tender_resp List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Tender Subm </td>
              <td>Response </td>
              <td>Done By </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {tender_resps.map((tender_resp) => (
                <tr key={tender_resp.id}>
                  <td>{tender_resp.id}   </td>
                  <td>{tender_resp.tender_subm}   </td>
                  <td>{tender_resp.response}   </td>
                  <td>{tender_resp.done_by}   </td>
                  <ListOptioncol getEntityById={() => getTender_respById(tender_resp.id)} delEntityById={() => delTender_respById(tender_resp.id)} />
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

export default Tender_resp;
