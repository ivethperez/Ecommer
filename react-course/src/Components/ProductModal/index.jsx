import React from 'react'
import ReactDOM  from 'react-dom'

function ProductModal({children}){
return ReactDOM.createPortal(
   <div  >
    {children}
   </div>,
    document.getElementById('modal')
)
}
export default ProductModal