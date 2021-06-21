import React from 'react'
import Menu from '../../components/menu'

import './style.css'

function Management() {
  return (
    <div className="page-main">
      <div>
        <Menu />
      </div>
      <div id="container">
        <div id="box-1" className="box">1</div>
        <div id="box-2" className="box">2</div>
        <div id="box-3" className="box">3</div>
      </div>
    </div>
  )
}

export default Management
