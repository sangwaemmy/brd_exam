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


import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faCalendar } from '@fortawesome/free-solid-svg-icons';



function Reporting() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/

  const [tender_subm, setTender_subm] = useState()
  const [criteria_id, setCriteria_id] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tender_evals, setTender_evals] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_tender_eval = {
      id: id, tender_subm: tender_subm, criteria_id: criteria_id
    }
    if (id) {
      Commons.updateUnit(mdl_tender_eval, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveTender_eval(mdl_tender_eval).then((res) => {
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
  const getAllTender_evals = () => {
    Repository.findTender_eval().then((res) => {
      setTender_evals(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllTender_evals()
    setClearBtn(false)
  }, []);


  const getTender_evalById = (id) => {
    Repository.findTender_evalById(id).then((res) => {
      setId(res.data.id)
      setTender_subm(res.data.id)
      setCriteria_id(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTender_evalById = (id) => {
    Utils.Submit(() => {
      Delete.deleteTender_evalById(id, () => { getAllTender_evals() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTender_evals()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setTender_subm("")
    setCriteria_id("")
  }
  const clearHandle = () => {
    setId(null)
    setTender_subm("")
    setCriteria_id("")
  }

  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/

  return (<Container fluid>
    <h1 className="mt-4">Dashboard</h1>
    <Row>
      <Col md={4}>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faUsers} size="3x" />
                <h3 className="mt-3">Users</h3>
              </div>
              <h1>50</h1>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faChartBar} size="3x" />
                <h3 className="mt-3">Sales</h3>
              </div>
              <h1>$10,000</h1>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faCalendar} size="3x" />
                <h3 className="mt-3">Events</h3>
              </div>
              <h1>5</h1>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>

  );
}

export default Reporting;
