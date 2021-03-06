import React from "react";
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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  DatePicker,
  Loading,
  Select,
  AsyncTypeahead,
} from "../../../component/revel-strap";
import { TimeFormat } from "../../../utils";
import JobModel from "../../../models/JobModel";
import ProductModel from "../../../models/ProductModel";
import MachineModel from "../../../models/MachineModel";
import { BaseServerFile } from "../../../utils";
import Op from "./section/op";
import Job from "./section/job";
const time_format = new TimeFormat();
const job_model = new JobModel();
const product_model = new ProductModel();
const machine_model = new MachineModel();
const base_server_file = new BaseServerFile();

class Update extends React.Component {
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
      job_ops: [],
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.is_render == false ? false : true;
  }

  async _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const jobs_data = await job_model.getJobByCode({
          job_code: code,
        });

        this.setState({
          job: jobs_data.data,
          job_ops:
            jobs_data.data.job_ops !== undefined ? jobs_data.data.job_ops : [],
          loading: false,
        });
      }
    );
  }

  _addJobOp() {
    let { job_ops, job } = this.state;
    job_ops.push({
      job_op_code: "",
      job_code: job.job_code,
      job_op_name: "",
      job_op_no: "",
      job_op_machines: [],
      job_op_tools: [],
    });
    this.setState({ job_ops: job_ops, is_render: true });
  }
  _deleteRow_OP(index_op) {
    let { job_ops } = this.state;
    job_ops.splice(index_op, 1);
    this.setState(
      {
        job_ops: job_ops,
        is_render: true,
      },
      () => {
        this._refreshData();
      }
    );
  }
  _checkSubmit() {
    if (this.state.job.job_name === "") {
      Swal.fire({
        title: "??????????????????????????????????????? !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_no === "") {
      Swal.fire({
        title: "??????????????????????????????????????????????????? !",
        text: "Please Enter No",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_cpp === "") {
      Swal.fire({
        title: "???????????????????????????????????????????????????????????????  !",
        text: "Please Enter cpp",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_hardness === "") {
      Swal.fire({
        title: "???????????????????????????????????????????????????????????????????????????!",
        text: "Please Enter hardness",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_material === "") {
      Swal.fire({
        title: "???????????????????????????????????????????????????  !",
        text: "Please Enter material",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_start === "") {
      Swal.fire({
        title: "????????????????????????????????????????????????????????????????????????????????? !",
        text: "Please Enter date start",
        icon: "warning",
      });
      return false;
    } else if (this.state.job.job_end === "") {
      Swal.fire({
        title: "??????????????????????????????????????????????????????????????????????????????????????? !",
        text: "Please Enter date end",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _refreshData() {
    this.setState({
      job: this.state.job,
      job_ops: this.state.job_ops,
    });
  }
  _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          let { job, job_ops } = this.state;

          job.addby = this.props.user_code;
          job.job_start = time_format.dateToStr(job.job_start);
          job.job_end = time_format.dateToStr(job.job_end);

          for (let job_op of job_ops) {
            for (let job_op_tool of job_op.job_op_tools) {
              if (job_op_tool.job_op_tools_drawing !== null) {
                job_op_tool.job_op_tools_drawing =
                  await base_server_file?.uploadFile({
                    src: job_op_tool.job_op_tools_drawing,
                    upload_path: this.state.upload_path,
                  });
              }
            }
          }

          job = { ...job, job_ops: job_ops };
          this.setState({
            job: job,
          });
          const res = await job_model.updateJobBy({
            job: job,
          });

          if (res.require) {
            Swal.fire({ title: "?????????????????????????????????????????????????????? !", icon: "success" });
            this.props.history.push("/settinganother/job");
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                Swal.fire({
                  title: "??????????????????????????????????????????????????????????????????????????? !",
                  icon: "error",
                });
              }
            );
          }
        }
      );
    }
  }
  _onReset() {
    this._fetchData();
  }
  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Form onSubmit={(event) => this._handleSubmit(event)}>
          <Card>
            <CardHeader>
              <Row>
                {" "}
                <Col>
                  {" "}
                  <Link to="/settinganother/job">
                    <Button
                      type="button"
                      style={{ height: "80px", width: "120px" }}
                    >
                      {" "}
                      <i className="fas fa-arrow-left"></i>
                    </Button>
                  </Link>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <h1>????????????????????????</h1>{" "}
                </Col>
                <Col></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Job
                job={this.state.job}
                onChange={(e) => {
                  this.setState({
                    job: e,
                    is_render: false,
                  });
                }}
              />
              {this.state.job_ops.map((item_op, index_op) => {
                return (
                  <Op
                    key={"op_" + index_op}
                    job_op={item_op}
                    index_op={index_op}
                    onDelete={() => {
                      this._deleteRow_OP(index_op);
                    }}
                    onChange={(item) => {
                      let { job_ops } = this.state;
                      job_ops[index_op] = item;
                      this.setState({
                        job_ops: job_ops,
                        is_render: false,
                      });
                    }}
                  ></Op>
                );
              })}
              <Row>
                <Col md={12} className="text-center">
                  <span
                    className="text-button "
                    onClick={() => this._addJobOp()}
                  >
                    <i className="fa fa-plus" aria-hidden="true" />{" "}
                    ??????????????????????????????????????????
                  </span>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                ??????????????????
              </Button>
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                ??????????????????
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Update;
