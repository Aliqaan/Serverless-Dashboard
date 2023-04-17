import React from "react";
import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";

import { generateChartConfig } from "variables/charts.js";

import getMetrics from "services/GetMetrics";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Col,
    Row
  } from "reactstrap";

var ps;



function MonitorGraph(props) {

    const [memoryData, setMemoryData] = useState([]);
    const [cpuData, setCPUData] = useState([]);

    useEffect(() => {
    getMetrics(true).then(res => {
        setMemoryData(res.data)
    })
    getMetrics(false).then(res => {
        setCPUData(res.data)
    })
    }, []);

  return (
    <>
      <div className="content">
        {memoryData.result &&
        <Row>  
        <Col lg="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" /> Available Memory (Bytes)
              </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    <Line
                        data={generateChartConfig(memoryData.result[0].values.map(
                            value => new Date(value[0] * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false})
                            ), 
                            memoryData.result[0].values.map(value => value[1]),
                            'Available Memory'
                            ).data
                        }
                        options={generateChartConfig(memoryData.result[0].values.map(
                            value => new Date(value[0] * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false})
                            ), 
                            memoryData.result[0].values.map(value => value[1]),
                            'Available Memory'
                            ).options
                        }
                    />
              </div>
            </CardBody>
          </Card>
        </Col>
        </Row>
        }
        {cpuData.result &&
        <Row>  
        <Col lg="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" /> CPU Usage (%)
              </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    <Line
                        data={generateChartConfig(cpuData.result[0].values.map(
                            value => new Date(value[0] * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false})
                            ), 
                            cpuData.result[0].values.map(value => value[1]),
                            'CPU Usage'
                            ).data
                        }
                        options={generateChartConfig(cpuData.result[0].values.map(
                            value => new Date(value[0] * 1000).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:false})
                            ), 
                            cpuData.result[0].values.map(value => value[1]),
                            'CPU Usage'
                            ).options
                        }
                    />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
        }
      </div>
    </>
  );
}

export default MonitorGraph;