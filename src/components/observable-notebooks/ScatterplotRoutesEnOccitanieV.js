import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@aotten/scatterplot-routes-en-occitanie-v2-0";

const ScatterplotRoutesEnOccitanieV = () => {
  const viewofSelect_valeurRef = useRef();
  const viewofSelect_deptRef = useRef();
  const chart_linRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "viewof select_valeur") return new Inspector(viewofSelect_valeurRef.current);
      if (name === "viewof select_dept") return new Inspector(viewofSelect_deptRef.current);
      if (name === "chart_lin") return new Inspector(chart_linRef.current);
      return ["graph_svg","graph_png","chart","log_graph_svg","log_graph_png","data_road_type","yScale","yScale_lin","tooltip","data_","yAxis","yAxis_lin","data","data_sum_","xScale","xScale_lin","data_sum","xAxis","xAxis_lin","row_chart","row_chart_svg","row_chart_png"].includes(name);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={viewofSelect_valeurRef} />
      <div ref={viewofSelect_deptRef} />
      <div width="500px" ref={chart_linRef} />
      <p>Credit: <a href="https://observablehq.com/@aotten/scatterplot-routes-en-occitanie-v2-0"> Scatterplot routes en occitanie V2.0 by Alain Ottenheimer</a></p>
    </>
  );
}

export default ScatterplotRoutesEnOccitanieV;