import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { CgLogOut } from 'react-icons/cg';
import { IconContext } from 'react-icons'
import { SidebarData } from './menuData'
import { Context, nivelAcesso as nivelUser } from '../../contexts/AuthContext'

import './style.css'

function Menu() {
  const [sidebar, setSidebar] = useState(false);
  const [userMail, setUserMail] = useState<String | null>('');
  const [nivelAcesso, setNivelAcesso] = useState<String | null>('');
  const [sideBarData, setSideBarData] = useState<Array<any>>([]);

  const { handleLogout } = useContext(Context);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const nivelAcesso = localStorage.getItem('nivel_acesso');
    const restrictedSidebarData = nivelAcesso !== nivelUser.ADMINISTRADOR
      ? SidebarData.filter(item => item.path !== '/management')
      : [...SidebarData];

    setUserMail(email);
    setNivelAcesso(nivelAcesso);
    setSideBarData(restrictedSidebarData);
  }, []);

  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <IoIosArrowDropright style={{ marginLeft: "15", marginTop: "35" }} onClick={showSidebar} />
        </Link>
      </div>
  
      <nav className={sidebar ? 'sidebar show-sidebar' : 'sidebar'}>
        <ul className="nav-menu-items" onClick={showSidebar} >
          <div className="header-sidebar">
            <Link to="#">
              <IoIosArrowDropleft style={{ marginLeft: "8", verticalAlign: "-3" }}/>
            </Link>
            <img className="img-sidebar" src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="avatar" />
            <div className="header-division"></div>
            <span className="header-name">globo.com</span>
          </div>
          <li>
            <div className="user-info">
              {nivelAcesso === nivelUser.ADMINISTRADOR
                  ? <img className="user-img" src="https://i.pinimg.com/originals/a0/11/26/a01126056cfcaf182d577d4a6e41394d.png" alt="Administrador"/> 
                  : <img className="user-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU" alt="Funcionário" /> 
                }
              
              <h1 className="user-name">{userMail}</h1>
              <span className="user-level"><strong>{nivelAcesso}</strong></span>
            </div>
          </li>
          <br/>
          {sideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={window.location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <IconContext.Provider value={{ className: 'icon-dashboard' }}>
                    {item.icon}
                  </IconContext.Provider>
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
          <li>
          <br/><br/><br/><br/>
          <button className="btn-logout" style={{ marginLeft: "55px" }} onClick={e => window.confirm("Deseja deslogar do Sistema?") && handleLogout() }>
            <IconContext.Provider value={{ className: 'icon-btn-logout' }} >
              <CgLogOut />
            </IconContext.Provider>
              SAIR
          </button>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default Menu;