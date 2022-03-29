import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import "react-simple-keyboard/build/css/index.css";
import { Link } from "react-router-dom";
import { Loading } from "../../component/revel-strap";
import Issue_select_group from "./component/selectgruop/Issue_select_group";
import Issue_select_menu from "./component/selectmenugruop/main_select_menu"
import TakeoutAssignJobModel from "../../models/TakeoutAssignJobModel";
import ProductMenuModel from "../../models/ProductMenuModel";
import Swal from "sweetalert2";

const productmenu_model = new ProductMenuModel();
const takeoutassignjob_Model = new TakeoutAssignJobModel();

class TakeoutTool extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      current_display: "",
      jobs: [],
      user_code: "",
      user_firstname: "",
      user_lastname: "",
      product_menu_name_ref: "",
      Menu_Level1: [],
      menu_name_select: "",
      gridTemplateColumns: "",
    };
  }

  componentDidMount() {

    this._fetchData();
    if (this.props.status_manchine === "ไม่พร้อม" || this.props.status_manchine === "เชื่อมต่อไม่ได้") {
      Swal.fire({
        title: "เชื่อมต่อไม่สำเร็จ", html: "กรุณาตรวจสอบตู้ ?", icon: "error",
      }).then((result) => { this.props.history.push("/"); });
    }
  }

  async _fetchData() {
    let { product_menu_name_ref } = this.state

    const user_code = this.props.USER.user_code;
    const user_firstname = this.props.USER.user_firstname;
    const user_lastname = this.props.USER.user_lastname;

    const jobs = await takeoutassignjob_Model.getJobBy();
    const Menu_Level1 = await productmenu_model.getProductMenuBy({ product_menu_name_ref });

    // console.log("Menu_Level1", Menu_Level1.data.length);

    this.setState({
      loading: false,
      jobs: jobs.data,
      user_code: user_code,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
      Menu_Level1: Menu_Level1.data,
    }, () =>
      this._set_gridTemplateColumns(),
      this._push_tag_null());
  }

  _on_select_menu_group(menu_name) {
    this.setState({
      current_display: "select-menu-gruop",
      menu_name_select: menu_name
    })
  }

  _displayback = (e) => {
    this.setState({
      current_display: e.current_display,
    });
  };

  _push_tag_null() {
    let { Menu_Level1 } = this.state
    let length_menu = Menu_Level1.length

    let tag_null = []

    if (length_menu == 0) {
      tag_null.push(
        <Col></Col>
      )
      tag_null.push(
        <Col></Col>
      )
      return tag_null;
    }
    else if (length_menu == 1) {
      tag_null.push(
        <Col></Col>
      )
      return tag_null;
    }
    else if (length_menu == 2) {
      tag_null.push(
        <Col></Col>
      )
      return tag_null;
    }
    else {
      tag_null.push(
        <></>
      )
      return tag_null;
    }
  }

  _set_gridTemplateColumns() {

    let { Menu_Level1 } = this.state
    let length_menu = Menu_Level1.length

    if (length_menu == 0) {
      this.setState({
        gridTemplateColumns: "20% 20% 20% 20% 20%"
      })
    }

    else if (length_menu == 1) {
      this.setState({
        gridTemplateColumns: "25% 25% 25% 25%"
      })
    }

    else if (length_menu == 2) {
      this.setState({
        gridTemplateColumns: "20% 20% 20% 20% 20%"
      })
    }

    else if (length_menu == 3) {
      this.setState({
        gridTemplateColumns: "25% 25% 25% 25%"
      })
    }

    else {
      this.setState({
        gridTemplateColumns: "20% 20% 20% 20% 20%"
      })
    }

  }

  _showDisplay() {
    const { current_display, gridTemplateColumns } = this.state;
    if (current_display === "") {
      //หน้าเริ่มต้น
      return (
        <Card>
          <Loading show={this.state.loading} />
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/">
                  <Button
                    type="button"
                    style={{
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>เบิกสินค้า</h1>
              </Col>
              <Col style={{ textAlign: "center" }}> </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "auto", margin: "20px" }}>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplateColumns,
              }}
            >

              {this._push_tag_null()}

              <Col
                className="home"
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  backgroundColor: "white",
                  maxWidth: "95%"
                }}

              >
                {" "}
                <Link
                  to="/takeoutTool"
                  style={{ alignItems: "center", textAlign: "center" }}
                  onClick={() =>
                    this.setState({ current_display: "no-assign-job" })
                  }
                >
                  <Row>
                    <Col style={{ alignItems: "center", textAlign: "center" }}>
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-search icon"
                          style={{ color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>ค้นหา</h2>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Col>

              {this.state.Menu_Level1.map((item, idx) => (

                <Col
                  className="home"
                  style={{
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    backgroundColor: "white",
                    maxWidth: "95%"
                  }}
                >
                  {" "}
                  <Link
                    to="/takeoutTool"
                    style={{ alignItems: "center", textAlign: "center" }}
                    onClick={
                      () => this._on_select_menu_group(item.product_menu_name)
                    }
                  >
                    <Row>
                      <Col style={{ alignItems: "center", textAlign: "center" }}>
                        <div>
                          {" "}
                          <br />
                          <br />
                          <i
                            className="fab fa-buromobelexperte icon"
                            style={{ color: "#0052CC" }}
                          ></i>{" "}
                          <br />
                          <br /> <br />
                          <h2>{item.product_menu_name}</h2>
                        </div>
                      </Col>
                    </Row>
                  </Link>

                </Col>

              ))}

            </div>

          </CardBody>

          <br></br>
          <br></br>
          <br></br>

        </Card>
      );
    } else if (current_display === "no-assign-job") {
      //หน้าเบิกแบบ เลือกจากกลุ่ม และ ประเภทสินค้า
      return (
        <Issue_select_group
          status_manchine={this.props.status_manchine}
          user_code={this.state.user_code}
          user_firstname={this.state.user_firstname}
          user_lastname={this.state.user_lastname}
          _displayback={this._displayback}
        />
      );
    }
    else if (current_display === "select-menu-gruop") {
      //หน้าเบิกแบบ
      return (
        <Issue_select_menu
          status_manchine={this.props.status_manchine}
          menu_name_select={this.state.menu_name_select}
          user_code={this.state.user_code}
          user_firstname={this.state.user_firstname}
          user_lastname={this.state.user_lastname}
          _displayback={this._displayback}
        />
      );
    }
  }
  render() {
    return <div>{this._showDisplay()}</div>;
  }
}

export default TakeoutTool;
