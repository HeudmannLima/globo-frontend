import Menu from '../../components/menu'
import { RiDashboardFill } from 'react-icons/ri';
import ChartCPU from '../../components/charts/chartCPU'
import ChartCluster from '../../components/charts/chartCluster'
import ChartStatus from '../../components/charts/chartStatus'

import './style.css'

function Main() {
  return (
    <>
      <div>
        <Menu />
      </div>
      <div id="box-main">
        <div className="container-title">
          <div className="page-title">
            <RiDashboardFill size="30" color="#FEA756"/>
            <span className="title-name">Dashboard</span>
          </div>
        </div>

        <div id="container">
          
          <div className="box-chart">
            <div className="chart-name">
              <strong>Consumo de CPU</strong>
            </div>
            <div className="chart-content">
              <ChartCPU></ChartCPU>
            </div>
          </div>
          
          <div className="box-chart">
            <div className="chart-name">
              <strong>Consumo de Memória</strong>
            </div>
            <div className="chart-content">
              <ChartCluster></ChartCluster>
            </div>
          </div>

          <div className="box-chart">
            <div className="chart-name">
              <strong>Status do Cluster</strong>
            </div>
            <div className="chart-content">
              <ChartStatus></ChartStatus>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main