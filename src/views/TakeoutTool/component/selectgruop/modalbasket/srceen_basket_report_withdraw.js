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
import IssusModel from "../../../../../models/IssusModel";
import StockLogModel from "../../../../../models/StockLogModel";
import ReturnModel from "../../../../../models/ReturnModel";
const return_model = new ReturnModel();
const stock_logmodel = new StockLogModel();
const Issus_Model = new IssusModel();
export class Baket_report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success_history_list: [],
      user_firstname: "",
      user_lastname: "",
      issue_list: [],
      stock_issue_code: "",
      return_list: [],
      stock_return_code: "",
    };
  }
  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    let { success_history, user_code } = this.props;

    // console.log("success_history", success_history);

    const now = new Date();
    const last_code_issus = await Issus_Model.getIssusLastCode({
      code: `IC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    const last_code_return = await return_model.getReturnLastCode({
      code: `RTC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });

    // console.log("last_code_return", last_code_return);

    const Issue_list = await stock_logmodel.getStockLogByIssueCode({
      stock_issue_code: last_code_issus.data,
    });

    const return_list = await stock_logmodel.getStockLogByIssueCode({
      stock_return_code: last_code_return.data,
    });

    // console.log("return_list", return_list.data);

    this.setState({
      stock_issue_code: last_code_issus.data,
      Issue_list: Issue_list.data,
      return_list: return_list.data,
      stock_return_code: last_code_return.data,

      success_history_list:
        success_history.length > 1
          ? success_history.sort((a, b) => a.index - b.index)
          : success_history,
      user_firstname: success_history[0]?.user_firstname,
      user_lastname: success_history[0]?.user_lastname,
    });
  }

  RenderBody() {
    let { success_history } = this.props;

    let body = [];
    let issus = [];
    let user_code = "";
    let total = 0;
    success_history.forEach((item, idx) => {
      let success_history_lists = this.state.success_history_list.filter(
        (val) => val.index === item.index
      );
      let count = success_history_lists.length;

      success_history_lists.forEach((val) => {
        total = total + val.stock_qty;
      });

      user_code = item.user_code;
      if (
        issus.find((data) => data.product_code)?.product_code !== undefined &&
        issus.find((data) => data.product_code)?.product_code ===
          item.product_code &&
        issus.find((data) => data.stock_status)?.stock_status === item.TypeComp
      ) {
        issus[
          issus.findIndex((data) => data.product_code === item.product_code)
        ]["total"] =
          issus[
            issus.findIndex((data) => data.product_code === item.product_code)
          ]["total"] + total;
      } else {
        issus.push({
          stock_status: item.TypeComp,
          total: total,
          product_code: item.product_code,
        });
      }

      if (
        count === 1 ||
        (count > 1 &&
          (idx === 0 || success_history[idx - 1].index !== item.index))
      ) {
        body.push(
          <tr key={item.product_code + "_" + idx}>
            <td
              width={10}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
              rowSpan={count + 1}
            >
              {" "}
              {idx + 1}
            </td>
            <td
              width={70}
              style={{
                alignItems: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
                textAlign: "center",
              }}
              rowSpan={count + 1}
            >
              <CardImg
                style={{
                  width: "10vw",
                  height: "10vw",
                }}
                src={
                  item.product_image
                    ? GLOBAL.BASE_SERVER.URL_IMG + item.product_image
                    : GLOBAL.BASE_SERVER.URL_IMG + "default.png"
                }
              />
            </td>
            <td
              width={70}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
              rowSpan={count + 1}
            >
              <h3>{item.product_name}</h3>
            </td>
            {/* <td width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }}> {item.class}</td>
                    <td width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }}> {parseInt(item.compartment)}</td> */}
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.count_withdraw}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.stock_qty}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.balance_qty}{" "}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.stock_qty}
            </td>
          </tr>
        );
      } else {
        body.push(
          <tr key={item.product_code + "-" + idx}>
            {/* <td width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }}> {item.class}</td>
                    <td width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }}> {parseInt(item.compartment)}</td> */}
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.count_withdraw}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.stock_qty}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.balance_qty}{" "}
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {item.stock_qty}
            </td>
          </tr>
        );
      }

      if (
        !success_history[idx + 1] ||
        success_history[idx + 1].index !== item.index
      ) {
        body.push(
          <tr key={item.product_code + "+" + idx}>
            <td
              width={10}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
              colSpan={2}
            ></td>
            <td
              width={10}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              <b>รวม</b>
            </td>
            <td
              width={30}
              style={{
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "#d8dbe0",
              }}
            >
              {" "}
              {total}
            </td>
          </tr>
        );
      }
    });

    return body;
  }

  async _insert_issue() {
    const {
      Issue_list,
      stock_issue_code,
      stock_return_code,
      return_list,
      success_history_list,
    } = this.state;

    const now = new Date();

    if (
      success_history_list[0] &&
      (success_history_list[0].TypeComp == "New" ||
        success_history_list[0].TypeComp == "RF")
    ) {
      const issue_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${"-"}${now.getDate().toString()}`;

      const res = await Issus_Model.insertIssus({
        issue_code: stock_issue_code,
        issue_date: issue_date,
        Issue_list: Issue_list,
      });

      if (res.require) {
        localStorage.clear();
        window.location.replace("/rtms");
        this.props._handleClose();
      }
    } else if (
      success_history_list[0] &&
      success_history_list[0].TypeComp == "Loan"
    ) {
      const borrow_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${"-"}${now.getDate().toString()}`;

      const res = await return_model.insertReturn({
        return_code: stock_return_code,
        borrow_date: borrow_date,
        return_date: "",
        return_list: return_list,
        return_status: "borrow",
      });

      if (res.require) {
        localStorage.clear();
        window.location.replace("/rtms");
        this.props._handleClose();
      }
    }
  }

  render() {
    return (
      <>
        <ModalHeader style={{ display: "block" }} className="haedermodel">
          <h5
            className="header"
            style={{ textAlign: "center", color: "white" }}
          >
            สรุปการเบิก
          </h5>
        </ModalHeader>
        <ModalBody style={{ overflowY: "scroll", height: "70vh" }}>
          <Row>
            <table className="table ">
              <thead>
                <tr>
                  <th
                    width={10}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    ลำดับ
                  </th>
                  <th
                    width={70}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    รูปภาพ
                  </th>
                  <th
                    width={70}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    ชื่อสินค้า
                  </th>
                  {/* <th width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }} >ชั้นที่</th>
                                    <th width={30} style={{ textAlign: "center", borderTop: '3px solid', borderTopColor: "#d8dbe0" }} >ช่องที่</th> */}
                  <th
                    width={30}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    ครั้งที่
                  </th>
                  <th
                    width={30}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    เบิก
                  </th>
                  <th
                    width={30}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    เหลือ
                  </th>
                  <th
                    width={30}
                    style={{
                      textAlign: "center",
                      borderTop: "3px solid",
                      borderTopColor: "#d8dbe0",
                    }}
                  >
                    รวม
                  </th>
                </tr>
              </thead>
              <tbody>{this.RenderBody()}</tbody>
            </table>
          </Row>
        </ModalBody>
        <ModalFooter>
          <b style={{ marginRight: "68%" }}>
            ผู้เบิกคือ {this.state.user_firstname} {this.state.user_lastname}
          </b>

          <Button
            color="info"
            style={{
              width: "180px",
              height: "80px",
              marginLeft: "50px",
              backgroundColor: "#EE6E73",
              fontSize: "18px",
            }}
            onClick={() => this._insert_issue()}
          >
            <i className="far fa-times-circle"></i> {"\u00A0"}
            ปิด
          </Button>
        </ModalFooter>
      </>
    );
  }
}
export default Baket_report;
