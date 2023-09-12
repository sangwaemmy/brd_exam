import React from 'react'

function TableHead(props) {
  return (
    <thead>
    <tr>
       {props.children}
    </tr>
</thead>
  )
}

export default TableHead
