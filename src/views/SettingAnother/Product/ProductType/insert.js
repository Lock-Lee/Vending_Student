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

import { Loading } from "../../../../component/revel-strap";

import ProductTypeModel from "../../../../models/ProductTypeModel";

import Modalkeyboard from "../../../../component/modals/ModalKeyboard";

const producttype_model = new ProductTypeModel();

class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      code_validate: {
        value: "",
        status: "",
        class: "",
        text: "",
      },
      product_type_code: "",
      product_type_name: "",
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const now = new Date();
    const last_code = await producttype_model.generateProductTypeLastCode({
      code: `PTC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    this.setState({
      loading: false,

      product_type_code: last_code.data,
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
          const res = await producttype_model.insertProductType({
            product_type_code: this.state.product_type_code,
            product_type_name: this.state.product_type_name,
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/product/product-type");
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
    if (this.state.product_type_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_type_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อ !",
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _inputdata = (e) => {
    this.setState({
      product_type_name: e,
      show_modal: false,
    });
  };

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/product/product-type">
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
                <lable>
                  <center>
                    <h1> เพิ่มประเภทสินค้า</h1>
                  </center>
                </lable>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={4}>
                  <label>
                    รหัสประเภทสินค้า{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.product_type_code}
                    readOnly
                    onChange={(e) =>
                      this.setState({ product_type_code: e.target.value })
                    }
                    placeholder="รหัสประเภทสินค้า"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ชื่อประเภทสินค้า{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group">
                      <Input
                        type="text"
                        value={this.state.product_type_name}
                        placeholder="ชื่อประเภทสินค้า"
                        onChange={(e) =>
                          this.setState({ product_type_name: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ชื่อประเภทสินค้า",
                              data_modal: this.state.product_type_name,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div> */}
                    </div>
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
                style={{ height: "80px", width: "120px" }}
                color="danger"
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

export default Insert;
