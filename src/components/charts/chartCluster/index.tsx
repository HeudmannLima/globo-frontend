import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Line } from "react-chartjs-2";

export default function ChartCluster() {
  const [labels, setLabels] = useState([])
  const [dataset, setDataset] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.apiChart.get('v3/d23c3262-967e-4567-b7f6-2fd263748811');
      setLabels(data.labels);
      setDataset(data.data);
    })();
  }, []);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Elastic Search Cluster Memory",
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