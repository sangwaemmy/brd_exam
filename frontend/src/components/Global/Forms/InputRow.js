import React from 'react'
import OtherStyles from '../../Styles/OtherStyles'


function InputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" ref={props.ref} autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}

export function InputRowPsw(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="password" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function InputRowTupleName(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" onFocus={true} ref={props.ref} autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}


export const BtnInputRow = (props) => {
    return (
        <div class="form-group row m-1">
            <button className='btn  col-sm-3 col-form-label' onClick={props.handle} style={{ color: "#000", fontWeight: "bolder", backgroundColor: "#b4c7f2da" }}> {props.name} </button>
            <div class="col-sm-9">
                <span className='p-2 mt-3'>
                    {props.status}
                </span>

            </div>
        </div>
    )
}

export const GenIputRow = (props) => {
    return (
        <div class="form-group row m-1">
            <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
            <div class="col-sm-9">
                {props.children}

            </div>
        </div>
    )
}


/*#region Two cols inputs, these allows the input on two side by side */

export const TwoColDropdownInput = (props) => {
    return <div class="form-group row m-1">
        <label for={props.label1} class="col-sm-3 col-form-label">{props.name1}</label>
        <div class="col-sm-3">
            <select required style={OtherStyles.txt()} onChange={props.handle1} className="form-select" id={props.label1}>
                <option></option>
                {props.txt1}
            </select>

        </div>
        <label for={props.label2} class="col-sm-2 col-form-label">{props.name2}</label>
        <div class="col-sm-4">
            <select required style={OtherStyles.txt()} onChange={props.handle2} className="form-select" id={props.label2}>
                <option></option>
                {props.txt2}

            </select>

        </div>
    </div>
}

export const TwoColInput = (props) => {
    return <div class="form-group row m-1">
        <label for={props.label1} class="col-sm-3 col-form-label">{props.name1}</label>
        <div class="col-sm-4 col-md-3">
             
                <input type="text" onFocus={true} ref={props.ref} autoComplete='false' required style={OtherStyles.txt()} value={props.val1}
                    onChange={props.handle1} className="form-control" id={props.label} />
            

        </div>
        <label for={props.label2} class="col-sm-2 col-form-label">{props.name2}</label>
        <div class="col-sm-4 col-md-4">
            
                <input type="text" onFocus={true} ref={props.ref} autoComplete='false' title={props.title} required style={OtherStyles.txt()} value={props.val2}
                    onChange={props.handle2} className="form-control" id={props.label} />
            

        </div>
    </div>
}
/*#endregion Two cols inputs*/


export const DropDownInputWithLoader = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label}>
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>

                {props.children}
            </select>
        </GenIputRow>
    </>)

}
export const DropDownInput = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label}>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>}
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>
                {props.children}
            </select>
        </GenIputRow>
    </>)
}

export const LoadSub = (props) => {
    return (
        <>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>
            }
        </>
    )
}
export const EmptyInputRow = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" autoComplete='false' style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />

            </GenIputRow>
        </>
    )
}

// Used on the unit-tuples form
export const UnitsForParentFields = (props) => {
    {
        props.units.map(unit => {
            return <option>{unit.name}  </option>
        })
    }
}


export default InputRow