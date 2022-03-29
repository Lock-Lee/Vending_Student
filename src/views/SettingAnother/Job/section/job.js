import React, { Component } from "react";
import {
  Button,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Nav,
  Row,
  Form,
  CardFooter,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import {
  DatePicker,
  Loading,
  Select,
  AsyncTypeahead,
} from "../../../../component/revel-strap";
import JobModel from "../../../../models/JobModel";
const job_model = new JobModel();
export class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      products: [],
      machines: [],
      upload_path: "job/",
      job: {
        job_code: "",
        job_name: "",
        job_no: "",
        job_cpp: "",
        job_start: "",
        job_end: "",
        job_hardness: "",
        job_material: "",
        deleted: "0",
        addby: "",
        adddate: "",
      },
    };
  }
  componentDidMount() {
    this.setState({
      job: this.props.job,
    });
  }
  componentDidUpdate(props_old) {
    if (props_old.job.job_code === "" && this.props.job.job_code) {
      this._fetchData();
    }
  }

  async _fetchData() {
    this.setState(
      {
        loading: true,
        job: this.props.job,
      },
      async () => {
        this.setState({
          loading: false,
        });
      }
    );
  }
  _changeJob(key, text) {
    let job = this.state.job;
    this.state.job[key] = text;

    this.setState({
      job: job,
      is_render: true,
    });
    this.props.onChange(job);
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md={4}>
              <label>
                รหัสงาน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_code}
                onChange={(e) => this._changeJob("job_code", e.target.value)}
                placeholder="รหัสงาน"
                readOnly
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={4}>
              <label>
                ชื่องาน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_name}
                onChange={(e) => this._changeJob("job_name", e.target.value)}
                placeholder="ชื่องาน"
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={4}>
              <label>
                ลำดับงาน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_no}
                onChange={(e) => this._changeJob("job_no", e.target.value)}
                placeholder="ลำดับงาน"
              />
              <p className="text-muted">Example : </p>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <label>
                จำนวนการผลิต{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_cpp}
                onChange={(e) => this._changeJob("job_cpp", e.target.value)}
                placeholder="จำนวนการผลิต"
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={4}>
              <label>
                วัสดุ{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_material}
                onChange={(e) =>
                  this._changeJob("job_material", e.target.value)
                }
                placeholder="วัสดุ"
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={4}>
              <label>
                ความแข็งของวัสดุ{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.job.job_hardness}
                onChange={(e) =>
                  this._changeJob("job_hardness", e.target.value)
                }
                placeholder="ความแข็งของวัสดุ"
              />
              <p className="text-muted">Example : </p>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <label>
                  วันที่เริ่มการผลิต{" "}
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  value={this.state.job.job_start}
                  onChange={(e) => this._changeJob("job_start", e)}
                />
                <p className="text-muted">Example : 01/01/2020.</p>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label>
                  วันที่สิ้นสุดการผลิต{" "}
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  value={this.state.job.job_end}
                  onChange={(e) => this._changeJob("job_end", e)}
                />
                <p className="text-muted">Example : 01/01/2020.</p>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Job;
