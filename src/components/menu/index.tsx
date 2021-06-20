import { RiDashboardFill, RiSettings4Fill } from 'react-icons/ri';

import './style.css'


function Menu() {
  return (
    <div className="sidebar">
      <div className="header-sidebar">
        <img className="img-sidebar" src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="avatar" />
        <div className="header-division"></div>
        <span className="header-name">globo.com</span>
      </div>

      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU" alt="" />
        <h1>Cu do Euler da Silva</h1>
        <span>Usuario</span>
      </div>

      <div>
        <RiDashboardFill />
        <span>Dashboard</span>
        <RiSettings4Fill />
        <span>Gerenciamento</span>
      </div>
    </div>
  )
}

export default Menu