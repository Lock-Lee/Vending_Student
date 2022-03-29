import React from "react";
import {
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Select } from "../../../../component/revel-strap";

import StockModel from "../../../../models/StockModel";
import StockLayoutModel from "../../../../models/StockLayoutModel";

const stock_model = new StockModel();
const stock_layout_model = new StockLayoutModel();

class StockLayoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock_code: "",
      stock_layout: "",
      class_number: "",
      compartment_number: "",
      compartment_width: "",
      compartment_length: "",
      compartment_height: "",
      title_input: "",
      keyword: "",
      stock_type: "",
    };
  }

  componentDidUpdate(props_old) {
    if (props_old.show === false && this.props.show) {
      this._fetchData();
    }
  }

  _fetchData() {
    let stock_code = this.props.stock_code;

    if (stock_code != "") {
      this.setState({ loading: true }, async () => {
        const class_number =
          await stock_layout_model.generateClassByStockLayoutCode({
            stock_code,
          });
        const stock = await stock_model.getStockByCode({ stock_code });

        if (class_number.require) {
          this.setState({
            loading: false,
            stock_code: stock_code,
            class_number: class_number.data,
            stock_type: stock.data[0].stock_type,
          });
        }
      });
    }
  }

  _handleSave = async () => {
    let res;
    const stock_code = this.state.stock_code;
    const compartment_number = this.state.compartment_number;
    const class_number = this.state.class_number;
    const compartment_width = this.state.compartment_width;
    const compartment_length = this.state.compartment_length;
    const compartment_height = this.state.compartment_height;
    if (this.state.compartment_number === "") {
      Swal.fire({
        title: "กรุณาระบุช่องภายในชั้น !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.compartment_width === "") {
      Swal.fire({
        title: "กรุณาระบุความกว้างของช่อง !",
        text: "Please Enter width",
        icon: "warning",
      });
      return false;
    } else if (this.state.compartment_length === "") {
      Swal.fire({
        title: "กรุณาระบุความยาวของช่อง !",
        text: "Please Enter length",
        icon: "warning",
      });
      return false;
    } else if (this.state.compartment_height === "") {
      Swal.fire({
        title: "กรุณาระบุความสูงของช่อง !",
        text: "Please Enter height",
        icon: "warning",
      });
      return false;
    } else {
      for (var i = 1; i <= compartment_number; i++) {
        if (this.state.stock_type == "Rotating") {
          if (i <= 9) {
            if (i == 1) {
              i = "0" + i;
              // console.log("ช่องที่ : ", i, " ", "ตูดยาว");
              let stock_layout_code = stock_code + "-" + class_number + "-" + i;
              res = await stock_layout_model.insertStockLayoutCode({
                stock_layout_code: stock_layout_code,
                stock_code: stock_code,
                stock_type: "Long",
                stock_x: i,
                stock_y: class_number,
                stock_z: 0,
                stock_use: 0,
                compartment_width: compartment_width,
                compartment_length: compartment_length,
                compartment_height: compartment_height,
              });
            } else if (i > 1) {
              if ((i - 1) % 3 == 0) {
                i = "0" + i;
                // console.log("ช่องที่ : ", i, " ", "ตูดยาว");
                let stock_layout_code =
                  stock_code + "-" + class_number + "-" + i;
                res = await stock_layout_model.insertStockLayoutCode({
                  stock_layout_code: stock_layout_code,
                  stock_code: stock_code,
                  stock_type: "Long",
                  stock_x: i,
                  stock_y: class_number,
                  stock_z: 0,
                  stock_use: 0,
                  compartment_width: compartment_width,
                  compartment_length: compartment_length,
                  compartment_height: compartment_height,
                });
              } else {
                i = "0" + i;
                // console.log("ช่องที่ : ", i, " ", "ตูดแหล่ม");
                let stock_layout_code =
                  stock_code + "-" + class_number + "-" + i;
                res = await stock_layout_model.insertStockLayoutCode({
                  stock_layout_code: stock_layout_code,
                  stock_code: stock_code,
                  stock_type: "Headland",
                  stock_x: i,
                  stock_y: class_number,
                  stock_z: 0,
                  stock_use: 0,
                  compartment_width: compartment_width,
                  compartment_length: compartment_length,
                  compartment_height: compartment_height,
                });
              }
            }
          } else {
            if ((i - 1) % 3 == 0) {
              // console.log("ช่องที่ : ", i, " ", "ตูดยาว");
              let stock_layout_code = stock_code + "-" + class_number + "-" + i;
              res = await stock_layout_model.insertStockLayoutCode({
                stock_layout_code: stock_layout_code,
                stock_code: stock_code,
                stock_type: "Long",
                stock_x: i,
                stock_y: class_number,
                stock_z: 0,
                stock_use: 0,
                compartment_width: compartment_width,
                compartment_length: compartment_length,
                compartment_height: compartment_height,
              });
            } else {
              // console.log("ช่องที่ : ", i, " ", "ตูดแหล่ม");
              let stock_layout_code = stock_code + "-" + class_number + "-" + i;
              res = await stock_layout_model.insertStockLayoutCode({
                stock_layout_code: stock_layout_code,
                stock_code: stock_code,
                stock_type: "Headland",
                stock_x: i,
                stock_y: class_number,
                stock_z: 0,
                stock_use: 0,
                compartment_width: compartment_width,
                compartment_length: compartment_length,
                compartment_height: compartment_height,
              });
            }
          }
        } else if (this.state.stock_type == "Locker") {
          if (i <= 9) {
            i = "0" + i;
            let stock_layout_code = stock_code + "-" + class_number + "-" + i;
            res = await stock_layout_model.insertStockLayoutCode({
              stock_layout_code: stock_layout_code,
              stock_code: stock_code,
              stock_type: "",
              stock_x: i,
              stock_y: class_number,
              stock_z: 0,
              stock_use: 0,
              compartment_width: compartment_width,
              compartment_length: compartment_length,
              compartment_height: compartment_height,
            });
          } else {
            let stock_layout_code = stock_code + "-" + class_number + "-" + i;
            res = await stock_layout_model.insertStockLayoutCode({
              stock_layout_code: stock_layout_code,
              stock_code: stock_code,
              stock_type: "",
              stock_x: i,
              stock_y: class_number,
              stock_z: 0,
              stock_use: 0,
              compartment_width: compartment_width,
              compartment_length: compartment_length,
              compartment_height: compartment_height,
            });
          }
        }
      }

      if (res.require) {
        Swal.fire(
          { title: "บันทึกข้อมูลสำเร็จ !", icon: "success" },
          this.setState(
            {
              compartment_number: "",
              compartment_height: "",
              compartment_length: "",
              compartment_width: "",
            },
            this.props.onClose()
          )
        );
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
  };
  _onKeyPress = (button) => {
    let keyword = this.state.keyword;

    if (this.state.title_input === "ช่องภายในชั้น") {
      if (button !== "backspace") {
        keyword += button;
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1);
      }
      this.setState(
        {
          keyword: keyword,
        },
        this.setState({
          compartment_number: keyword,
        })
      );
    } else if (this.state.title_input === "ความกว้างของช่อง") {
      if (button !== "backspace") {
        keyword += button;
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1);
      }
      this.setState(
        {
          keyword: keyword,
        },
        this.setState({
          compartment_width: keyword,
        })
      );
    } else if (this.state.title_input === "ความยาวของช่อง") {
      if (button !== "backspace") {
        keyword += button;
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1);
      }
      this.setState(
        {
          keyword: keyword,
        },
        this.setState({
          compartment_length: keyword,
        })
      );
    } else if (this.state.title_input === "ความสูงของช่อง") {
      if (button !== "backspace") {
        keyword += button;
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1);
      }
      this.setState(
        {
          keyword: keyword,
        },
        this.setState({
          compartment_height: keyword,
        })
      );
    }
  };
  _handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  _handleClose = () => {
    this.props.onClose();
    this.setState({
      compartment_number: "",
      compartment_width: "",
      compartment_length: "",
      compartment_height: "",
    });
  };
  render() {
    if (this.state.stock_type == "Rotating") {
      var compartment_number = [
        { label: "- ช่องภายในชั้น -", value: "" },
        { label: " 24 ", value: "24" },
        { label: " 72 ", value: "72" },
      ];

      var compartment_width = [
        { label: "- ความกว้างของช่อง -", value: "" },
        { label: " 5 ", value: "5" },
        { label: " 10 ", value: "10" },
      ];

      var compartment_length = [
        { label: "- ความยาวของช่อง -", value: "" },
        { label: " 25 ", value: "25" },
      ];

      var compartment_height = [
        { label: "- ความสูงของช่อง -", value: "" },
        { label: " 5 ", value: "5" },
        { label: " 10 ", value: "10" },
      ];
    } else {
      var compartment_number = [
        { label: "- ช่องภายในชั้น  -", value: "" },
        { label: " 2 ", value: "2" },
        { label: " 4 ", value: "4" },
      ];

      var compartment_width = [
        { label: "- ความกว้างของช่อง -", value: "" },
        { label: " 22 ", value: "22" },
      ];

      var compartment_length = [
        { label: "- ความยาวของช่อง -", value: "" },
        { label: " 50 ", value: "50" },
      ];

      var compartment_height = [
        { label: "- ความสูงของช่อง -", value: "" },
        { label: " 10 ", value: "10" },
        { label: " 20 ", value: "20" },
      ];
    }

    return (
      <Modal
        size="xl"
        centered
        isOpen={this.props.show}
        toggle={this._handleClose}
      >
        <ModalHeader toggle={this._handleClose}>เพิ่มชั้น</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={2}>
              <label>
                จำนวนชั้นที่
                <font color="#F00">
                  <b>*</b>
                </font>
              </label>
              <Input
                type="text"
                value={this.state.class_number}
                disabled
                onChange={(e) =>
                  this.setState({ class_number: e.target.value })
                }
                placeholder="จำนวนชั้น"
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>
                  ช่องภายในชั้น
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                {/* <Input
                  type="number"
                  value={this.state.compartment_number}
                  onChange={(e) => this.setState({ compartment_number: e.target.value })}
                  onClick={() => this.setState({
                    title_input: 'ช่องภายในชั้น',
                    keyword: '',
                  })}
                  placeholder="ช่องภายในชั้น"
                /> */}

                <Select
                  options={compartment_number}
                  value={this.state.compartment_number}
                  onChange={(e) => this.setState({ compartment_number: e })}
                />

                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>
                  ความกว้างของช่อง(Cm)
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                {/* <Input
                  type="number"
                  value={this.state.compartment_width}
                  onChange={(e) => this.setState({ compartment_width: e.target.value })}
                  placeholder="ความกว้างของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความกว้างของช่อง',
                    keyword: '',
                  })}
                /> */}

                <Select
                  options={compartment_width}
                  value={this.state.compartment_width}
                  onChange={(e) => this.setState({ compartment_width: e })}
                />

                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>
                  ความยาวของช่อง(Cm)
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                {/* <Input
                  type="number"
                  value={this.state.compartment_length}
                  onChange={(e) => this.setState({ compartment_length: e.target.value })}
                  placeholder="ความกว้างของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความยาวของช่อง',
                    keyword: '',
                  })}
                /> */}

                <Select
                  options={compartment_length}
                  value={this.state.compartment_length}
                  onChange={(e) => this.setState({ compartment_length: e })}
                />

                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>
                  ความสูงของช่อง(Cm)
                  <font color="#F00">
                    <b>*</b>
                  </font>
                </label>
                {/* <Input
                  type="number"
                  value={this.state.compartment_height}
                  onChange={(e) => this.setState({ compartment_height: e.target.value })}
                  placeholder="ความสูงของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความสูงของช่อง',
                    keyword: '',
                  })}
                /> */}

                <Select
                  options={compartment_height}
                  value={this.state.compartment_height}
                  onChange={(e) => this.setState({ compartment_height: e })}
                />

                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col className="col-md-2 align-items-center justify-content-center d-flex">
              <button
                className="btn btn-success"
                onClick={() => this._handleSave()}
              >
                <i className="fa fa-plus" aria-hidden="true"></i> เพิ่ม
              </button>
            </Col>
          </Row>
        </ModalBody>
        {/* <ModalFooter>


          <Col md={4}>
            <Keyboard
              layout={{
                'default': [
                  '1 2 3',
                  '4 5 6',
                  '7 8 9',
                  ' 0 backspace'
                ],
              }}
              onKeyPress={this._onKeyPress}
            />
          </Col>
          <Col md={4} />
          <Col md={4} />

        </ModalFooter> */}
      </Modal>
    );
  }
}

export default StockLayoutModal;
