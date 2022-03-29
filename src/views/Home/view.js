import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
} from "reactstrap";
import { Select, Loading } from "../../component/revel-strap";
import { Link } from "react-router-dom";
import { ImDownload, ImEqualizer } from "react-icons/im";
import { AiOutlineSync } from "react-icons/ai";
import { ImUpload } from "react-icons/im";
import { ImPieChart } from "react-icons/im";
import { FaPaperPlane } from "react-icons/fa";
import { ImCogs } from "react-icons/im";
import socketIOClient from "socket.io-client";
import SerialPortModel from "../../models/SerialPortModel";
import Swal from "sweetalert2";
import GROBAL from "../../GLOBAL";
import { MdOutlineAddLocationAlt } from "react-icons/md";
const SerialPort_model = new SerialPortModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      status_manchine: "ไม่พร้อม",
      microcontroller: [],
      loading: true,
      time: 0,
      PERMISSION: [],
      menu_top: [],
      menu_bottom: [],
    };
  }

  _sendMessage = ({ event_button }) => {
    const socket = socketIOClient(GROBAL.BASE_SERVER.URL_SCOKET_IO);
    this.setState(
      {
        event_button,
      },
      () => {
        socket.emit("connect-micro", event_button);
      }
    );
  };
  _checkReady() {
    const socket = socketIOClient(GROBAL.BASE_SERVER.URL_SCOKET_IO);
    socket.emit("connect-micro", "CHECKREADY");
  }
  componentDidUpdate() {}
  componentDidMount = async () => {
    console.log(this.props.PERMISSION);
    this.setState(
      {
        PERMISSION: this.props.PERMISSION,
      },
      () => {
        console.log(this.state.PERMISSION);
        this._setMenu();
      }
    );
    this._checkReady();

    this.setState({
      status_manchine: this.props.status_manchine,
    });
    //  const data = await SerialPort_model.getDevice();

    this.setState(
      {
        microcontroller: "",
        loading: false,
      },
      () => {
        if (this.state.status_manchine == "ไม่พร้อม") {
        }
        // this._sendMessage({
        //   event_button: ["CHECKREADY"],
        // });
      }
    );
  };
  _setMenu() {
    let { menu_top, menu_bottom } = this.state;
    const { PERMISSION } = this.state;
    console.log(PERMISSION);

    PERMISSION.filter((val, idx) => {
      console.log(idx);
      if (
        val.menu_name_en === "Vending-Receive-Tool" &&
        val.permission_view === 1
      ) {
        menu_top.push(
          <Col
            className="home"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor: "white",
            }}
          >
            {" "}
            <Link
              exact
              to={`/receiveTool`}
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <Row>
                <Col>
                  <div className="card-v">
                    {" "}
                    <br /> <br />{" "}
                    <ImDownload className="icon" style={{ color: "#0052CC" }} />
                    <br />
                    <br /> <br />
                    <h2>เติมสินค้า</h2>
                  </div>
                </Col>
              </Row>
            </Link>
          </Col>
        );
      } else if (
        val.menu_name_en === "Vending-Takeout-Tool" &&
        val.permission_view === 1
      ) {
        menu_top.push(
          <Col
            className="home"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor: "white",
            }}
          >
            <Link
              exact
              to={`/takeoutTool`}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              {" "}
              <Row>
                <Col>
                  <div style={{ height: "100%" }}>
                    {" "}
                    <br /> <br />
                    <ImUpload className="icon" style={{ color: "#0052CC" }} />
                    <br />
                    <br /> <br />
                    <h2>เบิกสินค้า</h2>
                  </div>
                </Col>
              </Row>
            </Link>
          </Col>
        );
      } else if (
        val.menu_name_en === "Vending-Reoder" &&
        val.permission_view === 1
      ) {
        menu_top.push(
          <Col
            className="home"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor: "white",
            }}
          >
            <Link
              exact
              to={`/settinganother/reorder`}
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <Row>
                <Col>
                  <div>
                    {" "}
                    <br /> <br />
                    <FaPaperPlane
                      className="icon"
                      style={{ color: "#0052CC" }}
                    />{" "}
                    <br />
                    <br /> <br />
                    <h2>ใบสั่งซื้อสินค้า</h2>
                  </div>
                </Col>
              </Row>
            </Link>
          </Col>
        );
      } else if (
        val.menu_name_en === "Vending-Report" &&
        val.permission_view === 1
      ) {
      } else if (
        val.menu_name_en === "Vending-Setting-Another" &&
        val.permission_view === 1
      ) {
        menu_top.push(
          <Col
            className="home"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor: "white",
            }}
          >
            <Link
              exact
              to={`/settinganother`}
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <Row>
                <Col>
                  <div>
                    {" "}
                    <br /> <br />
                    <ImEqualizer
                      className="icon"
                      style={{ color: "#0052CC" }}
                    />{" "}
                    <br />
                    <br /> <br />
                    <h2>ตั้งค่าขั้นสูง</h2>
                  </div>
                </Col>
              </Row>
            </Link>
          </Col>
        );
      }
      if (idx > 4) {
      }
    });
    menu_bottom.push(
      <>
        <Col
          className="home"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor: "white",
          }}
        >
          <Link
            exact
            to={`/inventory`}
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <Row>
              <Col>
                <div>
                  {" "}
                  <br /> <br />
                  <i
                    className="icon fas fa-clipboard-list"
                    style={{ color: "#0052CC" }}
                  ></i>
                  <br />
                  <br /> <br />
                  <h2>รายการสินค้า</h2>
                </div>
              </Col>
            </Row>
          </Link>
        </Col>
        <Col
          className="home"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor: "white",
          }}
        >
          {" "}
          <Link
            exact
            to={`/settinganother/location`}
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <Row>
              <Col>
                <div>
                  {" "}
                  <br /> <br />
                  <MdOutlineAddLocationAlt
                    className="icon"
                    style={{ color: "#0052CC" }}
                  />
                  <br />
                  <br /> <br />
                  <h2>จัดการตำแหน่งสินค้า</h2>
                </div>
              </Col>
            </Row>{" "}
          </Link>
        </Col>
        {/* <Col
          className="home"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor: "white",
          }}
        >
          <Link
            exact
            to={`/rent`}
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <Row>
              <Col>
                <div>
                  {" "}
                  <br /> <br />
                  <AiOutlineSync
                    className="icon"
                    style={{ color: "#0052CC" }}
                  />{" "}
                  <br />
                  <br /> <br />
                  <h2>สินค้าประเภทยืม</h2>
                </div>
              </Col>
            </Row>
          </Link>
        </Col> */}
      </>
    );
    this.setState({ menu_top: menu_top, menu_bottom: menu_bottom });
  }
  _showMenu_top() {
    return this.state.menu_top;
  }
  _showMenu_bottom() {
    return this.state.menu_bottom;
  }
  render() {
    return (
      <>
        <Loading show={this.state.loading} />
        <div>
          <Card>
            <CardHeader>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>หน้าหลัก</h1>
              </Col>
            </CardHeader>
            <CardBody style={{ marginBottom: "0vh" }}>
              <Row>{this._showMenu_top()}</Row>{" "}
              <Row>{this._showMenu_bottom()}</Row>{" "}
            </CardBody>
            <CardFooter>
              <div style={{ fontSize: "2rem", float: "right" }}>
                {" "}
                <h3>
                  <b>สถานะ :</b>{" "}
                  {this.props.status_manchine == "พร้อม" ? (
                    <span class="badge badge-success">พร้อม</span>
                  ) : (
                    <span class="badge badge-danger">
                      {this.props.status_manchine}
                    </span>
                  )}
                </h3>
              </div>{" "}
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
}

export default View;
