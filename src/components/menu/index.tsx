import { useState } from 'react'
import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CgLogOut } from 'react-icons/cg';
import { IconContext } from 'react-icons'

import { SidebarData } from './menuData'

import './style.css'


function Menu() {

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)



  return (
    <>
      <IconContext.Provider value={{ color: '#C4C4C4' }} >
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <IoIosArrowForward onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar} >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <IoIosArrowBack />
              </Link>
            </li>
            <li>
              <div className="header-sidebar">
                <img className="img-sidebar" src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="avatar" />
                <div className="header-division"></div>
                <span className="header-name">globo.com</span>
              </div>
            </li>
            <li>
              <div className="user-info">
                <img className="user-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU" alt="" />
                <h1 className="user-name">Cu do Euler da Silva</h1>
                <span className="user-level">Usuario</span>
              </div>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} id={window.location.pathname == item.path ? 'active' : ''}>
                  <Link to={item.path}>
                    <IconContext.Provider value={{ className: 'icon-dashboard' }}>
                      {item.icon}
                    </IconContext.Provider>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <button className="btn-logout">
          <IconContext.Provider value={{ className: 'icon-btn-logout' }} >
            <CgLogOut />
          </IconContext.Provider>
              sair
        </button>
      </IconContext.Provider>
    </>
  )
}

export default Menu