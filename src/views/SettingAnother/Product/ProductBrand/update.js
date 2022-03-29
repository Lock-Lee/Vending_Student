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
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Modalkeyboard from "../../../../component/modals/ModalKeyboard";
import ProductBrandModel from "../../../../models/ProductBrandModel";
const productbrand_model = new ProductBrandModel();

class Update extends React.Component {
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
      product_brand_code: "",
      product_brand_name: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const productbrand = await productbrand_model.getProductBrandByCode({
          product_brand_code: code,
        });

        if (productbrand.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/product-brand");
        } else if (productbrand.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/product-brand");
        } else {
          const { product_brand_code, product_brand_name } =
            productbrand.data[0];

          this.setState({
            loading: false,
            product_brand_code: product_brand_code,
            product_brand_name: product_brand_name,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await productbrand_model.updateProductBrandBy({
        product_brand_code: this.state.product_brand_code,
        product_brand_name: this.state.product_brand_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/product/product-brand");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.product_brand_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_brand_name === "") {
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
      product_brand_name: e,
      show_modal: false,
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            {" "}
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/product/product-brand">
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
                    {" "}
                    <h1> แก้ไขแบนด์สินค้า</h1>
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
                  <Label>
                    รหัสแบนด์สินค้า{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </Label>
                  <Input
                    type="text"
                    id="product_brand_code"
                    name="product_brand_code"
                    value={this.state.product_brand_code}
                    placeholder="รหัสแบนด์สินค้า"
                    readOnly
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ชื่อแบนด์สินค้า{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.product_brand_name}
                        placeholder="ชื่อแบนด์สินค้า"
                        onChange={(e) =>
                          this.setState({ product_brand_name: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ชื่อแบนด์สินค้า",
                              data_modal: this.state.product_brand_name,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div> */}
                    </div>
                    <p className="text-muted"> Example : </p>
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
                Save
              </Button>
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                Reset
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
