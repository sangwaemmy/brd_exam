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

function Rating() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  
  const [date_time, setDate_time] = useState()
  const [tender_subm, setTender_subm] = useState()
  const [score, setScore] = useState()
  const [done_by, setDone_by] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [ratings, setRatings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_rating = {
      id: id, date_time: date_time, tender_subm: tender_subm, score: score, done_by: done_by
    }
    if (id) {
      Commons.updateUnit(mdl_rating, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveRating(mdl_rating).then((res) => {
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
  const getAllRatings = () => {
    Repository.findRating().then((res) => {
      setRatings(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllRatings()
    setClearBtn(false)
  }, []);


  const getRatingById = (id) => {
    Repository.findRatingById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setTender_subm(res.data.id)
      setScore(res.data.id)
      setDone_by(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delRatingById = (id) => {
    Utils.Submit(() => {
      Delete.deleteRatingById(id, () => { getAllRatings() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllRatings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setTender_subm("")
    setScore("")
    setDone_by("")
  } 
   const clearHandle = () => {
    setId(null)
    setDate_time("")
    setTender_subm("")
    setScore("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Rating' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            
            <InputRow name='Date Time ' val={date_time } handle={(e) => setDate_time (e.target.value)} label='lblDate Time ' />
            <InputRow name='Tender Subm ' val={tender_subm } handle={(e) => setTender_subm (e.target.value)} label='lblTender Subm ' />
            <InputRow name='Score ' val={score} handle={(e) => setScore(e.target.value)} label='lblScore ' />
            <InputRow name='Done By ' val={done_by } handle={(e) => setDone_by (e.target.value)} label='lblDone By ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Rating List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Date Time </td>
              <td>Tender Subm </td>
              <td>Score </td>
              <td>Done By </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating.id}>
                  <td>{rating.id}   </td>
                  <td>{rating.date_time}   </td>
                  <td>{rating.tender_subm}   </td>
                  <td>{rating.score}   </td>
                  <td>{rating.done_by}   </td>
                  <ListOptioncol getEntityById={() => getRatingById(rating.id)} delEntityById={() => delRatingById(rating.id)} />
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

export default Rating;
