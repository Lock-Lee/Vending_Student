import React, { Component } from "react";
import {
  Button,
  CardImg,
  Row,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import GLOBAL from "../../../../../GLOBAL";

export class Baket_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list_in_basket: [],
      status_delete_button: false,
      idx_product_filter: [],
      status_delete: false,
    };
  }
  componentDidMount() {
    let list_in_basket = this.props.list_in_basket;

    this.setState(
      {
        list_in_basket: list_in_basket,
      },
      () => this._filter_status_button()
    );
  }

  componentDidUpdate() {
    let status_delete = this.state.status_delete;
    if (status_delete === true) {
      this._filter_status_button();
      this.setState({
        status_delete: false,
      });
    }
  }

  _filter_status_button = () => {
    let list_in_basket = this.props.list_in_basket;
    let idx_product_filter = this.state.idx_product_filter;

    list_in_basket.forEach((val, idx) => {
      if (
        !idx_product_filter.find(
          (product) => product.product_code === val.product_code
        )
      ) {
        idx_product_filter.push({
          product_code: val.product_code,
          index: idx,
        });
      } else {
        let product_filter = idx_product_filter.find(
          (product) => product.product_code === val.product_code
        );
        product_filter.index = idx;
      }
    });

    this.setState({
      idx_product_filter: idx_product_filter,
    });
  };

  render() {
    return (
      <>
        <ModalHeader style={{ display: "block" }} className="haedermodel">
          <center>
            <h1
              className="header"
              style={{ textAlign: "center", color: "white" }}
            >
              ตระกร้า
            </h1>
          </center>
        </ModalHeader>
        <ModalBody style={{ overflowY: "scroll", height: "70vh" }}>
          <Row>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th width={30} style={{ textAlign: "center" }}>
                    ลำดับ
                  </th>
                  <th width={100} style={{ textAlign: "center" }}>
                    รูปภาพ
                  </th>
                  <th width={500} style={{ textAlign: "center" }}>
                    รายละเอียด
                  </th>
                  <th width={100} style={{ textAlign: "center" }}>
                    จำนวนเบิก
                  </th>
                  <th width={50}></th>
                </tr>
              </thead>
              <tbody>
                {this.state.list_in_basket.map((item, idx) => {
                  return (
                    <tr key={"list_in_basket" + idx}>
                      <td width={30} style={{ textAlign: "center" }}>
                        {idx + 1}
                      </td>
                      <td width={100} style={{ alignItems: "center" }}>
                        <CardImg
                          src={
                            item.product_image
                              ? GLOBAL.BASE_SERVER.URL_IMG + item.product_image
                              : GLOBAL.BASE_SERVER.URL_IMG + "default.png"
                          }
                        />
                      </td>
                      <td width={500}>
                        <h3>ชื่อสินค้า: {item.product_name} </h3>
                        <h6 style={{ color: "#757575" }}>
                          {" "}
                          ประเภทการเบิก: {item.product_issue_type} , ประเภทช่อง:{" "}
                          {item.TypeComp} หน่วยต่อการเบิก: {item.product_unit}{" "}
                        </h6>
                        {/* <h6 style={{ color: "#757575" }}>
                          {" "}
                          ชื่องาน: {item.job_name} , ชื่อกระบวนการ:{" "}
                          {item.job_op_name} , ชื่อเครื่องจักร:
                          {item.machine_name} , ชื่อขั้นตอน:{" "}
                          {item.job_op_tools_name}
                        </h6> */}
                        <span style={{ height: "100vh" }} />
                      </td>

                      <td width={100} style={{ textAlign: "center" }}>
                        {item.product_issue_type !== "Full"
                          ? item.Issue_qty
                          : "ทั้งหมดในช่อง"}
                      </td>

                      <td width={50} style={{ textAlign: "center" }}>
                        {" "}
                        <button
                          className="btn btn-danger"
                          // disabled={
                          //     product_filter_idxs.includes(idx) ? false : true
                          // }
                          onClick={() => {
                            this.props._deleteRowInBasket(idx);
                            this.setState({
                              status_delete: true,
                            });
                          }}
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Row>
        </ModalBody>
        <ModalFooter style={{ display: "block" }}>
          <Button
            color="info"
            type="button"
            style={{
              height: "80px",
              width: "80px",
              backgroundColor: "#EE6E73",
            }}
            onClick={() => this.props._handleClose()}
          >
            {" "}
            <i
              className="far fa-times-circle fa-3x"
              style={{ paddingRight: "40px" }}
            ></i>
            <br></br>
            ยกเลิก
          </Button>

          <Button
            color="info"
            disabled={this.state.list_in_basket.length == 0}
            type="button"
            style={{ height: "80px", width: "80px", float: "right" }}
            onClick={() => this.props._work_withdraw_order()}
          >
            {" "}
            <i
              className="fas fa-cart-arrow-down fa-3x"
              style={{ paddingRight: "50px" }}
            ></i>
            <br></br>
            เบิก
          </Button>
        </ModalFooter>
      </>
    );
  }
}
export default Baket_list;
