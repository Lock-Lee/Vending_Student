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

import Modalkeyboard from "../../../../component/modals/ModalKeyboard";

import UserGroupModel from "../../../../models/UserGroupModel";

const usergroup_model = new UserGroupModel();

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      user_group_code: "",
      user_group_name: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const department = await usergroup_model.getUserGroupByCode({
          user_group_code: code,
        });

        if (department.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/settinganother/user/userby-group");
        } else if (department.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/settinganother/user/userby-group");
        } else {
          const { user_group_code, user_group_name } = department.data[0];

          this.setState({
            loading: false,
            user_group_code: user_group_code,
            user_group_name: user_group_name,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await usergroup_model.updateUserGroupBy({
        user_group_code: this.state.user_group_code,
        user_group_name: this.state.user_group_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/user/userby-group");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }
  _checkSubmit() {
    if (this.state.user_group_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.user_group_name === "") {
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
    if (this.state.title_modal === "กลุ่มผู้ใช้") {
      this.setState({
        user_group_name: e,
        show_modal: false,
      });
    }
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            .
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/user/userby-group">
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
                    <h1>กลุ่มผู้ใช้</h1>
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
                    รหัสกลุ่มผู้ใช้{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.user_group_code}
                    disabled
                    onChange={(e) =>
                      this.setState({ user_group_code: e.target.value })
                    }
                    placeholder="รหัสกลุ่มผู้ใช้"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ชื่อกลุ่ม{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.user_group_name}
                        placeholder="ชื่อกลุ่ม"
                        onChange={(e) =>
                          this.setState({ user_group_name: e.target.value })
                        }
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          // onClick={() =>
                          //   this.setState({
                          //     show_modal: true,
                          //     title_modal: "ชื่อกลุ่ม",
                          //     data_modal: this.state.user_group_name,
                          //   })
                          // }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-muted"> Example : </p>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="submit"
                style={{ height: "80px", width: "140px" }}
                color="success"
              >
                บันทึก
              </Button>
              <Button
                type="reset"
                color="danger"
                style={{ height: "80px", width: "140px" }}
                onClick={() => this.setState({ user_group_name: "" })}
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
