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
import { TimeFormat } from "../../../../utils";
import JobModel from "../../../../models/JobModel";
import ProductModel from "../../../../models/ProductModel";
import MachineModel from "../../../../models/MachineModel";
import { BaseServerFile } from "../../../../utils";
import Toolsuse from "./toolsuse";

const time_format = new TimeFormat();
const job_model = new JobModel();
const product_model = new ProductModel();
const machine_model = new MachineModel();
const base_server_file = new BaseServerFile();
export class Optools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      machines: [],
      job_op_tools: [],

      active_tab: "",
    };
  }

  componentDidMount() {
    this.setState({
      job_op_tools: this.props.job_op_tools,
    });
  }

  _addJobOPToolsUses() {
    let { job_op_tools } = this.state;
    job_op_tools.job_op_tools_uses.push({
      job_op_tools_use_code: "",
      job_op_tools_code: "",
      toollife: "",
      product_code: "",
      job_op_tools_use_min: "",
      job_op_tools_use_max: "",
      job_op_tools_use_reorder: "",
      job_op_tools_use_inactive: "",
    });

    this.setState({ job_op_tools: job_op_tools });
  }
  _setStateOPTools(key, text) {
    let { job_op_tools } = this.state;
    job_op_tools[key] = text;

    this.props.onChange(job_op_tools);

    this.setState({
      job_op_tools: job_op_tools,
    });
  }

  _handleFileChange(e) {
    const { job_op_tools } = this.state;
    if (e.target.files.length) {
      let file = new File([e.target.files[0]], e.target.files[0].name, {
        type: e.target.files[0].type,
      });

      if (file) {
        let reader = new FileReader();

        reader.onloadend = () => {
          job_op_tools.job_op_tools_drawing = {
            src: reader.result,
            file: file,
            old: job_op_tools?.job_op_tools_drawing?.old,
          };
          this.props.onChange(job_op_tools);
          this.setState({ job_op_tools: job_op_tools });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  _deleteRow_OP_Tools_uses(index_op_tools_uses) {
    let { job_op_tools_uses } = this.state.job_op_tools;
    job_op_tools_uses.splice(index_op_tools_uses, 1);
    this.setState(
      {
        job_op_tools_uses: job_op_tools_uses,
      },
      () => {}
    );
  }

  render() {
    return (
      <Card key={"index_op_tools__" + this.props.index_op_tools}>
        <CardBody>
          <CardHeader>
            ขั้นตอนที่ {this.props.index_op_tools + 1}
            <button
              type="button"
              className="icon-button color-danger float-right"
              title="ลบรายการ"
              onClick={() => this.props.onDelete()}
            >
              <i className="fa fa-times-circle fa-2x" aria-hidden="true" />
            </button>
          </CardHeader>

          <Row>
            <Col md={4}>
              <label>
                ชื่อขั้นตอน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                className="float text"
                value={this.props.job_op_tools.job_op_tools_name}
                onChange={(e) =>
                  this._setStateOPTools("job_op_tools_name", e.target.value)
                }
                placeholder="ชื่อขั้นตอน"
                required
              />
            </Col>
            <Col>
              <label>
                ลำดับขั้นตอน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                className="float text"
                value={this.props.job_op_tools.job_op_tools_no}
                onChange={(e) =>
                  this._setStateOPTools("job_op_tools_no", e.target.value)
                }
                placeholder="ลำดับขั้นตอน"
                required
              />
            </Col>
            <Col md={4}>
              {/* <label>
                เขียน{" "}
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="file"
                accept=""
                onChange={(e) => this._handleFileChange(e)}
              /> */}
            </Col>
          </Row>
          <Row>
            <CardBody>
              <table className="table table-bordered ">
                <thead>
                  <tr align="center">
                    <th width={150}>สินค้า</th>
                    <th width={150}>อายุ</th>
                    <th width={150}>จำนวนต่ำสุด</th>
                    <th width={150}>จำนวนสูงสุด</th>
                    <th width={150}>จุดสั่งซื้อใหม่</th>
                    <th width={150}>สถานะ</th>
                    <th width={20}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.job_op_tools.job_op_tools_uses?.map(
                    (item_op_tools_uses, index_op_tools_uses) => {
                      return (
                        <Toolsuse
                          key={"optoolsuse_" + index_op_tools_uses}
                          item_op_tools_uses={item_op_tools_uses}
                          index_op_tools_uses={index_op_tools_uses}
                          onDelete={() => {
                            this._deleteRow_OP_Tools_uses(index_op_tools_uses);
                          }}
                          onChange={(item) => {
                            let { job_op_tools } = this.state;
                            job_op_tools.job_op_tools_uses[
                              index_op_tools_uses
                            ] = item;
                            this.props.onChange(job_op_tools);
                            this.setState({
                              job_op_tools: job_op_tools,
                              is_render: false,
                            });
                          }}
                        ></Toolsuse>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" align="center">
                      <span
                        className="text-button"
                        onClick={() => this._addJobOPToolsUses()}
                      >
                        <i className="fa fa-plus" aria-hidden="true" />{" "}
                        เพิ่มสินค้า
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </CardBody>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Optools;
