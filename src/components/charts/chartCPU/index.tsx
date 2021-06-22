import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Line } from "react-chartjs-2";

export default function ChartCPU() {
  const [labels, setLabels] = useState([])
  const [dataset, setDataset] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.apiChart.get('/v3/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f');
      setLabels(data.labels);
      setDataset(data.data);
    })();
  }, []);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cpu Usage Data",
        data: dataset,
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