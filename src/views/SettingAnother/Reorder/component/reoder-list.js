import React from "react";
import { Input } from "reactstrap";

import { Select } from "../../../../component/revel-strap";
import ProductModel from "../../../../models/ProductModel";
import SupplierModel from "../../../../models/SupplierModel";
import ProductSupplierModel from "../../../../models/ProductSupplierModel";
import ModalKeyboardNumPad from "../../../../component/modals/ModalKeyboardNumPad";
import ReportModel from "../../../../models/ReportModel";
import ReorderListModel from "../../../../models/ReorderListModel";

const product_model = new ProductModel();
const report_model = new ReportModel();
const reoderlist_model = new ReorderListModel();
const product_supplier_model = new ProductSupplierModel();
const supplier_model = new SupplierModel();

class ManageProductSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_modal: false,
      title_modal: "",
      data_modal: "",
      product_code: "",
      product_list: [],
      product: [],
    };
  }

  async componentDidMount() {
    // this._getsupplier();

    this._fetchData();
  }

  componentDidUpdate(props_old) {
    if (props_old.reorders_code === "" && this.props.reorders_code) {
      this._fetchData();
    }
  }

  _fetchData() {
    let reorders_code = this.props.reorders_code;

    this.setState(
      {
        show_modal: false,
      },
      async () => {
        const product = await product_model.getProductALLByGroup({
          product_group_code: "",
          product_type_code: "",
          keyword: "",
        });

        const redoerlist = await reoderlist_model.getReorderListByReordersCode({
          reorders_code: reorders_code,
        });

        if (redoerlist.data.length > 0) {
          this.setState(
            {
              product: product.data[0],
              product_list: redoerlist.data,
            },
            () => {
              this._refreshData();
            }
          );
        } else {
          this.setState(
            {
              product: product.data[0],
            },
            () => {
              this._refreshData();
            }
          );
        }
      }
    );
  }

  async _getsupplier() {
    const product = await product_model.getProductBy();

    this.setState({
      product: product.data,
    });
  }

  _addRow() {
    this.setState((state) => {
      return {
        product_list: [
          ...state.product_list,
          {
            product_code: "",
            product_name: "",
            reoder_list_price: "",
            reoder_list_qty: "",
            reoder_list_total: "",
          },
        ],
      };
    });
  }

  _deleteRow(idx) {
    this.setState(
      (state) => {
        state.product_list.splice(idx, 1);

        return {
          product_list: state.product_list,
        };
      },
      () => {
        this._refreshData();
      }
    );
  }

  _handleListChange = (name, e, idx) => {
    const { value } = e.target;

    let { product_list } = this.state;
    product_list[idx][name] = value;
    product_list[idx]["reoder_list_total"] = parseInt(
      product_list[idx]["reoder_list_price"] *
        product_list[idx]["reoder_list_qty"]
    );

    this.setState(
      {
        product_list: product_list,
      },
      () => {
        this._refreshData();
      }
    );
  };

  _refreshData() {
    this.props.onRefresh({
      product_list: this.state.product_list,
    });
  }

  _onSelect(value, idx) {
    let product_list = this.state.product_list;
    let product = this.state.product;

    product_list.map((item, index) => {
      if (index === idx) {
        let sup_val = product.find((item) => item.product_code == value);

        // product_list[idx]["reoder_list_price"] = sup_val.product_price;
        // product_list[idx]["reoder_list_total"] = parseInt(
        //   sup_val.product_price * product_list[idx]["reoder_list_qty"]
        // );

        item.product_code = value;
        item.product_name = sup_val.product_name;
      }
    });

    this.setState(
      {
        product_list: product_list,
      },
      () => console.log("product_list", product_list)
    );
  }

  render() {
    const product_options = this.state.product.map((item) => ({
      value: item.product_code,
      label: "[" + item.article_code + "]" + "-" + item.product_name,
    }));

    return (
      <div>
        <h5>รายการ </h5>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th className="text-center" width={36}>
                ลำดับ{" "}
              </th>
              <th className="text-center" width={240}>
                ชื่อสินค้า
              </th>
              <th className="text-center" width={240}>
                จำนวน
              </th>
              {/* <th className="text-center" width={240}>
                ราคาต่อชิ้น
              </th>
              <th className="text-center" width={240}>
                ราคารวม
              </th> */}

              <th className="text-center" width={48}></th>
            </tr>
          </thead>
          <tbody>
            {this.state.product_list.map((item, idx) => (
              <tr key={"product_list" + idx}>
                <td className="align-middle text-center">{idx + 1}</td>
                <td>
                  <Select
                    options={product_options}
                    value={item.product_code}
                    onChange={(e) => {
                      this._onSelect(e, idx);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    className="float text-right"
                    value={item.reoder_list_qty}
                    onChange={(e) => {
                      this._handleListChange("reoder_list_qty", e, idx);
                    }}
                    placeholder="จำนวน"
                    required
                  />
                </td>
                {/* <td>
                  <Input
                    type="number"
                    className="float text-right"
                    value={item.reoder_list_price}
                    disabled
                    // onChange={(e) =>
                    //   this._handleListChange("reoder_list_price", e, idx)
                    // }
                    placeholder="ราคา"
                    required
                  />
                </td> */}
                {/* <td>
                  <Input
                    type="number"
                    className="float text-right"
                    value={item.reoder_list_total}
                    disabled
                    // onChange={(e) =>
                    //   this._handleListChange("reoder_list_total", e, idx)
                    // }
                    placeholder="ราคารวม"
                    required
                  />
                </td> */}

                <td className="text-center">
                  <button
                    type="button"
                    className="icon-button color-danger container center"
                    onClick={() => this._deleteRow(idx)}
                    title="ลบรายการ"
                  >
                    <i
                      className="fa fa-times-circle fa-2x"
                      aria-hidden="true"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" align="center">
                <span className="text-button" onClick={() => this._addRow()}>
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มรายการ
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
        <ModalKeyboardNumPad
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          idx={this.state.idx}
          layoutName={this.state.layoutName}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />
      </div>
    );
  }
}

export default ManageProductSupplier;
