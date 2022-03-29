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
import { Select } from "../../../../component/revel-strap";
import { Loading } from "../../../../component/revel-strap";
import Modalkeyboard from "../../../../component/modals/ModalKeyboard";

import StockModel from "../../../../models/StockModel";

const Stock_model = new StockModel();

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      stock_code: "",
      stock_name: "",
      stock_type: "",
      remark: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;
        const stock = await Stock_model.getStockByCode({ stock_code: code });

        if (stock.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/settinganother/stock/stock");
        } else if (stock.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/stock");
        } else {
          const { stock_code, stock_name, stock_type, remark } = stock.data[0];

          this.setState({
            loading: false,
            stock_code: stock_code,
            stock_name: stock_name,
            stock_type: stock_type,
            remark: remark,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await Stock_model.updateStock({
        stock_code: this.state.stock_code,
        stock_name: this.state.stock_name,
        stock_type: this.state.stock_type,
        remark: this.state.remark,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/stock/stock");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.stock_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.stock_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อ !",
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.stock_type === "") {
      Swal.fire({
        title: "กรุณาระบุประเภทตู้ !",
        text: "Please Enter Type Stock",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _inputdata = (e) => {
    if (this.state.title_modal === "ชื่อคลัง") {
      this.setState({
        stock_name: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "คำอธิบาย") {
      this.setState({
        remark: e,
        show_modal: false,
      });
    }
  };

  render() {
    const stock_type = [
      { label: "- เลือกประเภทตู้  -", value: "" },
      { label: " Locker ", value: "Locker" },
      { label: " Rotating ", value: "Rotating" },
    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col md={3}>
                {" "}
                <Link to="/settinganother/stock/stock">
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
                  <h1>แก้ไขตู้</h1>
                </center>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={3}>
                  <label>
                    รหัสตู้
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    readOnly
                    type="text"
                    value={this.state.stock_code}
                    onChange={(e) =>
                      this.setState({ stock_code: e.target.value })
                    }
                    placeholder="รหัสคลัง"
                  />
                  <p className="text-muted">Example : SC001</p>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <label>
                      ชื่อตู้
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.stock_name}
                        placeholder="ชื่อคลัง"
                        onChange={(e) =>
                          this.setState({ stock_name: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ชื่อคลัง",
                              data_modal: this.state.stock_name,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div> */}
                    </div>
                    <p className="text-muted"> Example :</p>
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <label>ประเภทตู้</label>
                  <font color="#F00">
                    <b>*</b>
                  </font>
                  <Select
                    options={stock_type}
                    value={this.state.stock_type}
                    onChange={(e) => this.setState({ stock_type: e })}
                  />
                  <p className="text-muted"> Example: </p>

                </Col>

                <Col md={3}>
                  <FormGroup>
                    <label>คำอธิบาย</label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.remark}
                        placeholder="คำอธิบาย"
                        onChange={(e) =>
                          this.setState({ remark: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "คำอธิบาย",
                              data_modal: this.state.remark,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div> */}
                    </div>
                    <p className="text-muted"> Example: </p>
                  </FormGroup>
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
                color="danger"
                style={{ height: "80px", width: "120px" }}
                onClick={() =>
                  this.setState({ stock_code: "", stock_name: "", remark: "" })
                }
              >
                รีเซ็ต
              </Button>
            </CardFooter>
          </Form>
        </Card>
        {/* <Modalkeyboard
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        /> */}
      </div>
    );
  }
}

export default Update;
