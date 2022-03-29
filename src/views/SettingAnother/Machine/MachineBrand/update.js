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
import Modalkeyboard from "../../../../component/modals/ModalKeyboard";
import MachineBrandModel from "../../../../models/MachineBrandModel";

const machinebrand_model = new MachineBrandModel();

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_modal: "",
      title_modal: "",
      loading: true,
      show_modal: false,
      machine_brand_code: "",
      machine_brand_name: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const machinebrand = await machinebrand_model.getMachineBrandByCode({
          machine_brand_code: code,
        });

        if (machinebrand.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/machine-brand");
        } else if (machinebrand.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/machine-brand");
        } else {
          const { machine_brand_code, machine_brand_name } =
            machinebrand.data[0];

          this.setState({
            loading: false,
            machine_brand_code: machine_brand_code,
            machine_brand_name: machine_brand_name,
          });
        }
      }
    );
  }

  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await machinebrand_model.updateMachineBrandBy({
        machine_brand_code: this.state.machine_brand_code,
        machine_brand_name: this.state.machine_brand_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/machine/machinebrand");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.machine_brand_code === "") {
      Swal.fire("กรุณาระบุรหัส / Please Enter code");
      return false;
    } else if (this.state.machine_brand_name === "") {
      Swal.fire("กรุณาระบุชื่อ / Please Enter Full Name");
      return false;
    } else {
      return true;
    }
  }

  _inputdata = (e) => {
    this.setState({
      machine_brand_name: e,
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
                <Link to="/settinganother/machine/machinebrand">
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
                <h1> แก้ไขแบนด์เครื่องจักร </h1>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={4}>
                  <label>
                    รหัสแบนด์เครื่องจักร{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.machine_brand_code}
                    readOnly
                    onChange={(e) =>
                      this.setState({ machine_brand_code: e.target.value })
                    }
                    placeholder="รหัสแบนด์เครื่องจักร"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ชื่อแบนด์เครื่องจักร{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <div className="input-group-append">
                      <Input
                        type="text"
                        value={this.state.machine_brand_name}
                        placeholder="ชื่อแบนด์เครื่องจักร"
                        onChange={(e) =>
                          this.setState({ machine_brand_name: e.target.value })
                        }
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ชื่อแบนด์เครื่องจักร",
                              data_modal: this.state.machine_brand_name,
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div>
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
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                รีเซ็ต
              </Button>
            </CardFooter>
          </Form>
        </Card>

        <Modalkeyboard
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

export default Update;
