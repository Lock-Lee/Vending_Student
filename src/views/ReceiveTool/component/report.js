import React, { Component } from "react";
import { Button, Col, ModalFooter, Row } from "reactstrap";
export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report_product: [],
      all: 0,
    };
  }
  componentDidMount() {
    this.setState(
      {
        report_product: this.props._receive,
      },
      () => {
        this._fetchData();
      }
    );
  }
  _fetchData() {
    let { report_product } = this.state;
    report_product.sort((a, b) => {
      if (a.stock_layout_qty > b.stock_layout_qty + b.stock_qty) {
        return 1;
      }
      if (a.stock_layout_qty < b.stock_layout_qty + b.stock_qty) {
        return -1;
      }
      return 0;
    });
    let { all } = this.state;

    report_product.forEach((value) => {
      if (value.stock_qty !== undefined) {
        all += value.stock_qty;
      }
    });

    this.setState({
      report_product: report_product,
      all: all,
    });
  }
  render() {
    const { report_product } = this.state;
    return (
      <>
        <div>
          {" "}
          <Row>
            <Col>
              <table
                className="table table-striped fixed_header"
                style={{ overflowY: "auto" }}
              >
                {" "}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>ชั้นที่</th>
                    <th>ช่องที่</th>
                    <th> คงเหลือ</th>
                    <th> เติม</th>
                    <th> รวม</th>
                  </tr>{" "}
                </thead>
                <tbody className="table table-striped fixed_header">
                  {report_product.map((value, index, array) => {
                    if (value.stock_qty !== undefined) {
                      return (
                        <>
                          <tr key={"balance_confirm_qty_" + index}>
                            <td>{index + 1}</td>
                            <td>
                              {" "}
                              <label> {value.stock_y} </label>
                            </td>
                            <td>
                              {" "}
                              <label> {parseInt(value.stock_x)} </label>
                            </td>{" "}
                            <td>
                              {" "}
                              <label> {value.stock_layout_qty} </label>{" "}
                            </td>{" "}
                            <td>
                              {" "}
                              <label> {value.stock_qty} </label>{" "}
                            </td>{" "}
                            <td>
                              {" "}
                              <label>
                                {" "}
                                {parseInt(value.stock_layout_qty) +
                                  parseInt(+value.stock_qty)}{" "}
                              </label>{" "}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  })}{" "}
                  <tr>
                    <td colspan="4">
                      <b>รวม</b>
                    </td>

                    <td>
                      {" "}
                      <b>{parseInt(this.state.all)}</b>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>{" "}
            </Col>
          </Row>{" "}
          <ModalFooter className="bodymodal">
            <Button
              color="info"
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                fontSize: "18px",
              }}
              onClick={() => {
                this.props._handleClose();
              }}
            >
              <i className="far fa-calendar-check"></i> {"\u00A0"}
              สิ้นสุด
            </Button>{" "}
          </ModalFooter>{" "}
        </div>
      </>
    );
  }
}
