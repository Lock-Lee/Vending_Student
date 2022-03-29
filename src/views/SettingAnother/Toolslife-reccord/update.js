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
import { TimeFormat } from "../../../utils";
import { Loading, Select, DatePicker } from "../../../component/revel-strap";

import ToolsLifeRecordModel from "../../../models/ToolsLifeRecordModel";
import ProductModel from "../../../models/ProductModel";
const tools_model = new ToolsLifeRecordModel();
const product_model = new ProductModel();
const time_format = new TimeFormat();
class update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      records_code: "",
      product_code: "",
      records_date: "",
      record_toolife: "",
      addby: "",
      adddate: "",
      updateby: "",
      lastupdate: "",
      prodcut: [],
    };
  }

  async componentDidMount() {
    const now = new Date();
    const { code } = this.props.match.params;
    const last_code = await tools_model.getToolsLifeRecordLastCode({
      code: `RC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    const prodcut = await product_model.getProductBy();
    const records = await tools_model.getToolsLifeRecordByCode({
      records_code: code,
    });

    const { records_code, product_code, records_date, record_toolife } =
      records.data[0];
    this.setState({
      records_code: records_code,
      product_code: product_code,
      records_date: records_date,
      record_toolife: record_toolife,
      prodcut: prodcut.data,
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        loading: true,
      },
      async () => {
        if (this._checkSubmit()) {
          const res = await tools_model.updateToolsLifeRecordBy({
            records_code: this.state.records_code,
            product_code: this.state.product_code,
            records_date: time_format.dateToStr(this.state.records_date),
            record_toolife: this.state.record_toolife,
          });
          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/ToolslifeReccord");
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
      }
    );
  }
  _onReset() {
    this.setState({});
  }

  _checkSubmit() {
    if (this.state.product_code === "") {
      Swal.fire("กรุณาเลือกสินค้า !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.records_date === "") {
      Swal.fire("กรุณากรอกวันที่ !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.record_toolife === "") {
      Swal.fire("กรุณากรอกอายุ !", "", "error");
      this.setState({
        loading: false,
      });
    } else {
      return true;
    }
  }
  render() {
    const prodcut_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.prodcut.map((item) => ({
        label: item.product_name,
        value: item.product_code,
      })),
    ];

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/ToolslifeReccord">
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
                {" "}
                <lable>
                  <h3>แก้ไขสินค้าที่ใช้แล้ว </h3>
                </lable>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col>
                  <Row>
                    <Col md={3}>
                      {" "}
                      <label>
                        รหัสสินค้าที่ใช้แล้ว{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.records_code}
                        readOnly
                        onChange={(e) =>
                          this.setState({ records_code: e.target.value })
                        }
                        placeholder="records_code"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label>
                        {" "}
                        ชื่อสินค้า
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={prodcut_options}
                          value={this.state.product_code}
                          onChange={(e) => {
                            this.setState({
                              product_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      {" "}
                      <label>
                        วันที่{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <DatePicker
                        format={"DD/MM/YYYY"}
                        value={time_format.dateToStr(this.state.records_date)}
                        onChange={(e) => {
                          this.setState({
                            records_date: e,
                          });
                        }}
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      {" "}
                      <label>
                        จำนวนอายุการใช้งาน (ครั้ง){" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group-append">
                        <Input
                          type="text"
                          value={this.state.record_toolife}
                          placeholder="record_toolife"
                          onChange={(e) =>
                            this.setState({ record_toolife: e.target.value })
                          }
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                บันทึก
              </Button>
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                onChange={(e) => this._onReset()}
                color="danger"
              >
                {" "}
                รีเซ็ต
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default update;
