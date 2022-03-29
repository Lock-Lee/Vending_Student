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

import { Loading, Select } from "../../../../component/revel-strap";
import Modalkeyboard from "../../../../component/modals/ModalKeyboard";

import UserTypeModel from "../../../../models/UserTypeModel";
import DepartmentModel from "../../../../models/DepartmentModel";
import LicenseModel from "../../../../models/LicenseModel";
import UserModel from "../../../../models/UserModel";
import UserGroupModel from "../../../../models/UserGroupModel";
const department_model = new DepartmentModel();
const usertype_model = new UserTypeModel();
const license_model = new LicenseModel();
const user_model = new UserModel();
const usergroup_model = new UserGroupModel();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      user_code: "",
      user_RFID: "",
      user_type_code: "",
      department_code: "",
      license_code: "",
      user_firstname: "",
      user_lastname: "",
      user_username: "",
      user_password: "",
      user_type_code: "",
      department_code: "",
      user_group: [],
      user_tel: "",
      user_email: "",
      addby: "",
      adddate: "",
      user_group1: "",
      user_group2: "",
      user_group3: "",
      license: [],
      usertype: [],
      department: [],
      user_license_group: [
        {
          user_group_code: "",
          user_code: " ",
        },
      ],
    };
  }

  async componentDidMount() {
    const date = new Date();
    const last_code = await user_model.getUserLastCode({
      code: "MTP-U" + date.getFullYear(),
      digit: 3,
    });

    const license = await license_model.getLicenseBy();
    const usertype = await usertype_model.getUserTypeBy();
    const department = await department_model.getDepartmentBy();
    const user_group = await usergroup_model.getUserGroupBy();

    this.setState({
      loading: false,
      user_code: last_code.data,
      license: license.data,
      usertype: usertype.data,
      department: department.data,
      user_group: user_group.data,
    });
  }

  _handleSubmit(event) {
    //event.preventDefault();

    this.setState(
      {
        loading: true,
      },
      async () => {
        if (this._checkSubmit()) {
          const res = await user_model.insertUser({
            user_code: this.state.user_code.trim(),
            user_RFID: this.state.user_RFID,
            user_firstname: this.state.user_firstname.trim(),
            user_lastname: this.state.user_lastname.trim(),
            user_username: this.state.user_username.trim(),
            user_password: this.state.user_password.trim(),
            user_type_code: this.state.user_type_code.trim(),
            department_code: this.state.department_code.trim(),
            license_code: this.state.license_code.trim(),

            user_tel: this.state.user_tel,
            user_email: this.state.user_email,
            addby: this.props.USER.user_code,
            user_license_group: this.state.user_license_group,
            adddate: "",
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/user/user");
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
    this.setState({
      user_type_code: "",
      department_code: "",
      license_code: "",
      user_firstname: "",
      user_lastname: "",
      user_username: "",
      user_password: "",
      user_type_code: "",
      department_code: "",
      user_tel: "",
      user_email: "",
    });
  }

  _checkSubmit() {
    if (this.state.user_firstname === "") {
      Swal.fire("กรุณากรอกชื่อ !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.user_RFID === "") {
      Swal.fire("กรุณากรอก RFID !", "", "error");
    } else if (this.state.user_lastname === "") {
      Swal.fire("กรุณากรอกนามสกุล !", "", "error");
      this.setState({
        loading: false,
      });
    }
    //  else if (this.state.user_username === "") {
    //   Swal.fire("กรุณากรอกชื่อใช้งานในระบบ !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // }
    // else if (this.state.user_password === "") {
    //   Swal.fire("กรุณากรอกรหัสผ่าน !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // }
    // } else if (this.state.department_code === "") {
    //   Swal.fire("กรุณากรอกแผนก !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // } else if (this.state.user_type_code === "") {
    //   Swal.fire("กรุณากรอกประเภท !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // }
    else if (this.state.license === "") {
      Swal.fire("กรุณากรอกสิทธิ์การใช้งาน !", "", "error");
      this.setState({
        loading: false,
      });
    }
    // else if (this.state.user_tel === "") {
    //   Swal.fire("กรุณากรอกเบอร์โทร !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // }
    // else if (this.state.user_email === "") {
    //   Swal.fire("กรุณากรอกอีเมล์ !", "", "error");
    //   this.setState({
    //     loading: false,
    //   });
    // }
    else {
      return true;
    }
  }

  _addBut() {
    let { user_license_group } = this.state;
    if (user_license_group.length < 3) {
      user_license_group.push({
        user_group_code: "",
        user_code: "",
      });
    }

    this.setState({
      user_license_group: user_license_group,
    });
  }
  _onChange(data, index) {
    let { user_license_group } = this.state;

    user_license_group[index].user_group_code = data;

    this.setState({
      user_license_group: user_license_group,
    });
  }
  _deleteRow() {
    let { user_license_group } = this.state;

    user_license_group.splice(
      user_license_group[user_license_group.length - 1],
      1
    );
    this.setState({
      user_license_group: user_license_group,
    });
  }
  render() {
    const license_options = [
      { label: "- เลือกสิทธิ์การใช้งาน -", value: "" },
      ...this.state.license.map((item) => ({
        value: item.license_code,
        label: item.license_name,
      })),
    ];
    const usertype_options = [
      { label: "- เลือกประเภทผู้ใช้  -", value: "" },
      ...this.state.usertype.map((item) => ({
        value: item.user_type_code,
        label: item.user_type_name,
      })),
    ];
    const department_options = [
      { label: "- เลือกแผนก -", value: "" },
      ...this.state.department.map((item) => ({
        value: item.department_code,
        label: item.department_name,
      })),
    ];
    let group_options = [
      { label: "- เลือกกลุ่ม -", value: "" },
      ...this.state.user_group.map((item) => ({
        value: item.user_group_code,
        label: item.user_group_name,
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
                <Link to="/settinganother/user/user">
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
                  <h3> เพิ่มผู้ใช้</h3>
                </lable>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          {/* <Form onSubmit={(e) => { this._handleSubmit(e) }}> */}
          <CardBody>
            <Row>
              <Col>
                <Row>
                  <Col md="3">
                    {" "}
                    <label>
                      รหัสผู้ใช้{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.user_code}
                      readOnly
                      onChange={(e) => {}}
                      placeholder="รหัสแบนด์สินค้า"
                    />
                    <p className="text-muted">Example :</p>
                  </Col>
                  <Col md="3">
                    {" "}
                    <label>
                      RFID{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.user_RFID}
                      onChange={(e) =>
                        this.setState({ user_RFID: e.target.value })
                      }
                      placeholder="รหัส RFID"
                    />
                    <p className="text-muted">Example :</p>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col md="3">
                    <label>
                      {" "}
                      ชื่อ
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group">
                      <Input
                        type="text"
                        value={this.state.user_firstname}
                        placeholder="ชื่อ"
                        onChange={(e) =>
                          this.setState({ user_firstname: e.target.value })
                        }
                      />
                      {/* <div className="input-group-append">
                          <button className="btn btn-secondary" type="button">
                            <i className="fas fa-keyboard"></i>
                          </button>
                        </div> */}
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col>
                  <Col md="3">
                    {" "}
                    <label>
                      นามสกุล{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group">
                      <Input
                        type="text"
                        value={this.state.user_lastname}
                        placeholder="นามสกุล"
                        onChange={(e) =>
                          this.setState({ user_lastname: e.target.value })
                        }
                      />
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  {/* <Col md="3">
                    {" "}
                    <label>
                      ชื่อใช้งานในระบบ{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.user_username}
                        placeholder="ชื่อใช้งานในระบบ"
                        onChange={(e) =>
                          this.setState({ user_username: e.target.value })
                        }
                      />
                    
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col> */}
                  {/* <Col md="3">
                    {" "}
                    <label>
                      รหัสผ่าน{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="password"
                        value={this.state.user_password}
                        placeholder="รหัสผ่าน"
                        onChange={(e) =>
                          this.setState({ user_password: e.target.value })
                        }
                      />
                      
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col> */}
                  {/* <Col>
                    <label>
                      เบอร์โทร{" "}
                    
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        className="float "
                        value={this.state.user_tel}
                        placeholder="เบอร์โทร"
                        onChange={(e) =>
                          this.setState({ user_tel: e.target.value })
                        }
                      />
                     
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col> */}
                  {/* <Col>
                    <label>
                      อีเมล์{" "}
                    
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        className="float "
                        value={this.state.user_email}
                        placeholder="อีเมล์"
                        onChange={(e) =>
                          this.setState({ user_email: e.target.value })
                        }
                      />
                    
                    </div>
                    <p className="text-muted">Example :</p>
                  </Col> */}
                </Row>

                <Row>
                  <Col md="3">
                    <label>
                      สิทธิ์การใช้งาน{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Select
                      options={license_options}
                      value={this.state.license_code}
                      onChange={(e) => this.setState({ license_code: e })}
                    />
                    <p className="text-muted">Example :</p>
                  </Col>
                  <Col md="3">
                    <label>
                      แผนก{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Select
                      options={department_options}
                      value={this.state.department_code}
                      onChange={(e) => this.setState({ department_code: e })}
                    />
                    <p className="text-muted">Example :</p>
                  </Col>
                  {/* <Col md="3">
                    {" "}
                    <label>
                      ประเภทผู้ใช้{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Select
                      options={usertype_options}
                      value={this.state.user_type_code}
                      onChange={(e) => this.setState({ user_type_code: e })}
                      placeholder="นามสกุล"
                    />
                    <p className="text-muted">Example :</p>
                  </Col> */}
                </Row>
                <Row>
                  {this.state.user_license_group.map((data, index) => {
                    return (
                      <>
                        {" "}
                        <Col md={3}>
                          <label>
                            กลุ่มเบิกสินค้า {index + 1}{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <Select
                            options={group_options}
                            value={
                              this.state.user_license_group[index]
                                .user_group_code
                            }
                            onChange={(e) => {
                              this._onChange(e, index);
                            }}
                          />
                          <p className="text-muted">Example :</p>
                        </Col>
                      </>
                    );
                  })}
                  <Col>
                    <label>
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <br />
                    <label>
                      <Button
                        onClick={() => {
                          this._addBut();
                        }}
                      >
                        เพิ่ม
                      </Button>
                      <Button
                        onClick={() => {
                          this._deleteRow();
                        }}
                      >
                        ลบ
                      </Button>
                    </label>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="text-right">
            <Button
              type="button"
              style={{ height: "80px", width: "120px" }}
              color="success"
              onClick={() => {
                this._handleSubmit();
              }}
            >
              บันทึก
            </Button>
            <Button
              type="reset"
              style={{ height: "80px", width: "120px" }}
              color="danger"
            >
              {" "}
              รีเซ็ต
            </Button>
          </CardFooter>
          {/* </Form> */}
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
