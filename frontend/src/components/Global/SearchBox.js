import React from 'react'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
function SearchBox() {
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDate] = useState(new Date());
    const bg = {
        backgroundColor: "#fff"
    }
    return (
        <div className='container'>
            <div className='row pb-2  '>
                <div className='col-12 p-2 m-1 mt-2 d-flex justify-content-around' style={{ borderRadius: "5px", border: "1px solid #fff", boxShadow: "0px 0px 3px #000", height: "auto", backgroundColor: "#e4e8eb" }}>
                    <form onSubmit={(e)=>{e.preventDefault()}} className="row d-flex justify-content-end p-0 m-0">
                        <div className="col-auto ">
                            <select class="form-select form-select-md" title="Criteria" aria-label=".form-select-lg example">
                                <option>Select Option</option>
                                <option value="1">name</option>
                            </select>
                        </div>
                        <div className='col-auto '>
                            <input type="text" 
                            title="Enter the name tof the criteria" className="form-control" style={bg} id="staticEmail2" placeholder='Name' />
                        </div>
                        <div className="col-auto ">
                            <DatePicker selected={startDate} title="Pick the Start date" required
                                onChange={(date) => setStartDate(date)}
                                monthsShown={4}
                                showYearDropdown />
                            {/* <input type="text" className="form-control" style={bg}  id="staticEmail2" placeholder='Start date' /> */}
                        </div>
                        <div className="col-auto ">
                        <DatePicker selected={endtDate} title="Pick the End date"
                                onChange={(date) => setEndDate(date)}
                                monthsShown={4}
                                showYearDropdown />
                        </div>
                        <div className="col-auto ">
                            <button type="submit" className="btn btn-success">  <Icon style={{ color: '#fff', marginRight: "10px" }} icon={search} />
                                Enter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchBox
