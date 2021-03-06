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
import GLOBAL from "../../../../GLOBAL";
import { Select, Loading } from "../../../../component/revel-strap";
import { BaseServerFile } from "../../../../utils";
import MachineModel from "../../../../models/MachineModel";
import MachineTypeModel from "../../../../models/MachineTypeModel";
import MachineBrandModel from "../../../../models/MachineBrandModel";
import MachineModelModel from "../../../../models/MachineModelModel";
import Modalkeyboard from "../../../../component/modals/ModalKeyboard";

const base_server_file = new BaseServerFile();
const machine_model = new MachineModel();
const machinetype_model = new MachineTypeModel();
const machinemodel_model = new MachineModelModel();
const machinebrand_model = new MachineBrandModel();
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
      machine_code: "",
      machine_type_code: "",
      machine_model_code: "",
      machine_brand_code: "",
      machine_detail: "",
      machine_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png` ? undefined : "",
        file: null,
        old: "",
      },
      upload_path: "machine/",
      machine_name: "",
      machine_status: "",
      machine_spindle: "",
      addby: "",
      adddate: "",
      update: "",
      lastupdate: "",
      machine_type: [],
      machine_model: [],
      machine_brand: [],
    };
  }

  componentDidMount() {
    this._fetchData();
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const machine = await machine_model.getMachineByCode({
          machine_code: code,
        });

        if (machine.require === false) {
          Swal.fire({
            title: "?????????????????????????????? !",
            text: "?????????????????????????????????????????????????????????",
            icon: "error",
          });
          this.props.history.push("/machine");
        } else if (machine.data.length === 0) {
          Swal.fire({
            title: "???????????????????????????????????????????????????????????? !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/machine");
        } else {
          const now = new Date();
          let event_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
            .toString()
            .padStart(
              2,
              "0"
            )}${"-"}${now.getDate()} ${" "}${now.getHours()}${":"}${now.getMinutes()}${":"}${now.getSeconds()}`;

          const {
            machine_code,
            machine_name,
            machine_type_code,
            machine_model_code,
            machine_brand_code,
            machine_detail,
            machine_status,
            machine_spindle,
            machine_image,
            addby,
            adddate,
          } = machine.data[0];

          this.setState({
            loading: false,
            machine_code: machine_code,
            machine_name: machine_name,
            machine_type_code: machine_type_code,
            machine_model_code: machine_model_code,
            machine_brand_code: machine_brand_code,
            machine_detail: machine_detail,
            machine_image: {
              src: `${GLOBAL.BASE_SERVER.URL_IMG}${
                machine_image || "default.png"
              }`,
              file: null,
              old: machine_image,
            },
            machine_status: machine_status,
            machine_spindle: machine_spindle,
            addby: addby,
            adddate: adddate,
            updateby: this.props.USER.user_code,
            lastupdate: event_date,
          });
        }
      }
    );
  }

  async _fetchData() {
    const machinetype = await machinetype_model.getMachineTypeBy();
    const machinebrand = await machinebrand_model.getMachineBrandBy();
    const machinemodel = await machinemodel_model.getMachineModelBy();
    this.setState({
      loading: false,
      machine_type: machinetype.data,
      machine_brand: machinebrand.data,
      machine_model: machinemodel.data,
    });
  }

  async _handleSubmit(event) {
    event.preventDefault();

    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await machine_model.updateMachineBy({
        machine_code: this.state.machine_code,
        machine_name: this.state.machine_name,
        machine_type_code: this.state.machine_type_code,
        machine_model_code: this.state.machine_model_code,
        machine_brand_code: this.state.machine_brand_code,
        machine_detail: this.state.machine_detail,
        machine_image: await base_server_file.uploadFile({
          src: this.state.machine_image,
          upload_path: this.state.upload_path,
        }),
        machine_status: this.state.machine_status,
        machine_spindle: this.state.machine_spindle,
        addby: this.state.addby,
        adddate: this.state.adddate,
        updateby: this.state.updateby,
        lastupdate: this.state.lastupdate,
      });

      if (res.require) {
        Swal.fire("?????????????????????????????????????????????????????? !", "", "success");
        this.props.history.push("/settinganother/machine/machine");
      } else {
        Swal.fire("?????????????????????????????????????????? !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.machine_code === "") {
      Swal.fire({
        title: "???????????????????????????????????????????????????????????????????????? !",
        text: "Please Enter code",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_name === "") {
      Swal.fire({
        title: "????????????????????????????????????????????????????????????????????????????????????  !",
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_brand_code === "") {
      Swal.fire({
        title: "?????????????????????????????????????????????????????????????????????????????? !",
        text: "Please Enter brand",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_model_code === "") {
      Swal.fire({
        title: "???????????????????????????????????????????????????????????????????????????  !",
        text: "Please Enter model",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_type_code === "") {
      Swal.fire({
        title: "?????????????????????????????????????????????????????????????????????????????? !",
        text: "Please Enter type",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_status === "") {
      Swal.fire({
        title: "??????????????????????????????????????????  !",
        text: "Please Enter status",
        icon: "warning",
      });
      return false;
    } else if (this.state.machine_spindle === "") {
      Swal.fire({
        title: "??????????????????????????????????????????????????????????????????????????????  !",
        text: "Please Enter spindle",
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
            if (img_name === "machine_image") {
              return {
                machine_image: {
                  src: reader.result,
                  file: file,
                  old: state.machine_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  _inputdata = (e) => {
    if (this.state.title_modal === "?????????????????????????????????????????????") {
      this.setState({
        machine_name: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "??????????????????????????????") {
      this.setState({
        machine_detail: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "???????????????????????????????????????????????????") {
      this.setState({
        machine_spindle: e,
        show_modal: false,
      });
    }
  };
  render() {
    const machine_type_options = this.state.machine_type.map((item) => ({
      value: item.machine_type_code,
      label: item.machine_type_name,
    }));
    const machine_brand_options = this.state.machine_brand.map((item) => ({
      value: item.machine_brand_code,
      label: item.machine_brand_name,
    }));
    const machine_model_options = this.state.machine_model.map((item) => ({
      value: item.machine_model_code,
      label: item.machine_model_name,
    }));
    const machine_status_options = [
      { value: "Active", label: "???????????????" },
      { value: "Inactive", label: "???????????????????????????" },
    ];

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/machine/machine">
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
                <h1> ???????????????????????????????????????????????? </h1>
              </Col>

              <Col> </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <label>
                        ?????????????????????????????????????????????{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.machine_code}
                        placeholder="?????????????????????????????????????????????"
                        disabled
                        onChange={(e) =>
                          this.setState({ machine_code: e.target.value })
                        }
                      />
                      <p className="text-muted">Example : .</p>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>
                          ?????????????????????????????????????????????{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <div className="input-group-append">
                          <Input
                            type="text"
                            value={this.state.machine_name}
                            placeholder="?????????????????????????????????????????????"
                            onChange={(e) =>
                              this.setState({ machine_name: e.target.value })
                            }
                          />
                          <div className="input-group-append"></div>
                        </div>
                        <p className="text-muted"> Example : .</p>
                      </FormGroup>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <FormGroup>
                        <label>
                          ???????????????????????????????????????????????????{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={machine_type_options}
                          value={this.state.machine_type_code}
                          onChange={(e) => {
                            this.setState({ machine_type_code: e });
                          }}
                        />
                        <p className="text-muted">Example .</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>
                          ???????????????????????????????????????????????????{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={machine_brand_options}
                          value={this.state.machine_brand_code}
                          onChange={(e) =>
                            this.setState({ machine_brand_code: e })
                          }
                        />
                        <p className="text-muted">Example : .</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      {" "}
                      <FormGroup>
                        <label>
                          ????????????????????????????????????????????????{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={machine_model_options}
                          value={this.state.machine_model_code}
                          onChange={(e) => {
                            this.setState({ machine_model_code: e });
                          }}
                        />
                        <p className="text-muted">Example : .</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <label>
                        ???????????????
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <FormGroup>
                        <Select
                          options={machine_status_options}
                          value={this.state.machine_status}
                          onChange={(e) => {
                            this.setState({ machine_status: e });
                          }}
                        />
                        <p className="text-muted">Example : ???????????????</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>
                          ???????????????????????????????????????????????????
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>

                        <div className="input-group-append">
                          <Input
                            type="text"
                            value={this.state.machine_spindle}
                            placeholder="???????????????????????????????????????????????????"
                            onChange={(e) =>
                              this.setState({ machine_spindle: e.target.value })
                            }
                          />
                          <div className="input-group-append"></div>
                        </div>
                        <p className="text-muted"> Example : 30x30 mm. </p>
                      </FormGroup>
                    </Col>{" "}
                    <Col>
                      <FormGroup>
                        <label>??????????????????????????????</label>
                        <div className="input-group-append">
                          <Input
                            type="textarea"
                            value={this.state.machine_detail}
                            onChange={(e) =>
                              this.setState({ machine_detail: e.target.value })
                            }
                          />
                          <div className="input-group-append"></div>
                        </div>
                        <p className="text-muted">Example : .</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <center>
                        {" "}
                        <label>?????????????????????????????????????????? </label>
                        <FormGroup className="text-center">
                          <img
                            style={{ maxWidth: 280 }}
                            src={this.state.machine_image.src}
                            alt="machine_image"
                          />
                        </FormGroup>
                        <FormGroup
                          className="text-center"
                          style={{ display: "inline-table" }}
                        >
                          <div>
                            {" "}
                            <Input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={(e) =>
                                this._handleImageChange("machine_image", e)
                              }
                            />
                          </div>
                        </FormGroup>
                      </center>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                ??????????????????
              </Button>
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                ??????????????????
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
