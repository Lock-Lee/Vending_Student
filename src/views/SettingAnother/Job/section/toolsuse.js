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
export class Toolsuse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],

      job_op_tools_uses: [],

      active_tab: "",
    };
  }
  componentDidUpdate() {}
  componentDidMount() {
    this.setState({
      job_op_tools_uses: this.props.item_op_tools_uses,
    });
  }
  _handleRequestProduct = async (keyword, page, maxResults) => {
    const products = await product_model.getProductBy({
      keyword: keyword,
      params: { pagination: { current: page, pageSize: maxResults } },
    });

    this.setState({
      products: products.data,
    });

    return {
      options: products.data.map((item) => ({
        key: `${item.product_code} - ${item.product_name}`,
        item: item,
      })),
      total: products.total,
    };
  };

  _setStateOPToolsUses(key, text, name) {
    let { job_op_tools_uses } = this.state;

    job_op_tools_uses[key] = text;
    if (name) job_op_tools_uses.product_name = name;

    this.props.onChange(job_op_tools_uses);

    this.setState({
      job_op_tools_uses: job_op_tools_uses,
    });
  }

  render() {
    const machine_status_options = [
      { value: "Active", label: "ทำงาน" },
      { value: "Inactive", label: "เลิกทำงาน" },
    ];
    return (
      <tr key={"index_op_tools_uses_" + this.props.index_op_tools_uses}>
        <td>
          <AsyncTypeahead
            value={this.props.item_op_tools_uses.product_code}
            defaultSelected={
              this.props.item_op_tools_uses.product_code
                ? `${this.props.item_op_tools_uses.product_code} - ${this.props.item_op_tools_uses.product_name}`
                : ""
            }
            onChange={(e) =>
              this._setStateOPToolsUses(
                "product_code",
                e[0].item.product_code,
                e[0].item.product_name
              )
            }
            handleRequestItem={this._handleRequestProduct}
            placeholder="สินค้า..."
            showValid={true}
            useCache={false}
          />
        </td>
        <td>
          <Input
            type="text"
            value={this.props.item_op_tools_uses.toollife}
            onChange={(e) =>
              this._setStateOPToolsUses("toollife", e.target.value)
            }
            placeholder="อายุของสินค้า"
          />
        </td>
        <td>
          <Input
            type="text"
            value={this.props.item_op_tools_uses.job_op_tools_use_min}
            onChange={(e) =>
              this._setStateOPToolsUses("job_op_tools_use_min", e.target.value)
            }
            placeholder="จำนวนที่ใช้น้อยสุด"
          />
        </td>
        <td>
          <Input
            type="text"
            value={this.props.item_op_tools_uses.job_op_tools_use_max}
            onChange={(e) =>
              this._setStateOPToolsUses("job_op_tools_use_max", e.target.value)
            }
            placeholder="จำนวนที่ใช้มากสุด"
          />
        </td>
        <td>
          <Input
            type="text"
            value={this.props.item_op_tools_uses.job_op_tools_use_reorder}
            onChange={(e) =>
              this._setStateOPToolsUses(
                "job_op_tools_use_reorder",
                e.target.value
              )
            }
            placeholder="สั่งซื้อ"
          />
        </td>
        <td>
          <Select
            options={machine_status_options}
            value={this.props.item_op_tools_uses.job_op_tools_use_inactive}
            onChange={(e) => {
              this._setStateOPToolsUses("job_op_tools_use_inactive", e);
            }}
          />
        </td>
        <td>
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

export default Toolsuse;
