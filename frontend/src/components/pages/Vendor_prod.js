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

function Vendor_prod() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id_id, setId_id] = useState()
const [Name, setName] = useState()
const [Description, setDescription] = useState()
const [Vendor, setVendor] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [vendor_prods, setVendor_prods] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_vendor_prod= {
id:id,name : name,description : description,vendor : vendor      
    }
    if (id) {
      Commons.updateUnit(mdl_vendor_prod, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveVendor_prod(mdl_vendor_prod).then((res) => {
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
  const getAllVendor_prods = () => {
    Repository.findVendor_prod().then((res) => {
      setVendor_prods(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
    getAllVendor_prods()
  }, []);


  const getVendor_prodById = (id) => {
    Repository.findVendor_prodById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.id)
      setDescription(res.data.id)
      setVendor(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delVendor_prodById = (id) => {
    Utils.Submit(() => {
      Delete.deleteVendor_prodById(id, () => { getAllVendor_prods() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllVendor_prods()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setName("")
setDescription("")
setVendor("")
}  const clearHandle = () => {
setId(null)
setName("")
setDescription("")
setVendor("")
  }    setClearBtn(false)

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
        <ContainerRowBtwn clearBtn={clearBtn} form='Vendor_prod' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            
            <InputRow name='Name ' val={Name } handle={(e) => setName (e.target.value)} label='lblName ' />
            <InputRow name='Description ' val={Description } handle={(e) => setDescription (e.target.value)} label='lblDescription ' />
            <InputRow name='Vendor ' val={Vendor } handle={(e) => setVendor (e.target.value)} label='lblVendor ' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Vendor_prod List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
 <td>ID</td>
 <td>Name </td>
 <td>Description </td>
 <td>Vendor </td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {vendor_prods.map((vendor_prod) => (
                <tr key={vendor_prod.id}>
                  <td>{vendor_prod.id}   </td>
                  <td>{vendor_prod.name}   </td>
                  <td>{vendor_prod.description}   </td>
                  <td>{vendor_prod.vendor}   </td>
                  <ListOptioncol getEntityById={() => getVendor_prodById(vendor_prod.id)} delEntityById={() => delVendor_prodById(vendor_prod.id)} />
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

export default Vendor_prod;
