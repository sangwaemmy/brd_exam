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
import ImageUpload from './ImageUpload'

function Tender_subm() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/

  const [date_time, setDate_time] = useState()
  const [path, setPath] = useState()
  const [done_by, setDone_by] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tender_subms, setTender_subms] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_tender_subm = {
      id: id, date_time: date_time, path: path, done_by: done_by
    }
    if (id) {
      Commons.updateUnit(mdl_tender_subm, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveTender_subm(mdl_tender_subm).then((res) => {

        // Image here
      

      


        handleUpload()
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
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post('http://localhost:8096/proc_tender/api/tender_subm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };





  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllTender_subms = () => {
    Repository.findTender_subm().then((res) => {
      setTender_subms(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllTender_subms()
    setClearBtn(false)
  }, []);


  const getTender_submById = (id) => {
    Repository.findTender_submById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setPath(res.data.id)
      setDone_by(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTender_submById = (id) => {
    Utils.Submit(() => {
      Delete.deleteTender_submById(id, () => { getAllTender_subms() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTender_subms()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setPath("")
    setDone_by("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setPath("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Tender_subm' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lblDate Time ' />
            <InputRow name='Path ' val={path} handle={(e) => setPath(e.target.value)} label='lblPath ' />

            <input type="file" onChange={handleFileChange} />


            <InputRow name='Done By ' val={done_by} handle={(e) => setDone_by(e.target.value)} label='lblDone By ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Tender_subm List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Date Time </td>
              <td>Path </td>
              <td>Done By </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {tender_subms.map((tender_subm) => (
                <tr key={tender_subm.id}>
                  <td>{tender_subm.id}   </td>
                  <td>{tender_subm.date_time}   </td>
                  <td>{tender_subm.path}   </td>
                  <td>{tender_subm.done_by}   </td>
                  <ListOptioncol getEntityById={() => getTender_submById(tender_subm.id)} delEntityById={() => delTender_submById(tender_subm.id)} />
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

export default Tender_subm;
