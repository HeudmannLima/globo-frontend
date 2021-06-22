import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Line } from "react-chartjs-2";

enum StatusData {
  GREEN = 'green',
  RED = 'red',
}

export default function ChartStatus() {
  const [status, setStatus] = useState(0)

  useEffect(() => {
    (async () => {
      const { data } = await api.apiChart.get('v3/cab2791c-7c85-4461-b95c-86bc1a12dc72');

      if (data.status === StatusData.GREEN) {
        setStatus(1);
      } else if (data.status === StatusData.RED){
        setStatus(0);
      }
      
    })();
  }, []);
  
  const data = {
    labels: ['Status'],
    datasets: [
      {
        label: "Elastic Search Cluster Status",
        data: [status],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <Line type="line" data={data} />
  );
}