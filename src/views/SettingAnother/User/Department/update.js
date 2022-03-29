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

import DepartmentModel from "../../../../models/DepartmentModel";

const depament_model = new DepartmentModel();

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      department_code: "",
      department_name: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const department = await depament_model.getDepartmentByCode({
          department_code: code,
        });

        if (department.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/department");
        } else if (department.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/department");
        } else {
          const { department_code, department_name } = department.data[0];

          this.setState({
            loading: false,
            department_code: department_code,
            department_name: department_name,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await depament_model.updateDepartmentBy({
        department_code: this.state.department_code,
        department_name: this.state.department_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/user/department");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }
  _checkSubmit() {
    if (this.state.department_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.department_name === "") {
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
    // if (this.state.title_modal === "ชื่อแผนก") {
    //   this.setState({
    //     department_name: e,
    //     show_modal: false,
    //   });
    // }
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <Row>
              <Col md={3}>
                {" "}
                <Link to={`/settinganother/user/department`}>
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
                  <h1>แก้ไขแผนก </h1>
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
                    รหัสแผนก{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.department_code}
                    disabled
                    onChange={(e) =>
                      this.setState({ department_code: e.target.value })
                    }
                    placeholder="รหัสแผนก"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ชื่อผู้แผนก{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.department_name}
                        placeholder="ชื่อแผนก"
                        onChange={(e) =>
                          this.setState({ department_name: e.target.value })
                        }
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          // onClick={() =>
                          //   this.setState({
                          //     show_modal: true,
                          //     title_modal: "ชื่อแผนก",
                          //     data_modal: this.state.department_name,
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
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                บันทึก
              </Button>
              <Button
                type="reset"
                color="danger"
                style={{ height: "80px", width: "120px" }}
                onClick={() => this.setState({ department_name: "" })}
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
