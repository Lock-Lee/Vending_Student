import React, { Component } from "react";
import { Modal } from "reactstrap";

import Baket_list from "./modalbasket/srceen_basket_page_list";
import Baket_issue from "./modalbasket/srceen_basket_page_issue";
import Basket_report from "./modalbasket/srceen_basket_report_withdraw";

export class SrceenBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list_in_basket: [],
      product_refill_unit: "",
      current_display: "",
      machine_running: false,
      success_history: [],
      type_withdraw: "",
      list_in_withdraw_now: [],
      choice_list: false,
    };
  }
  async componentDidMount() {
    console.log("2");
    this._filter_type_withdraw();

    let { list_in_basket, list_in_withdraw_now } = this.props;
    this.setState(
      {
        list_in_basket: list_in_basket,
        list_in_withdraw_now: list_in_withdraw_now,
      }
      // () => console.log("list_in_basket : ", this.state.list_in_basket, "+ list_in_withdraw_now : ", this.state.list_in_withdraw_now)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type_withdraw !== this.props.type_withdraw) {
      this._filter_type_withdraw();
    }
  }

  _filter_type_withdraw() {
    let { type_withdraw } = this.props;

    if (type_withdraw == "withdraw-now") {
      this.setState({
        choice_list: false,
        current_display: "Baket_issue",
      });
    } else if (type_withdraw == "add-in-basket") {
      this.setState({
        choice_list: true,
      });
    }
  }

  _handleClose = () => {
    this._resetdata();
    this.props.onClose();
  };

  _resetdata = () => {
    this.setState({
      product_refill_unit: "",
      current_display: "",
      success_history: [],
      choice_list: false,
    });
  };
  _deleteRowInBasket = (idx) => {
    this.setState((state) => {
      state.list_in_basket.splice(idx, 1);
      return {
        list_in_basket: state.list_in_basket,
      };
    });
  };

  _work_withdraw_order = () => {
    this.setState({
      current_display: "Baket_issue",
    });
  };

  _success_withdraw = () => {
    this.setState({
      current_display: "Basket_report",
    });
  };
  _onsave_success_history = (his_succ) => {
    let success_history = this.state.success_history;
    success_history.push(his_succ);
    this.setState(
      {
        success_history: success_history,
      },
      () => {}
    );
  };

  _showdisplay = () => {
    let current_display = this.state.current_display;
    if (current_display === "") {
      return (
        <>
          <Baket_list
            list_in_basket={this.state.list_in_basket}
            _handleClose={this._handleClose}
            _deleteRowInBasket={this._deleteRowInBasket}
            _work_withdraw_order={this._work_withdraw_order}
          />
        </>
      );
    } else if (current_display === "Baket_issue") {
      return (
        <>
          <Baket_issue
            list_in_basket={
              !this.state.choice_list
                ? this.state.list_in_withdraw_now
                : this.state.list_in_basket
            }
            // list_in_basket={this.state.list_in_basket}
            _success_withdraw={this._success_withdraw}
            _onsave_success_history={this._onsave_success_history}
            _handleClose={this._handleClose}
          />
        </>
      );
    } else if (current_display === "Basket_report") {
      return (
        <>
          <Basket_report
            list_in_basket={
              !this.state.choice_list
                ? this.state.list_in_withdraw_now
                : this.state.list_in_basket
            }
            // list_in_basket={this.state.list_in_basket}
            success_history={this.state.success_history}
            _handleClose={this._handleClose}
          />
        </>
      );
    }
  };

  render() {
    return (
      <Modal
        size="xl"
        centered
        isOpen={this.props.show}
        // toggle={this._handleClose}
        style={{ height: "80vh" }}
      >
        {this._showdisplay()}
      </Modal>
    );
  }
}
export default SrceenBasket;
