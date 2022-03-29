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

import ProductGroupModel from "../../../../models/ProductGroupModel";
const productgroup_model = new ProductGroupModel();

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      product_group_code: "",
      product_group_name: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const productgroup = await productgroup_model.getProductGroupByCode({
          product_group_code: code,
        });

        if (productgroup.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/product-group");
        } else if (productgroup.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/product-group");
        } else {
          const { product_group_code, product_group_name } =
            productgroup.data[0];

          this.setState({
            loading: false,
            product_group_code: product_group_code,
            product_group_name: product_group_name,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await productgroup_model.updateProductGroupBy({
        product_group_code: this.state.product_group_code,
        product_group_name: this.state.product_group_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/product/product-group");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.product_group_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_group_name === "") {
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
      product_group_name: e,
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
                <Link to="/settinganother/product/product-group">
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
                <h1 className="header"> แก้ไขกลุ่มสินค้า</h1>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={4}>
                  <Label>
                    รหัสกลุ่มสินค้า{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </Label>
                  <Input
                    type="text"
                    id="product_group_code"
                    name="product_group_code"
                    value={this.state.product_group_code}
                    placeholder="รหัสกลุ่มสินค้า"
                    readOnly
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      ชื่อกลุ่มสินค้า{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </Label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        id="product_group_name"
                        name="product_group_name"
                        value={this.state.product_group_name}
                        placeholder="ชื่อกลุ่มสินค้า"
                        onChange={(e) =>
                          this.setState({ product_group_name: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ชื่อกลุ่มสินค้า",
                              data_modal: this.state.product_group_name,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div> */}
                    </div>
                    <p className="text-muted">Example : </p>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                Reset
              </Button>
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                Save
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
