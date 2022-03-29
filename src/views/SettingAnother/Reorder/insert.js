import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Loading, Select } from "../../../component/revel-strap";

import ReorderModel from "../../../models/ReorderModel";
import SupplierModel from "../../../models/SupplierModel";
import ManageProductSupplier from "./component/reoder-list";
import ReportModel from "../../../models/ReportModel";

const report_model = new ReportModel();
const reoder_model = new ReorderModel();
const supplier_model = new SupplierModel();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      reorders_code: "",
      reorders_date: "",
      suppliers_code: "",
      reorders_name: "",
      reoders_remark: "",
      reoders_usercreator: "",
      adddate: "",
      updateby: "",
      lastupdate: "",
      supplier: [],
      product_list: [],
    };
  }

  async componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const now = new Date();
    const reorders_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${now.getDate().toString()}`;

    const adddate = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${now
      .getDate()
      .toString()
      .padStart(2, "0")}${"  "}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${":"}${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}${":"}${now.getSeconds().toString().padStart(2, "0")}`;

    const last_code = await reoder_model.getReorderLastCode({
      code: `RO${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    const supplier = await supplier_model.getSupplierBy();

    this.setState({
      loading: false,
      supplier: supplier.data,
      reorders_code: last_code.data,
      reorders_date: reorders_date,
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
          let {
            reorders_code,
            reorders_date,
            reorders_name,
            suppliers_code,
            reoders_remark,
            product_list,
            addby,
            adddate,
            reoders_usercreator,
          } = this.state;

          const res = await reoder_model.insertReorder({
            reorders_code: reorders_code,
            reorders_date: reorders_date,
            suppliers_code: suppliers_code,
            reorders_name: reorders_name,
            reoders_remark: reoders_remark,
            reoders_usercreator: reoders_usercreator,
            addby: addby,
            adddate: adddate,
            product_list: product_list,
          });
          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/reorder");
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                Swal.fire({
                  title: "เกิดข้อผิดพลาดในการบันทึก !",
                  icon: "error",
                });
              }
            );
          }
        }
      );
    }
  }

  _checkSubmit() {
    if (this.state.reorders_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัสผู้ขาย !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.reorders_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อใบสั่งซื้อ  !",
        text: "Please Enter Re-order Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.reoders_usercreator === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อผู้จัดทำ  !",
        text: "Please Enter User Name",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _onReset() {}
  render() {
    const supplier_option = [
      { label: "- เลือกผู้ผลิต  -", value: "" },
      ...this.state.supplier.map((item) => ({
        value: item.supplier_code,
        label: item.supplier_name,
      })),
    ];

    return (
      <div>
        {/* <Loading show={this.state.loading} /> */}
        <Card>
          <CardHeader>
            <Row>
              {" "}
              <Col>
                {" "}
                <Link to="/settinganother/reorder">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col>
                {" "}
                <center>
                  {" "}
                  <h3 className="text-header">เพิ่มใบสั่งซื้อ / Add Order</h3>
                </center>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <label>
                      วันที่{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.reorders_date}
                      readOnly
                      onChange={(e) =>
                        this.setState({ reorders_date: e.target.value })
                      }
                    />
                    <p className="text-muted"> Example : -.</p>
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <label>
                    รหัสใบสั่งซื้อ{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.reorders_code}
                    onChange={(e) =>
                      this.setState({ reorders_code: e.target.value })
                    }
                    readOnly
                    placeholder="รหัสใบสั่งซื้อ"
                  />
                  <p className="text-muted">Example : SP01.</p>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col md={3}>
                  <FormGroup>
                    <label>
                      ชื่อใบสั่งซื้อ{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.reorders_name}
                      onChange={(e) =>
                        this.setState({ reorders_name: e.target.value })
                      }
                      placeholder="ชื่อใบสั่งซื้อ"
                    />
                    <p className="text-muted"> Example : -.</p>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <label>
                      ผู้จัดทำ{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.reoders_usercreator}
                      onChange={(e) =>
                        this.setState({ reoders_usercreator: e.target.value })
                      }
                      placeholder="ผู้จัดทำ"
                    />
                    <p className="text-muted"> Example : -.</p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <label>รายละเอียด </label>
                    <Input
                      type="textarea"
                      value={this.state.reoders_remark}
                      onChange={(e) =>
                        this.setState({ reoders_remark: e.target.value })
                      }
                      placeholder="รายละเอียด"
                    />
                    <p className="text-muted">Example : -.</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ManageProductSupplier
                    onRefresh={({ product_list }) =>
                      this.setState({
                        product_list: product_list,
                      })
                    }
                    reorders_code={this.state.reorders_code}
                  />
                </Col>
              </Row>
            </CardBody>

            <CardFooter className="text-right">
              <Button
                type="reset"
                onClick={() => this._onReset()}
                color="danger"
                style={{ height: "80px", width: "120px" }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="success"
                style={{ height: "80px", width: "120px" }}
              >
                Save
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Insert;
