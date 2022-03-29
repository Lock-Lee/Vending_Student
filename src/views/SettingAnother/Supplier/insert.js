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
import GLOBAL from "../../../GLOBAL";
import { Loading } from "../../../component/revel-strap";
import { BaseServerFile } from "../../../utils";
import SupplierModel from "../../../models/SupplierModel";

const supplier_model = new SupplierModel();
const base_server_file = new BaseServerFile();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      supplier_code: "",
      supplier_name: "",
      supplier_email: "",
      supplier_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png`,
        file: null,
        old: "",
      },
      upload_path: "supplier/",
      supplier_tel: "",
      supplier_address: "",
      supplier_line_id: "",
      supplier_flex: "",
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const now = new Date();

    const last_code = await supplier_model.generateSupplierLastCode({
      code: `SP${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    this.setState({
      loading: false,

      supplier_code: last_code.data,
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
          const res = await supplier_model.insertSupplier({
            supplier_code: this.state.supplier_code,
            supplier_name: this.state.supplier_name,
            supplier_email: this.state.supplier_email,
            supplier_image: await base_server_file.uploadFile({
              src: this.state.supplier_image,
              upload_path: this.state.upload_path,
            }),
            supplier_tel: this.state.supplier_tel,
            supplier_address: this.state.supplier_address,
            supplier_line_id: this.state.supplier_line_id,
            supplier_flex: this.state.supplier_flex,
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/supplier");
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
    if (this.state.supplier_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัสผู้ขาย !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.supplier_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อผู้ขาย !",
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.supplier_email === "") {
      Swal.fire({
        title: "กรุณาระบุอิเมล !",
        text: "Please Enter Email",
        icon: "warning",
      });
      return false;
    } else if (this.state.supplier_flex === "") {
      Swal.fire({
        title: "กรุณาระบุแฟกช์ !",
        text: "Please Enter flex",
        icon: "warning",
      });
      return false;
    } else if (this.state.supplier_tel === "") {
      Swal.fire({
        title: "กรุณาระบุโทรศัพท์ !",
        text: "Please Enter Number Phone",
        icon: "warning",
      });
      return false;
    } else if (this.state.supplier_address === "") {
      Swal.fire({
        title: "กรุณาระบุที่อยู่ !",
        text: "Please Enter address",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }
  _handleImageChange(img_name, e) {
    if (e.target.files.length) {
      let file = new File([e.target.files[0]], e.target.files[0].name, {
        type: e.target.files[0].type,
      });

      if (file) {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState((state) => {
            if (img_name === "supplier_image") {
              return {
                supplier_image: {
                  src: reader.result,
                  file: file,
                  old: state.supplier_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  _onReset() {
    this.setState({
      supplier_name: "",
      supplier_email: "",
      supplier_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png`,
        file: null,
        old: "",
      },
      supplier_tel: "",
      supplier_address: "",
      supplier_line_id: "",
      supplier_flex: "",
    });
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <Row>
              {" "}
              <Col>
                {" "}
                <Link to="/settinganother/supplier">
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
                <h3 className="text-header">เพิ่มผู้ขาย / Add Supplier</h3>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    {" "}
                    <Col md={4}>
                      <label>
                        รหัสผู้ขาย{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.supplier_code}
                        onChange={(e) =>
                          this.setState({ supplier_code: e.target.value })
                        }
                        readOnly
                        placeholder="รหัสผู้ขาย"
                      />
                      <p className="text-muted">Example : SP01.</p>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>
                          ชื่อผู้ขาย{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="text"
                          value={this.state.supplier_name}
                          onChange={(e) =>
                            this.setState({ supplier_name: e.target.value })
                          }
                          placeholder="ชื่อผู้ขาย"
                        />
                        <p className="text-muted">
                          {" "}
                          Example : บริษัท เรเวลซอฟต์ จำกัด.
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label>
                          อีเมล์{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="email"
                          value={this.state.supplier_email}
                          onChange={(e) =>
                            this.setState({ supplier_email: e.target.value })
                          }
                          placeholder="อีเมล์"
                        />
                        <p className="text-muted">
                          Example : revelsoft@gmail.co.th
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>
                          Line ID{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="text"
                          value={this.state.supplier_line_id}
                          onChange={(e) =>
                            this.setState({ supplier_line_id: e.target.value })
                          }
                          placeholder="ID Line"
                        />
                        <p className="text-muted">Example : 123456789012345.</p>
                      </FormGroup>
                    </Col>
                    <Col></Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>
                          แฟกช์{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="text"
                          value={this.state.supplier_flex}
                          onChange={(e) =>
                            this.setState({ supplier_flex: e.target.value })
                          }
                          placeholder="แฟกช์"
                        />
                        <p className="text-muted">Example : 020 265 3123-02.</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>
                          โทรศัพท์{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="text"
                          value={this.state.supplier_tel}
                          onChange={(e) =>
                            this.setState({ supplier_tel: e.target.value })
                          }
                          placeholder="โทรศัพท์"
                        />
                        <p className="text-muted">Example : 093 432 1230.</p>
                      </FormGroup>
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>
                          ที่อยู่{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="textarea"
                          value={this.state.supplier_address}
                          onChange={(e) =>
                            this.setState({ supplier_address: e.target.value })
                          }
                          placeholder="ที่อยู่"
                        />
                        <p className="text-muted">Example : 123456789012345.</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>{" "}
                <Col md={4}>
                  <label>รูป </label>
                  <FormGroup className="text-center">
                    <img
                      style={{ maxWidth: 150 }}
                      src={this.state.supplier_image.src}
                      alt="supplier_image"
                    />
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Input
                      className="text-center"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) =>
                        this._handleImageChange("supplier_image", e)
                      }
                    />
                  </FormGroup>
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
