import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardHeader,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { Loading } from "../../../component/revel-strap";

import "antd/dist/antd.css";
import ModalKeyboard from "../../../component/modals/ModalKeyboard";
import ReportModel from "../../../models/ReportModel";

const report_model = new ReportModel();

class View extends React.Component {
  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      loading: true,
      data: [],
      report_setting_code: "",
      email_service: "",
      email_user: "",
      email_password: "",
      email_signature: "",
      show_modal: false,
      title_modal: "",
      data_modal: "",
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const data = await report_model.getSettingReport({});
        this.setState({
          loading: false,
          data: data.data,
          report_setting_code: data.data[0].report_setting_code,
          email_service: data.data[0].email_service,
          email_user: data.data[0].email_user,
          email_password: data.data[0].email_password,
          email_signature: data.data[0].email_signature,
        });
      }
    );
  }

  _onSavereport = async () => {
    let {
      report_setting_code,
      email_service,
      email_user,
      email_password,
      email_signature,
    } = this.state;

    if (email_user == "") {
      Swal.fire({
        title: "กรุณาระบุอีเมลล์ส่ง!",
        icon: "warning",
        timer: 1500,
      });
    } else if (email_user !== "" && email_password !== "") {
      const res = await report_model.updateSettingReport({
        report_setting_code,
        email_service,
        email_user,
        email_password,
        email_signature,
      });

      if (res.require === true) {
        Swal.fire({ title: "บันทึกสำเร็จ", icon: "success", timer: 1500 });
        this._fetchData();
      } else if (res.require === false) {
        Swal.fire({ title: "เกิดข้อผิดพลาด!", icon: "warning", timer: 1500 });
      }
    }
  };

  _check_email = (elm) => {
    var regex_email =
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*\@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.([a-zA-Z]){2,4})$/;
    if (!elm.match(regex_email) && elm !== "") {
      Swal.fire({
        title: "รูปแบบ email ไม่ถูกต้อง!",
        icon: "warning",
        timer: 1500,
      });
    } else {
      let title_modal = this.state.title_modal;
      if (title_modal === "SMTP") {
        this.setState({
          show_modal: false,
          email_user: elm,
        });
      } else if (title_modal === "อีเมลล์ส่ง") {
        this.setState({
          show_modal: false,
          email_user: elm,
        });
      } else if (title_modal === "รหัสผ่าน") {
        this.setState({
          show_modal: false,
          email_password: elm,
        });
      } else if (title_modal === "Signature") {
        this.setState({
          show_modal: false,
          email_signature: elm,
        });
      }
    }
  };

  _inputdata = (e) => {
    // this._check_email(e)
  };

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col md={1}>
                {" "}
                <Link to="/report">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center", alignSelf: "center" }}>
                <h1>ตั้งค่าอีเมล์</h1>
              </Col>{" "}
              <Col md={1}></Col>
            </Row>
          </CardHeader>

          <CardBody>
            <Row>
              <Col md="2">
                <label>รหัสรายงาน</label>
                <Input readOnly value={this.state.report_setting_code}></Input>
              </Col>
              <Col md="2">
                <label>SMTP</label>
                <Input
                  placeholder="SMTP"
                  value={this.state.email_service}
                  onClick={() =>
                    this.setState({
                      show_modal: true,
                      title_modal: "SMTP",
                      data_modal: this.state.email_service,
                    })
                  }
                ></Input>
              </Col>
              <Col md="2">
                <label>อีเมลล์</label>
                <Input
                  placeholder="อีเมลล์ที่ใช้ส่ง"
                  value={this.state.email_user}
                  onClick={() =>
                    this.setState({
                      show_modal: true,
                      title_modal: "อีเมลล์ที่ใช้ส่ง",
                      data_modal: this.state.email_user,
                    })
                  }
                ></Input>
              </Col>
              <Col md="2">
                <label>รหัสผ่าน</label>
                <Input
                  placeholder="รหัสผ่าน"
                  value={this.state.email_password}
                  onClick={() =>
                    this.setState({
                      show_modal: true,
                      title_modal: "รหัสผ่าน",
                      data_modal: this.state.email_password,
                    })
                  }
                ></Input>
              </Col>

              <Col md="2">
                <label>Signature</label>
                <Input
                  placeholder="Signature"
                  value={this.state.email_signature}
                  onClick={() =>
                    this.setState({
                      show_modal: true,
                      title_modal: "Signature",
                      data_modal: this.state.email_signature,
                    })
                  }
                ></Input>
              </Col>
            </Row>

            <br />

            <Row>
              <div>
                <Button
                  type="button"
                  color="primary"
                  style={{ marginLeft: "87vw" }}
                  onClick={() => {
                    this._onSavereport();
                  }}
                >
                  บันทึกการตั้งค่า
                </Button>
              </div>
            </Row>
          </CardBody>
        </Card>

        <ModalKeyboard
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />
      </div>
    );
  }
}

export default View;
