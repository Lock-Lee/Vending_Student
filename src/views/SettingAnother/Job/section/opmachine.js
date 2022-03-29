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

const time_format = new TimeFormat();
const job_model = new JobModel();
const product_model = new ProductModel();
const machine_model = new MachineModel();
const base_server_file = new BaseServerFile();

export class Opmachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      machines: [],
      upload_path: "job/",
      job_op_machines: [],
      active_tab: "",
    };
  }
  componentDidMount() {
    this.setState({
      job_op_machines: this.props.item_op_machine,
    });
  }
  _handleRequestMachine = async (keyword, page, maxResults) => {
    const machines = await machine_model.getMachineBy({
      keyword: keyword,
      params: { pagination: { current: page, pageSize: maxResults } },
    });

    this.setState({
      machines: machines.data,
    });

    return {
      options: machines.data.map((item) => ({
        key: `${item.machine_code} - ${item.machine_name}`,
        item: item,
      })),
      total: machines.total,
    };
  };
  _setStateOPMachine(key, text, name = "") {
    let { job_op_machines } = this.state;

    job_op_machines[key] = text;
    if (key == "date_start" || key == "date_end") {
      job_op_machines[key] = time_format.dateToStr(text);
    }

    if (name) {
      job_op_machines.machine_name = name;
    }
    this.props.onChange(job_op_machines);
    this.setState({
      job_op_machines: job_op_machines,
    });
  }

  render() {
    return (
      <tr key={"index_op_machine_" + this.props.index_op_machine}>
        <td>{this.props.index_op_machine + 1}</td>
        <td>
          <AsyncTypeahead
            value={this.props.item_op_machine.machine_code}
            defaultSelected={
              this.props.item_op_machine.machine_code
                ? `${this.props.item_op_machine.machine_code} - ${this.props.item_op_machine.machine_name}`
                : ""
            }
            onChange={(e) =>
              this._setStateOPMachine(
                "machine_code",
                e[0].item.machine_code,
                e[0].item.machine_name
              )
            }
            handleRequestItem={this._handleRequestMachine}
            placeholder="สินค้า..."
            showValid={true}
            useCache={false}
          />
        </td>
        <td>
          <Input
            type="text"
            value={this.props.item_op_machine.production}
            onChange={(e) =>
              this._setStateOPMachine("production", e.target.value)
            }
            placeholder="จำนวนการผลิตต่อวัน"
          />
        </td>
        <td>
          <DatePicker
            format={"DD/MM/YYYY"}
            value={time_format.dateToStr(this.props.item_op_machine.date_start)}
            onChange={(e) => {
              this._setStateOPMachine("date_start", e);
            }}
          />
        </td>
        <td>
          <DatePicker
            format={"DD/MM/YYYY"}
            value={time_format.dateToStr(this.props.item_op_machine.date_end)}
            onChange={(e) => this._setStateOPMachine("date_end", e)}
          />
        </td>
        <td>
          {" "}
          <button
            type="button"
            className="icon-button color-danger float-right"
            title="ลบรายการ"
            onClick={() => this.props.onDelete()}
          >
            <i className="fa fa-times-circle fa-2x" aria-hidden="true" />
          </button>
        </td>
      </tr>
    );
  }
}

export default Opmachine;
