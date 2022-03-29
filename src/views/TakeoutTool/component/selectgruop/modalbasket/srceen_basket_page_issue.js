import React, { Component } from "react";
import {
  Button,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Input,
  Row,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Swal from "sweetalert2";
import GLOBAL from "../../../../../GLOBAL";
import { Loading } from "../../../../../component/revel-strap";
import socketIOClient from "socket.io-client";
import TakeoutTool from "../../../../../models/TakeoutAssignJobModel";
import StockLogModel from "../../../../../models/StockLogModel";
import IssusModel from "../../../../../models/IssusModel";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const issus_model = new IssusModel();
const stockLog_Model = new StockLogModel();
const takeoutTool_model = new TakeoutTool();
const endpoint = "http://localhost:7001";
let round_issue = 0;

export class Baket_issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      issue_by_list: [],
      runing_list: 1,
      runing_list_in_list: 1,
      current_display: "waiting_machine",
      keyword: "",
      balance_last_stock: "",
      show_detail: [],
      balance_qty: "",
      balance_confirm_qty: "",
      stock_qty: "",
      type_withdraw: "",
      check_status_new_list: true,
      no_change_value_length_list: 0,
      status_door_close: false,
      stock_remark: "-",
      status_wrong_case: false,
      confirm_conclusion_withdraw: false,
      detail_withdraw: [],
      status_special_case: false,
      user_firstname: "",
      user_lastname: "",
      sw_loop: true,
    };
  }
  async componentDidMount() {
    let { list_in_basket } = this.props;

    let no_change_value_length_list = this.props.list_in_basket.length;

    this._scoketSetup();
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // setTimeout(() => {
    //   this.setState({
    //     status_door_close: true,
    //     loading: false,
    //     current_display: "confirm_balance_qty",
    //   });
    // }, 1500);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.setState(
      {
        issue_by_list: list_in_basket,
        balance_qty:
          list_in_basket[0].index_stock_layout_issue[0]?.stock_layout_qty,
        user_firstname: list_in_basket[0]?.user_firstname,
        user_lastname: list_in_basket[0]?.user_lastname,
        no_change_value_length_list: no_change_value_length_list,
      },
      () => this._list_issue()
    );
  }

  _scoketSetup() {
    //รับค่า
    const socket = socketIOClient(endpoint);
    socket.on("answer-micro", (messageNew) => {
      let messages = messageNew.split("-");
      if (messages[0] === "CC") {
        if (messages[1] === "RUNNING\r") {
          this.setState({
            loading: true,
          });
        } else if (messages[1] === "FINISH\r") {
          // เมื่อประตูเปิด ให้เด้งไปหน้าคอนเฟริม
          this.setState({
            current_display: "confirm_balance_qty",
            loading: false,
            status_door_close: false,
          });
        } else if (messages[1] === "DOORCLOSE\r") {
          this.setState({
            status_door_close: true,
          });
        }
      }
    });
  }

  _sendMessage = (command_micro) => {
    this.setState(
      {
        command_micro,
        show_finish: true,
      },
      () => {
        const socket = socketIOClient(endpoint);
        socket.emit("connect-micro", command_micro);
      }
    );
  };

  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();
    if (button === "{bksp}" || button === "backspace") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else {
      keyword += button;
    }
    this.setState({
      keyword: keyword,
    });
  };

  _list_issue = () => {
    //เช็ครายการ

    let { issue_by_list } = this.state;

    if (issue_by_list) {
      if (issue_by_list[0]) {
        round_issue = issue_by_list[0].index_stock_layout_issue.length;
      }

      if (
        issue_by_list[0]?.product_issue_type === "Piecemeal" ||
        issue_by_list[0]?.product_issue_type === "Setpiece" ||
        issue_by_list[0]?.product_issue_type === "Full"
      ) {
        this._list_in_list_issue();
        this.setState({
          balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
          show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
          type_withdraw: issue_by_list[0]?.product_issue_type,
          check_status_new_list: false,
        });
      }
    }

    if (issue_by_list.length === 0) {
      this.props._success_withdraw();
    }
  };

  _list_in_list_issue = async () => {
    //เช็ครายการในรายการ
    let { issue_by_list, runing_list } = this.state;
    if (issue_by_list) {
      if (
        issue_by_list[0] &&
        issue_by_list[0].index_stock_layout_issue.length !== 0
      ) {
        let stock_x = issue_by_list[0].index_stock_layout_issue[0].stock_x;
        let stock_y = issue_by_list[0].index_stock_layout_issue[0].stock_y;
        let stock_code =
          issue_by_list[0].index_stock_layout_issue[0].stock_code;

        let command_micro = [];
        command_micro.push(stock_code, stock_x, stock_y);

        this._sendMessage(command_micro);
      } else if (
        issue_by_list[0] &&
        issue_by_list[0].index_stock_layout_issue.length === 0
      ) {
        if (issue_by_list[0].issuing_license === true) {

          issue_by_list.shift();
          runing_list++;
          this.setState(
            {
              issue_by_list: issue_by_list,
              runing_list: runing_list,
              check_status_new_list: true,
              confirm_conclusion_withdraw: false,
              status_special_case: false,
              sw_loop: true,
              runing_list_in_list: 1,
            },
            this._list_issue()
          );

        } else {
          this._set_index_compart_new();
        }
      }
    }
  };

  _getout_list_in_list = () => {
    // ลบรายการออก

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // setTimeout(() => {
    //   this.setState({
    //     status_door_close: true,
    //     loading: false,
    //     current_display: "confirm_balance_qty",
    //   });
    // }, 1500);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let issue_by_list = this.state.issue_by_list;
    let stock_type = "OUT";
    if (issue_by_list[0].product_issue_type === "Full") {
      if (issue_by_list) {
        let type_issue = "Full";
        let stock_layout_code =
          issue_by_list[0].index_stock_layout_issue[0].stock_layout_code;
        let last_updata_stock_layout_qty =
          issue_by_list[0].last_updata_stock_layout_qty;
        let product_code = issue_by_list[0].product_code;
        let product_name = issue_by_list[0].product_name;
        let product_image = issue_by_list[0].product_image;
        let {
          user_code,
          product_price,
          TypeComp,
          job_level_1_name,
          job_level_2_name,
          job_level_3_name,
          job_level_4_name,
        } = issue_by_list[0];
        let { stock_code, stock_x, stock_y, stock_use } =
          issue_by_list[0].index_stock_layout_issue[0];
        let stock_qty = 0;

        this._updatanewdata({
          type_issue,
          stock_layout_code,
          last_updata_stock_layout_qty,
          product_code,
          stock_code,
          stock_qty,
          stock_type,
          user_code,
          product_price,
          stock_x,
          stock_y,
          product_image,
          product_name,
          stock_use,
          TypeComp,
          job_level_1_name,
          job_level_2_name,
          job_level_3_name,
          job_level_4_name,
        });
      }
    } else if (
      issue_by_list[0].product_issue_type === "Setpiece" ||
      issue_by_list[0].product_issue_type === "Piecemeal"
    ) {
      if (issue_by_list) {
        let type_issue = "SetpieceORPiecemeal";
        let stock_layout_code =
          issue_by_list[0]?.index_stock_layout_issue[0].stock_layout_code;
        let last_updata_stock_layout_qty =
          issue_by_list[0].last_updata_stock_layout_qty;
        let product_code = issue_by_list[0].product_code;
        let product_name = issue_by_list[0].product_name;
        let product_image = issue_by_list[0].product_image;
        let {
          user_code,
          product_price,
          TypeComp,
          job_level_1_name,
          job_level_2_name,
          job_level_3_name,
          job_level_4_name,
        } = issue_by_list[0];
        let { stock_code, stock_x, stock_y, stock_use } =
          issue_by_list[0].index_stock_layout_issue[0];
        let stock_qty =
          issue_by_list[0].Issue_qty -
          issue_by_list[0].index_stock_layout_issue[0].stock_layout_qty;

        this._updatanewdata({
          type_issue,
          stock_layout_code,
          last_updata_stock_layout_qty,
          product_code,
          stock_code,
          stock_qty,
          stock_type,
          user_code,
          product_price,
          stock_x,
          stock_y,
          product_image,
          product_name,
          stock_use,
          TypeComp,
          job_level_1_name,
          job_level_2_name,
          job_level_3_name,
          job_level_4_name,
        });
      }
    }
  };

  _updatanewdata = async (data) => {
    let status_special_case = this.state.status_special_case;
    let issue_by_list = this.state.issue_by_list;
    let runing_list = this.state.runing_list;
    let runing_list_in_list = this.state.runing_list_in_list;
    const now = new Date();
    const stocklog_code = await stockLog_Model.getStockLogLastCode({
      code: `SL${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });
    let stock_log_ref_code = "-";
    let stock_remark = this.state.stock_remark;
    let updatanewdata = data;

    var stock_log_code = stocklog_code.data;
    const event_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${now
        .getDate()
        .toString()
        .padStart(2, "0")}${"  "}${now
          .getHours()
          .toString()
          .padStart(2, "0")}${":"}${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}${":"}${now.getSeconds().toString().padStart(2, "0")}`;

    if (updatanewdata) {
      let type_issue = updatanewdata.type_issue;

      let {
        stock_layout_code,
        product_code,
        stock_code,
        stock_type,
        user_code,
        product_price,
        stock_x,
        stock_y,
        product_image,
        product_name,
        stock_use,
        TypeComp,
        job_level_1_name,
        job_level_2_name,
        job_level_3_name,
        job_level_4_name,
      } = updatanewdata;

      if (type_issue === "Full") {
        let stock_price = product_price;
        let balance_qty = this.state.balance_qty;
        let balance_confirm_qty = this.state.balance_confirm_qty;
        let stock_layout_qty = this.state.balance_confirm_qty;
        let stock_qty = Math.abs(this.state.stock_qty);
        const res = await takeoutTool_model.updateproductbyissue({
          stock_layout_code,
          stock_layout_qty,
          product_code,
          stock_log_code,
          stock_code,
          user_code,
          stock_type,
          stock_price,
          event_date,
          stock_log_ref_code,
          stock_remark,
          balance_qty,
          balance_confirm_qty,
          stock_qty,
          stock_use,
          TypeComp,
          user_firstname: this.state.user_firstname,
          user_lastname: this.state.user_lastname,
          product_name: issue_by_list[0].product_name,
          job_level_1_name,
          job_level_2_name,
          job_level_3_name,
          job_level_4_name,
        });
        if (res.require === true) {
          issue_by_list[0].index_stock_layout_issue.splice(0, 1);
          runing_list_in_list++;
          setTimeout(() => {
            this.setState(
              {
                issue_by_list: issue_by_list,
                runing_list_in_list: runing_list_in_list,
              },
              () => this._list_issue()
            );
          }, 1000);

          Swal.fire({ title: "การเบิกสำเร็จ", icon: "success", timer: 1500 });
          this.props._onsave_success_history({
            index: runing_list,
            user_code: user_code,
            TypeComp: TypeComp,
            product_code: product_code,
            product_name: product_name,
            product_image: product_image,
            class: stock_y,
            compartment: stock_x,
            balance_qty: balance_confirm_qty,
            stock_qty: stock_qty,
            sum_stock: 0,
            user_firstname: this.state.user_firstname,
            user_lastname: this.state.user_lastname,
            count_withdraw: runing_list_in_list - 1,
          });
        } else {
          Swal.fire({ title: "เกิดข้อผิดพลาด !", icon: "error" });
        }
      } else if (type_issue === "SetpieceORPiecemeal") {
        if (round_issue > 0) {
          //รอบการเบิกไม่ใช่ครั้งสุดท้าย
          let stock_price = product_price;
          let balance_qty = this.state.balance_qty;
          let balance_confirm_qty = this.state.balance_confirm_qty;
          let stock_layout_qty = this.state.balance_confirm_qty;
          let stock_qty = Math.abs(this.state.stock_qty);
          const res = await takeoutTool_model.updateproductbyissue({
            stock_layout_code,
            stock_layout_qty,
            product_code,
            stock_log_code,
            stock_code,
            user_code,
            stock_type,
            stock_qty,
            stock_price,
            event_date,
            stock_log_ref_code,
            stock_remark,
            balance_qty,
            balance_confirm_qty,
            stock_use,
            TypeComp,
            user_firstname: this.state.user_firstname,
            user_lastname: this.state.user_lastname,
            product_name: issue_by_list[0].product_name,
            job_level_1_name,
            job_level_2_name,
            job_level_3_name,
            job_level_4_name,
          });
          if (res.require === true) {
            issue_by_list[0].index_stock_layout_issue.splice(0, 1);
            runing_list_in_list++;

            if (status_special_case === true) {
              issue_by_list[0].Issue_qty =
                issue_by_list[0].Issue_qty - stock_qty;
              issue_by_list[0].issuing_license = false;
              issue_by_list[0].index_stock_layout_issue = [];

              setTimeout(() => {
                this.setState(
                  {
                    issue_by_list: issue_by_list,
                    runing_list_in_list: runing_list_in_list,
                    status_special_case: false,
                  },
                  () => this._list_issue()
                );
              }, 1000);
            } else {
              issue_by_list[0].Issue_qty =
                issue_by_list[0].Issue_qty - stock_qty;
              setTimeout(() => {
                this.setState(
                  {
                    issue_by_list: issue_by_list,
                    runing_list_in_list: runing_list_in_list,
                  },
                  () => this._list_issue()
                );
              }, 1000);
            }

            Swal.fire({ title: "การเบิกสำเร็จ", icon: "success", timer: 1500 });
            this.props._onsave_success_history({
              user_code: user_code,
              TypeComp: TypeComp,
              index: runing_list,
              product_code: product_code,
              product_name: product_name,
              product_image: product_image,
              class: stock_y,
              compartment: stock_x,
              balance_qty: balance_confirm_qty,
              stock_qty: stock_qty,
              sum_stock: 0,
              user_firstname: this.state.user_firstname,
              user_lastname: this.state.user_lastname,
              count_withdraw: runing_list_in_list - 1,
            });
          } else {
            Swal.fire({ title: "เกิดข้อผิดพลาด !", icon: "error" });
          }
        } else {
          // รอบการเบิกครั้งสุดท้าย
          let stock_price = product_price;
          let balance_qty = this.state.balance_qty;
          let balance_confirm_qty = this.state.balance_confirm_qty;
          let stock_layout_qty = this.state.balance_confirm_qty;
          let stock_qty = Math.abs(this.state.stock_qty);
          const res = await takeoutTool_model.updateproductbyissue({
            stock_layout_code,
            stock_layout_qty,
            product_code,
            stock_log_code,
            stock_code,
            user_code,
            stock_type,
            stock_qty,
            stock_price,
            event_date,
            stock_log_ref_code,
            stock_remark,
            balance_qty,
            balance_confirm_qty,
            stock_use,
            TypeComp,
            user_firstname: this.state.user_firstname,
            user_lastname: this.state.user_lastname,
            product_name: issue_by_list[0].product_name,
            job_level_1_name,
            job_level_2_name,
            job_level_3_name,
            job_level_4_name,
          });
          if (res.require === true) {
            issue_by_list[0].index_stock_layout_issue.splice(0, 1);
            runing_list_in_list++;
            if (status_special_case === true) {
              issue_by_list[0].Issue_qty =
                issue_by_list[0].Issue_qty - stock_qty;
              issue_by_list[0].issuing_license = false;
              issue_by_list[0].index_stock_layout_issue = [];

              setTimeout(() => {
                this.setState(
                  {
                    issue_by_list: issue_by_list,
                    runing_list_in_list: runing_list_in_list,
                    status_special_case: false,
                  },
                  () => this._list_issue()
                );
              }, 1000);
            } else {
              issue_by_list[0].Issue_qty =
                issue_by_list[0].Issue_qty - stock_qty;
              setTimeout(() => {
                this.setState(
                  {
                    issue_by_list: issue_by_list,
                    runing_list_in_list: runing_list_in_list,
                  },
                  () => this._list_issue()
                );
              }, 1000);
            }

            Swal.fire({ title: "การเบิกสำเร็จ", icon: "success", timer: 1500 });
            this.props._onsave_success_history({
              index: runing_list,
              user_code: user_code,
              TypeComp: TypeComp,
              product_code: product_code,
              product_name: product_name,
              product_image: product_image,
              class: stock_y,
              compartment: stock_x,
              balance_qty: balance_confirm_qty,
              stock_qty: stock_qty,
              sum_stock: 0,
              user_firstname: this.state.user_firstname,
              user_lastname: this.state.user_lastname,
              count_withdraw: runing_list_in_list - 1,
            });
          } else {
            Swal.fire({ title: "เกิดข้อผิดพลาด !", icon: "error" });
          }
        }
      }
    }
  };
  _onsave_balance_qty_normal_case = (
    balance_qty,
    balance_confirm_qty,
    stock_qty
  ) => {
    let status_door_close = this.state.status_door_close;
    if (status_door_close === true) {
      this.setState(
        {
          loading: false,
          current_display: "waiting_machine",
          balance_qty: balance_qty,
          balance_confirm_qty: balance_confirm_qty,
          stock_qty: stock_qty,
        },
        () => this._getout_list_in_list()
      );
    } else {
      Swal.fire({
        title: "กรุณาปิดประตู !",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  _onsave_balance_qty_wrong_case = (
    balance_qty,
    balance_confirm_qty,
    stock_qty
  ) => {
    if (balance_confirm_qty === "") {
      Swal.fire({ title: "กรุณาระบุจำนวนคงเหลือ !", icon: "warning" });
    }

    this._on_save_history_wrong_case(stock_qty);

    let { status_door_close, show_detail } = this.state;

    if (balance_confirm_qty === null) {
      //บันทึก balance_qty และ stock_qty
      let save_stock_qty = stock_qty;

      if (round_issue === 1) {
        this.setState(
          {
            current_display: "re-stock-qty",
            balance_qty: show_detail?.stock_layout_qty - stock_qty,
            keyword: show_detail?.stock_layout_qty - stock_qty,
            stock_qty: save_stock_qty,
          },
          () => Swal.fire({ title: "กรุณาระบุจำนวนคงเหลือ !", icon: "warning" })
        );
      } else {
        this.setState(
          {
            current_display: "re-stock-qty",
            balance_qty: show_detail?.stock_layout_qty - stock_qty,
            keyword: show_detail?.stock_layout_qty - stock_qty,
            stock_qty: save_stock_qty,
          },
          () => Swal.fire({ title: "กรุณาระบุจำนวนคงเหลือ !", icon: "warning" })
        );
      }
    } else {
      // บันทึก balance_confirm
      if (status_door_close === true && balance_confirm_qty !== "") {
        this.setState(
          {
            loading: false,
            current_display: "waiting_machine",
            balance_confirm_qty: balance_confirm_qty,
          },
          () => this._getout_list_in_list()
        );
      } else if (balance_confirm_qty === "") {
        Swal.fire({ title: "กรุณาระบุจำนวนคงเหลือ !", icon: "warning" });
      } else if (status_door_close === false) {
        Swal.fire({
          title: "กรุณาปิดประตู !",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  _on_save_history_wrong_case = (stock_qty) => {
    let type_withdraw = this.state.type_withdraw;
    let issue_by_list = this.state.issue_by_list;
    let show_detail = this.state.show_detail;
    let balance_last_stock = this.state.balance_last_stock;
    balance_last_stock = Math.abs(balance_last_stock);

    if (stock_qty !== null && type_withdraw !== "Full") {
      if (type_withdraw === "Setpiece") {
        if (issue_by_list[0].index_stock_layout_issue.length > 1) {
          if (stock_qty < show_detail?.stock_layout_qty) {
            this.setState({
              status_special_case: true,
            });
          }
        } else if (issue_by_list[0].index_stock_layout_issue.length === 1) {
          if (stock_qty < show_detail?.stock_layout_qty - balance_last_stock) {
            this.setState({
              status_special_case: true,
            });
          }
        }
      } else if (type_withdraw === "Piecemeal") {
        if (stock_qty < issue_by_list[0].Issue_qty) {
          this.setState({
            status_special_case: true,
          });
        }
      }
    }
  };

  _set_index_compart_new = async () => {
    let product_code = this.state.issue_by_list[0].product_code;
    let TypeComp = this.state.issue_by_list[0].TypeComp;
    let product_issue_type = this.state.issue_by_list[0].product_issue_type;

    const res = await takeoutTool_model.getindexCompartfromFIFO({
      product_code,
      TypeComp,
    });

    if (product_issue_type === "Setpiece") {
      let issue_by_list = this.state.issue_by_list;
      let fullslot =
        issue_by_list[0].product_package_qty *
        issue_by_list[0].product_refill_unit;
      this._setindexComp_type_setpiece_new(res.data, fullslot, issue_by_list);
    } else if (product_issue_type === "Piecemeal") {
      let issue_by_list = this.state.issue_by_list;
      let fullslot =
        issue_by_list[0].product_package_qty *
        issue_by_list[0].product_refill_unit;
      let Issue_qty_piecemeal =
        issue_by_list[0].product_issue_unit *
        issue_by_list[0].product_package_qty;
      this._setindexComp_type_piecemeal_new(
        res.data,
        fullslot,
        Issue_qty_piecemeal
      );
    } else if (product_issue_type === "Full") {
      let issue_by_list = this.state.issue_by_list;
      let fullslot =
        issue_by_list[0].product_package_qty *
        issue_by_list[0].product_refill_unit;
      let Issue_qty_piecemeal =
        issue_by_list[0].product_issue_unit *
        issue_by_list[0].product_package_qty;
      this._setindexComp_type_full_new(res.data, fullslot, Issue_qty_piecemeal);
    }
  };

  _setindexComp_type_setpiece_new = (index_stock_layout, fullslot) => {
    let not_full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty < fullslot && val.stock_use !== 1;
    });
    let full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty === fullslot && val.stock_use !== 1;
    });
    let free_slots = index_stock_layout.filter((val) => {
      return val.stock_use === 1;
    });

    let issue_by_list = this.state.issue_by_list;
    if (not_full_slots.length !== 0) {
      let new_issue_qty = issue_by_list[0].Issue_qty;
      for (let i = 0; i < not_full_slots.length; i++) {
        if (new_issue_qty > 0) {
          new_issue_qty = new_issue_qty - not_full_slots[i].stock_layout_qty;
          issue_by_list[0].index_stock_layout_issue.push(not_full_slots[i]);
          issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
          issue_by_list[0].issuing_license = true;
          this.setState({
            issue_by_list: issue_by_list,
            balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
            show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
            type_withdraw: issue_by_list[0]?.product_issue_type,
            check_status_new_list: false,
            sw_loop: false,
          });
          if (i === not_full_slots.length - 1 && new_issue_qty > 0) {
            if (free_slots.length > 0) {
              for (let i = 0; i < free_slots.length; i++) {
                if (new_issue_qty > 0) {
                  new_issue_qty =
                    new_issue_qty - free_slots[i].stock_layout_qty;
                  issue_by_list[0].index_stock_layout_issue.push(free_slots[i]);
                  issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
                  issue_by_list[0].issuing_license = true;
                  this.setState({
                    issue_by_list: issue_by_list,
                    balance_last_stock:
                      issue_by_list[0]?.last_updata_stock_layout_qty,
                    show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
                    type_withdraw: issue_by_list[0]?.product_issue_type,
                    check_status_new_list: false,
                    sw_loop: false,
                  });
                  if (i === free_slots.length - 1 && new_issue_qty > 0) {
                    for (let i = 0; i < full_slots.length; i++) {
                      if (new_issue_qty > 0) {
                        new_issue_qty =
                          new_issue_qty - full_slots[i].stock_layout_qty;
                        issue_by_list[0].index_stock_layout_issue.push(
                          full_slots[i]
                        );
                        issue_by_list[0].last_updata_stock_layout_qty =
                          new_issue_qty;
                        issue_by_list[0].issuing_license = true;
                        this.setState({
                          issue_by_list: issue_by_list,
                          balance_last_stock:
                            issue_by_list[0]?.last_updata_stock_layout_qty,
                          show_detail:
                            issue_by_list[0]?.index_stock_layout_issue[0],
                          type_withdraw: issue_by_list[0]?.product_issue_type,
                          check_status_new_list: false,
                          sw_loop: false,
                        });
                      }
                    }
                  }
                }
              }
            } else {
              if (full_slots.length > 0) {
                for (let i = 0; i < full_slots.length; i++) {
                  if (new_issue_qty > 0) {
                    new_issue_qty =
                      new_issue_qty - full_slots[i].stock_layout_qty;
                    issue_by_list[0].index_stock_layout_issue.push(
                      full_slots[i]
                    );
                    issue_by_list[0].last_updata_stock_layout_qty =
                      new_issue_qty;
                    issue_by_list[0].issuing_license = true;
                    this.setState({
                      issue_by_list: issue_by_list,
                      balance_last_stock:
                        issue_by_list[0]?.last_updata_stock_layout_qty,
                      show_detail:
                        issue_by_list[0]?.index_stock_layout_issue[0],
                      type_withdraw: issue_by_list[0]?.product_issue_type,
                      check_status_new_list: false,
                      sw_loop: false,
                    });
                  }
                }
              }
            }
          }
        }
      }
    } else if (not_full_slots.length === 0 && free_slots.length > 0) {
      let new_issue_qty = issue_by_list[0].Issue_qty;
      if (free_slots.length > 0) {
        for (let i = 0; i < free_slots.length; i++) {
          if (new_issue_qty > 0) {
            new_issue_qty = new_issue_qty - free_slots[i].stock_layout_qty;
            issue_by_list[0].index_stock_layout_issue.push(free_slots[i]);
            issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
            issue_by_list[0].issuing_license = true;
            this.setState({
              issue_by_list: issue_by_list,
              balance_last_stock:
                issue_by_list[0]?.last_updata_stock_layout_qty,
              show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
              type_withdraw: issue_by_list[0]?.product_issue_type,
              check_status_new_list: false,
              sw_loop: false,
            });
            if (i === free_slots.length - 1 && new_issue_qty > 0) {
              for (let i = 0; i < full_slots.length; i++) {
                if (new_issue_qty > 0) {
                  new_issue_qty =
                    new_issue_qty - full_slots[i].stock_layout_qty;
                  issue_by_list[0].index_stock_layout_issue.push(full_slots[i]);
                  issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
                  issue_by_list[0].issuing_license = true;
                  this.setState({
                    issue_by_list: issue_by_list,
                    balance_last_stock:
                      issue_by_list[0]?.last_updata_stock_layout_qty,
                    show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
                    type_withdraw: issue_by_list[0]?.product_issue_type,
                    check_status_new_list: false,
                    sw_loop: false,
                  });
                }
              }
            }
          }
        }
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length > 0
    ) {
      let new_issue_qty = issue_by_list[0].Issue_qty;
      if (full_slots.length > 0) {
        for (let i = 0; i < full_slots.length; i++) {
          if (new_issue_qty > 0) {
            new_issue_qty = new_issue_qty - full_slots[i].stock_layout_qty;
            issue_by_list[0].index_stock_layout_issue.push(full_slots[i]);
            issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
            issue_by_list[0].issuing_license = true;
            this.setState({
              issue_by_list: issue_by_list,
              balance_last_stock:
                issue_by_list[0]?.last_updata_stock_layout_qty,
              show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
              type_withdraw: issue_by_list[0]?.product_issue_type,
              check_status_new_list: false,
              sw_loop: false,
            });
          }
        }
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length === 0
    ) {
      Swal.fire({
        title: "เกิดข้อผิดพลาดในการหาตำแหน่งช่อง !",
        icon: "warning",
      });
      issue_by_list[0].issuing_license = true;
      issue_by_list[0].Issue_qty = "เกิดข้อผิดพลาด";
      this.setState({
        issue_by_list: issue_by_list,
        loading: false,
      });

      this.props._onsave_success_history({
        index: this.state.runing_list,
        TypeComp: issue_by_list[0].TypeComp,
        product_code: issue_by_list[0].product_code,
        product_name: issue_by_list[0].product_name,
        product_image: issue_by_list[0].product_image,
        class: "-",
        compartment: "-",
        balance_qty: "-",
        stock_qty: 0,
        sum_stock: 0,
        user_firstname: this.state.user_firstname,
        user_lastname: this.state.user_lastname,
        count_withdraw: "เกิดข้อผิดพลาด",
      });
    }

    this._list_in_list_issue();
  };

  _setindexComp_type_piecemeal_new = (
    index_stock_layout,
    fullslot,
    Issue_qty_piecemeal
  ) => {
    let not_full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty < fullslot && val.stock_use !== 1;
    });
    let full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty === fullslot && val.stock_use !== 1;
    });
    let free_slots = index_stock_layout.filter((val) => {
      return val.stock_use === 1;
    });
    let issue_by_list = this.state.issue_by_list;

    if (not_full_slots.length !== 0) {
      let new_issue_qty = Issue_qty_piecemeal;
      for (let i = 0; i < not_full_slots.length; i++) {
        if (new_issue_qty > 0) {
          new_issue_qty = new_issue_qty - not_full_slots[i].stock_layout_qty;
          issue_by_list[0].index_stock_layout_issue.push(not_full_slots[i]);
          issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
          issue_by_list[0].issuing_license = true;
          this.setState({
            issue_by_list: issue_by_list,
            balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
            show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
            type_withdraw: issue_by_list[0]?.product_issue_type,
            check_status_new_list: false,
            sw_loop: false,
          });
          if (i === not_full_slots.length - 1 && new_issue_qty > 0) {
            if (free_slots.length > 0) {
              for (let i = 0; i < free_slots.length; i++) {
                if (new_issue_qty > 0) {
                  new_issue_qty =
                    new_issue_qty - free_slots[i].stock_layout_qty;
                  issue_by_list[0].index_stock_layout_issue.push(free_slots[i]);
                  issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
                  issue_by_list[0].issuing_license = true;
                  this.setState({
                    issue_by_list: issue_by_list,
                    balance_last_stock:
                      issue_by_list[0]?.last_updata_stock_layout_qty,
                    show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
                    type_withdraw: issue_by_list[0]?.product_issue_type,
                    check_status_new_list: false,
                    sw_loop: false,
                  });
                  if (i === free_slots.length - 1 && new_issue_qty > 0) {
                    for (let i = 0; i < full_slots.length; i++) {
                      if (new_issue_qty > 0) {
                        new_issue_qty =
                          new_issue_qty - full_slots[i].stock_layout_qty;
                        issue_by_list[0].index_stock_layout_issue.push(
                          full_slots[i]
                        );
                        issue_by_list[0].last_updata_stock_layout_qty =
                          new_issue_qty;
                        issue_by_list[0].issuing_license = true;
                        this.setState({
                          issue_by_list: issue_by_list,
                          balance_last_stock:
                            issue_by_list[0]?.last_updata_stock_layout_qty,
                          show_detail:
                            issue_by_list[0]?.index_stock_layout_issue[0],
                          type_withdraw: issue_by_list[0]?.product_issue_type,
                          check_status_new_list: false,
                          sw_loop: false,
                        });
                      }
                    }
                  }
                }
              }
            } else {
              if (full_slots.length > 0) {
                for (let i = 0; i < full_slots.length; i++) {
                  if (new_issue_qty > 0) {
                    new_issue_qty =
                      new_issue_qty - full_slots[i].stock_layout_qty;
                    issue_by_list[0].index_stock_layout_issue.push(
                      full_slots[i]
                    );
                    issue_by_list[0].last_updata_stock_layout_qty =
                      new_issue_qty;
                    issue_by_list[0].issuing_license = true;
                    this.setState({
                      issue_by_list: issue_by_list,
                      balance_last_stock:
                        issue_by_list[0]?.last_updata_stock_layout_qty,
                      show_detail:
                        issue_by_list[0]?.index_stock_layout_issue[0],
                      type_withdraw: issue_by_list[0]?.product_issue_type,
                      check_status_new_list: false,
                      sw_loop: false,
                    });
                  }
                }
              }
            }
          }
        }
      }
    } else if (not_full_slots.length === 0 && free_slots.length > 0) {
      let new_issue_qty = Issue_qty_piecemeal;
      if (free_slots.length > 0) {
        for (let i = 0; i < free_slots.length; i++) {
          if (new_issue_qty > 0) {
            new_issue_qty = new_issue_qty - free_slots[i].stock_layout_qty;
            issue_by_list[0].index_stock_layout_issue.push(free_slots[i]);
            issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
            issue_by_list[0].issuing_license = true;
            this.setState({
              issue_by_list: issue_by_list,
              balance_last_stock:
                issue_by_list[0]?.last_updata_stock_layout_qty,
              show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
              type_withdraw: issue_by_list[0]?.product_issue_type,
              check_status_new_list: false,
              sw_loop: false,
            });
            if (i === free_slots.length - 1 && new_issue_qty > 0) {
              for (let i = 0; i < full_slots.length; i++) {
                if (new_issue_qty > 0) {
                  new_issue_qty =
                    new_issue_qty - full_slots[i].stock_layout_qty;
                  issue_by_list[0].index_stock_layout_issue.push(full_slots[i]);
                  issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
                  issue_by_list[0].issuing_license = true;
                  this.setState({
                    issue_by_list: issue_by_list,
                    balance_last_stock:
                      issue_by_list[0]?.last_updata_stock_layout_qty,
                    show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
                    type_withdraw: issue_by_list[0]?.product_issue_type,
                    check_status_new_list: false,
                    sw_loop: false,
                  });
                }
              }
            }
          }
        }
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length > 0
    ) {
      let new_issue_qty = Issue_qty_piecemeal;
      if (full_slots.length > 0) {
        for (let i = 0; i < full_slots.length; i++) {
          if (new_issue_qty > 0) {
            new_issue_qty = new_issue_qty - full_slots[i].stock_layout_qty;
            issue_by_list[0].index_stock_layout_issue.push(full_slots[i]);
            issue_by_list[0].last_updata_stock_layout_qty = new_issue_qty;
            issue_by_list[0].issuing_license = true;
            this.setState({
              issue_by_list: issue_by_list,
              balance_last_stock:
                issue_by_list[0]?.last_updata_stock_layout_qty,
              show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
              type_withdraw: issue_by_list[0]?.product_issue_type,
              check_status_new_list: false,
              sw_loop: false,
            });
          }
        }
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length === 0
    ) {
      Swal.fire({
        title: "เกิดข้อผิดพลาดในการหาตำแหน่งช่อง !",
        icon: "warning",
      });
      issue_by_list[0].issuing_license = true;
      issue_by_list[0].Issue_qty = "เกิดข้อผิดพลาด";
      this.setState({
        issue_by_list: issue_by_list,
        loading: false,
      });

      this.props._onsave_success_history({
        index: this.state.runing_list,
        TypeComp: issue_by_list[0].TypeComp,
        product_code: issue_by_list[0].product_code,
        product_name: issue_by_list[0].product_name,
        product_image: issue_by_list[0].product_image,
        class: "-",
        compartment: "-",
        balance_qty: "-",
        stock_qty: 0,
        sum_stock: 0,
        user_firstname: this.state.user_firstname,
        user_lastname: this.state.user_lastname,
        count_withdraw: "เกิดข้อผิดพลาด",
      });
    }

    this._list_in_list_issue();
  };

  _setindexComp_type_full_new = (index_stock_layout, fullslot) => {
    let not_full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty < fullslot && val.stock_use !== 1;
    });
    let full_slots = index_stock_layout.filter((val) => {
      return val.stock_layout_qty === fullslot && val.stock_use !== 1;
    });
    let free_slots = index_stock_layout.filter((val) => {
      return val.stock_use === 1;
    });
    let issue_by_list = this.state.issue_by_list;

    if (not_full_slots.length !== 0) {
      if (issue_by_list[0].index_stock_layout_issue.length === 0) {
        let Issue_qty = not_full_slots[0].stock_layout_qty;
        issue_by_list[0].Issue_qty = Issue_qty;
        issue_by_list[0].index_stock_layout_issue.push(not_full_slots[0]);
        issue_by_list[0].issuing_license = true;

        this.setState(
          {
            issue_by_list: issue_by_list,
            balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
            show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
            type_withdraw: issue_by_list[0]?.product_issue_type,
            check_status_new_list: false,
            sw_loop: false,
          },
          () => this._list_in_list_issue()
        );
      }
    } else if (not_full_slots.length === 0 && free_slots.length !== 0) {
      if (issue_by_list[0].index_stock_layout_issue.length === 0) {
        let Issue_qty = free_slots[0].stock_layout_qty;
        issue_by_list[0].Issue_qty = Issue_qty;
        issue_by_list[0].index_stock_layout_issue.push(free_slots[0]);
        issue_by_list[0].issuing_license = true;

        this.setState(
          {
            issue_by_list: issue_by_list,
            balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
            show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
            type_withdraw: issue_by_list[0]?.product_issue_type,
            check_status_new_list: false,
            sw_loop: false,
          },
          () => this._list_in_list_issue()
        );
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length !== 0
    ) {
      if (issue_by_list[0].index_stock_layout_issue.length === 0) {
        let Issue_qty = full_slots[0].stock_layout_qty;
        issue_by_list[0].Issue_qty = Issue_qty;
        issue_by_list[0].index_stock_layout_issue.push(full_slots[0]);
        issue_by_list[0].issuing_license = true;

        this.setState(
          {
            issue_by_list: issue_by_list,
            balance_last_stock: issue_by_list[0]?.last_updata_stock_layout_qty,
            show_detail: issue_by_list[0]?.index_stock_layout_issue[0],
            type_withdraw: issue_by_list[0]?.product_issue_type,
            check_status_new_list: false,
            sw_loop: false,
          },
          () => this._list_in_list_issue()
        );
      }
    } else if (
      not_full_slots.length === 0 &&
      free_slots.length === 0 &&
      full_slots.length === 0
    ) {
      Swal.fire({
        title: "เกิดข้อผิดพลาดในการหาตำแหน่งช่อง !",
        icon: "warning",
      });
      issue_by_list[0].issuing_license = true;
      issue_by_list[0].Issue_qty = "เกิดข้อผิดพลาด";
      this.setState({
        issue_by_list: issue_by_list,
        loading: false,
      });

      this.props._onsave_success_history({
        index: this.state.runing_list,
        TypeComp: issue_by_list[0].TypeComp,
        product_code: issue_by_list[0].product_code,
        product_name: issue_by_list[0].product_name,
        product_image: issue_by_list[0].product_image,
        class: "-",
        compartment: "-",
        balance_qty: "-",
        stock_qty: 0,
        sum_stock: 0,
        user_firstname: this.state.user_firstname,
        user_lastname: this.state.user_lastname,
        count_withdraw: "เกิดข้อผิดพลาด",
      });
    }
  };

  _showdisplay = () => {
    let {
      issue_by_list,
      user_lastname,
      user_firstname,
      balance_last_stock,
      current_display,
      show_detail,
      type_withdraw,
    } = this.state;
    let { value_balance, value_withdraw } = "";
    balance_last_stock = Math.abs(balance_last_stock);

    if (type_withdraw === "Setpiece") {
      if (issue_by_list[0].index_stock_layout_issue.length > 1) {
        value_withdraw = show_detail?.stock_layout_qty;
        value_balance =
          show_detail?.stock_layout_qty - show_detail?.stock_layout_qty;
      } else if (issue_by_list[0].index_stock_layout_issue.length === 1) {
        value_withdraw = show_detail?.stock_layout_qty - balance_last_stock;
        value_balance = balance_last_stock;
      }
    } else if (type_withdraw === "Piecemeal") {
      if (issue_by_list[0].index_stock_layout_issue.length > 1) {
        value_withdraw = show_detail?.stock_layout_qty;
        value_balance =
          show_detail?.stock_layout_qty - show_detail?.stock_layout_qty;
      } else if (issue_by_list[0].index_stock_layout_issue.length === 1) {
        value_withdraw = show_detail?.stock_layout_qty - balance_last_stock;
        value_balance = balance_last_stock;
      }
    } else if (type_withdraw === "Full") {
      value_balance =
        show_detail?.stock_layout_qty - show_detail?.stock_layout_qty;
      value_withdraw = show_detail?.stock_layout_qty;
    }

    if (current_display === "waiting_machine") {
      return (
        <>
          <ModalBody style={{ height: "60vh", textAlign: "center" }}>
            <div
              class="lds-spinner"
              style={{ textAlign: "center", paddingTop: "20vh" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>{" "}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>กรุณารอสักครู่</h3>
          </ModalBody>
        </>
      );
    } else if (current_display === "confirm_balance_qty") {
      return (
        <>
          <ModalBody style={{ height: "49vh" }}>
            <Row>
              <Col>
                <center>
                  {" "}
                  <h3>
                    ชั้นที่ {parseInt(show_detail?.stock_y)} ช่องที่{" "}
                    {parseInt(show_detail?.stock_x)}{" "}
                  </h3>
                  <br></br>
                  <i
                    className="fas fa-exclamation-triangle fa-10x"
                    style={{ color: "#FFD700" }}
                  ></i>
                  <br></br>
                  <br></br>
                  <h3>
                    เบิก {value_withdraw} ในช่องเหลือ {value_balance} ใช่ไหม
                  </h3>
                  <br></br>
                  <h3>
                    ชื่อผู้เบิก {user_firstname} {user_lastname}
                  </h3>
                </center>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                backgroundColor: "#4CB56F",
                fontSize: "18px",
              }}
              onClick={() =>
                this._onsave_balance_qty_normal_case(
                  value_balance,
                  value_balance,
                  value_withdraw
                )
              }
            >
              {" "}
              <i className="far fa-check-circle"></i>
              {"\u00A0"}
              ใช่
            </Button>

            <Button
              color="info"
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                backgroundColor: "#F1A71F",
                fontSize: "18px",
              }}
              onClick={() => {
                this.setState(
                  {
                    // current_display: "re-balance-confirm-qty",
                    // keyword: value_withdraw,
                    current_display: "re-stock-qty",
                    keyword: value_balance,
                  }

                  // () =>
                  //   Swal.fire({ title: "กรุณาจำนวนการเบิก ", icon: "warning" })
                );
              }}
            >
              <i className="fas fa-exclamation"></i>
              ไม่ใช่
            </Button>
          </ModalFooter>{" "}
        </>
      );
    }

    // else if (current_display === "re-balance-confirm-qty") {
    //   //ยืนยันจำนวนเช้าออก stock_qty

    //   return (
    //     <>
    //       <CardBody>
    //         <h3 style={{ textAlign: "center" }}>
    //           จำนวนการเบิก คือ{" "}
    //           {this.state.keyword === "" ? (
    //             <>{"?"}</>
    //           ) : (
    //             <>{this.state.keyword}</>
    //           )}
    //         </h3>
    //         <Row>
    //           <Col></Col>
    //           <Col>
    //             {" "}
    //             <Input
    //               style={{ textAlign: "center" }}
    //               type="number"
    //               value={this.state.keyword}
    //               onChange={(e) => this.setState({ keyword: e.target.value })}
    //             />{" "}
    //             <br></br>
    //             <Keyboard
    //               layout={{
    //                 default: ["1 2 3", "4 5 6", "7 8 9", " 0 backspace"],
    //               }}
    //               onKeyPress={this._onKeyPress}
    //             />
    //           </Col>
    //           <Col></Col>
    //         </Row>
    //       </CardBody>
    //       <ModalFooter>
    //         <Button
    //           color="info"
    //           style={{
    //             width: "180px",
    //             height: "80px",
    //             marginLeft: "50px",
    //             backgroundColor: "#F1A71F",
    //             fontSize: "18px",
    //           }}
    //           onClick={
    //             this.state.keyword === "" || this.state.keyword > value_withdraw || this.state.keyword < 0
    //               ? () =>
    //                 Swal.fire({
    //                   title: "กรุณาตรวจสอบความถูกต้อง !",
    //                   icon: "warning",
    //                 })
    //               : () =>
    //                 this._onsave_balance_qty_wrong_case(
    //                   value_balance,
    //                   null,
    //                   this.state.keyword
    //                 )
    //           }
    //         >
    //           <i className="fas fa-exclamation"></i>
    //           บันทึกข้อผิดพลาด
    //         </Button>
    //         <Button
    //           className="btn btn-danger"
    //           style={{
    //             width: "180px",
    //             height: "80px",
    //             marginLeft: "50px",
    //             backgroundColor: "#EE6E73",
    //             fontSize: "18px",
    //           }}
    //           onClick={() =>
    //             this.setState({
    //               current_display: "confirm_balance_qty",
    //             })
    //           }
    //         >
    //           <i className="far fa-times-circle"></i> {"\u00A0"}
    //           ยกเลิก
    //         </Button>
    //       </ModalFooter>
    //     </>
    //   );
    // }
    else if (current_display === "re-stock-qty") {
      //ยืนยันจำนวนคงเหลือ balance
      let stock_qty = this.state.stock_qty;

      let count_full_slot;
      let { issue_by_list } = this.state;
      if (issue_by_list[0].product_issue_type == "Full") {
        count_full_slot =
          issue_by_list[0].product_package_qty *
          issue_by_list[0].product_refill_unit;
      } else if (issue_by_list[0].product_issue_type == "Setpiece") {
        count_full_slot =
          issue_by_list[0].product_package_qty *
          issue_by_list[0].product_refill_unit;
      } else if (issue_by_list[0].product_issue_type == "Piecemeal") {
        count_full_slot =
          issue_by_list[0].product_package_qty *
          issue_by_list[0].product_refill_unit;
      }

      return (
        <>
          <CardBody>
            <h3 style={{ textAlign: "center" }}>
              {/* เบิก {this.state.stock_qty}  */}
              ข้างในช่องเหลือ{" "}
              {this.state.keyword === "" ? (
                <>{"?"}</>
              ) : (
                <>{this.state.keyword}</>
              )}{" "}
              {/* จริงไหม{" "} */}
            </h3>
            <Row>
              <Col></Col>
              <Col>
                {" "}
                <Input
                  style={{ textAlign: "center" }}
                  type="number"
                  value={this.state.keyword}
                  onChange={(e) => this.setState({ keyword: e.target.value })}
                />{" "}
                <br></br>
                <Keyboard
                  layout={{
                    default: ["1 2 3", "4 5 6", "7 8 9", " 0 backspace"],
                  }}
                  onKeyPress={this._onKeyPress}
                />
              </Col>
              <Col></Col>
            </Row>
          </CardBody>

          <ModalFooter>
            <Button
              color="info"
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                backgroundColor: "#F1A71F",
                fontSize: "18px",
              }}
              onClick={
                this.state.keyword === "" ||
                  this.state.keyword > count_full_slot ||
                  this.state.keyword < 0
                  ? () =>
                    Swal.fire({
                      title: "กรุณาตรวจสอบความถูกต้อง !",
                      icon: "warning",
                    })
                  : () =>
                    this._onsave_balance_qty_wrong_case(
                      null,
                      this.state.keyword,
                      null
                    )
              }
            >
              <i className="fas fa-exclamation"></i>
              บันทึกข้อผิดพลาด
            </Button>
            <Button
              className="btn btn-danger"
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                backgroundColor: "#EE6E73",
                fontSize: "18px",
              }}
              onClick={() =>
                this.setState({
                  // current_display: "re-balance-confirm-qty",
                  current_display: "confirm_balance_qty",
                  keyword: stock_qty,
                })
              }
            >
              <i className="far fa-times-circle"></i> {"\u00A0"}
              ยกเลิก
            </Button>
          </ModalFooter>
        </>
      );
    } else if (current_display === "conclusion_withdraw") {
      return (
        <>
          <ModalBody style={{ height: "60vh" }}>
            <ModalFooter>
              <Button
                className="btn btn-warning"
                style={{ width: "120px", height: "80px" }}
                onClick={() =>
                  this.setState(
                    {
                      confirm_conclusion_withdraw: true,
                    },
                    () => this._list_in_list_issue()
                  )
                }
              >
                สิ้นสุด
              </Button>
            </ModalFooter>
          </ModalBody>
        </>
      );
    }
  };
  render() {
    let issue_by_list = this.state.issue_by_list;

    return (
      <>
        <ModalHeader style={{ display: "block" }} className="haedermodel">
          <h1
            className="header"
            style={{ textAlign: "center", color: "white" }}
          >
            กำลังดำเนินการ {this.state.runing_list} /{" "}
            {this.state.no_change_value_length_list}
          </h1>
        </ModalHeader>

        <CardHeader>
          <Row>
            <Col md={4}>
              <Row>
                <CardImg
                  variant="top"
                  style={{ width: "150px", height: "150px", margin: "auto" }}
                  src={
                    issue_by_list[0] && issue_by_list[0].product_image
                      ? `${GLOBAL.BASE_SERVER.URL_IMG}${issue_by_list[0].product_image}`
                      : `${GLOBAL.BASE_SERVER.URL_IMG}${"default.png"}`
                  }
                />
              </Row>
            </Col>

            <Col md={4}>
              <CardTitle>
                <h3>
                  <b>ชื่อสินค้า: </b>{" "}
                  {(issue_by_list[0] && issue_by_list[0].product_name) || null}
                </h3>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>รหัสสินค้า: </b>{" "}
                  {(issue_by_list[0] && issue_by_list[0].product_code) || null}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>ประเภทสินค้า: </b>{" "}
                  {(issue_by_list[0] && issue_by_list[0].product_type_name) ||
                    null}{" "}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>กลุ่มสินค้า: </b>
                  {(issue_by_list[0] && issue_by_list[0].product_group_name) ||
                    null}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>ยี่ห้อสินค้า: </b>
                  {(issue_by_list[0] && issue_by_list[0].product_brand_name) ||
                    null}
                </h6>
              </CardTitle>
            </Col>

            <Col md={4}>
              <CardTitle>
                <h3>
                  <br></br>
                </h3>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>ขนาดช่อง: </b>
                  {(issue_by_list[0] && issue_by_list[0].product_size) ||
                    null}{" "}
                  <b>{"มม."}</b>
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>หน่วยต่อจำนวน: </b>
                  {(issue_by_list[0] && issue_by_list[0].product_package_qty) ||
                    null}{" "}
                  {"ชิ้น"}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>หน่วยต่อการเบิก: </b>{" "}
                  {(issue_by_list[0] &&
                    issue_by_list[0].name_thai.product_unit_thai) ||
                    null}{" "}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>ประเภทการเบิก: </b>{" "}
                  {(issue_by_list[0] &&
                    issue_by_list[0].name_thai.product_issue_type_thai) ||
                    null}
                </h6>
              </CardTitle>
              <CardTitle>
                <h6>
                  <b>จำนวนสินค้าต่อช่อง: </b>{" "}
                  {(issue_by_list[0] && issue_by_list[0].product_refill_unit) ||
                    null}{" "}
                  {(issue_by_list[0] &&
                    issue_by_list[0].name_thai.product_unit_thai) ||
                    null}
                </h6>
              </CardTitle>
            </Col>
          </Row>
        </CardHeader>
        {this._showdisplay()}
      </>
    );
  }
}
export default Baket_issue;
