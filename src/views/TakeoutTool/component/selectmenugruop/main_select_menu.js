import React, { Component } from "react";
import Show_product_in_menu from "./show_product_in_menu";
import Menu_product_level2 from "./menu_product_level2";
import Menu_product_level3 from "./menu_product_level3";
import Menu_product_level4 from "./menu_product_level4";

import { Loading } from "../../../../component/revel-strap";

import ProductMenuModel from "../../../../models/ProductMenuModel";
import ProductMenuListModel from "../../../../models/ProductMenuListModel";

const productmenu_model = new ProductMenuModel();
const productmenuList_model = new ProductMenuListModel();

export class Main_select_menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      current_display: "",
      user_code: "",
      user_firstname: "",
      user_lastname: "",
      childent_menu_1: [],
      childent_menu_2: [],
      childent_menu_3: [],
      childent_menu_4: [],
      menu_name_select_munu2: "",
      menu_name_select_munu3: "",
      menu_name_select_munu4: "",
      pre_page: "",
      product_code_menu_name: "",
    };
  }

  componentDidUpdate(props) {
    // console.log(this.props);
    if (this.props.status_manchine !== this.state.status_manchine) {
      this.setState({
        status_manchine: this.props.status_manchine,
      });
    }
  }

  async componentDidMount() {
    this._fetchData();
  }
  async _fetchData() {
    const { user_code, user_firstname, user_lastname, menu_name_select } =
      this.props;
    const childent_menu_1 = await productmenu_model.getProductMenuBy({
      product_menu_name_ref: menu_name_select,
    });

    this.setState(
      {
        user_code: user_code,
        user_firstname: user_firstname,
        user_lastname: user_lastname,
        childent_menu_1: childent_menu_1.data,
        menu_name_select: menu_name_select,
      },
      () => this._get_childent_menu1()
    );
  }

  _get_childent_menu1() {
    const { childent_menu_1 } = this.state;
    if (childent_menu_1.length > 0) {
      this.setState({
        current_display: "Menu_product_level2",
      });
    } else {
      this.setState({
        loading: true,
      });

      const { menu_name_select } = this.props;

      this.setState({
        loading: false,
        current_display: "show_product",
        pre_page: "page_1",
        product_code_menu_name: menu_name_select,
      });
    }
  }

  _on_select_menu_2 = async (menu_name) => {
    const childent_menu_3 = await productmenu_model.getProductMenuBy({
      product_menu_name_ref: menu_name,
    });

    this.setState({
      childent_menu_3: childent_menu_3.data,
      menu_name_select_munu2: menu_name,
    });

    if (childent_menu_3.data.length > 0) {
      this.setState({
        current_display: "Menu_product_level3",
      });
    } else {
      this.setState({
        loading: true,
      });

      this.setState({
        loading: false,
        current_display: "show_product",
        pre_page: "page_2",
        product_code_menu_name: menu_name,
      });
    }
  };

  _on_select_menu_3 = async (menu_name) => {
    const childent_menu_4 = await productmenu_model.getProductMenuBy({
      product_menu_name_ref: menu_name,
    });

    this.setState({
      childent_menu_4: childent_menu_4.data,
      menu_name_select_munu3: menu_name,
    });

    if (childent_menu_4.data.length > 0) {
      this.setState({
        current_display: "Menu_product_level4",
      });
    } else {
      this.setState({
        loading: true,
      });

      this.setState({
        loading: false,
        current_display: "show_product",
        pre_page: "page_3",
        product_code_menu_name: menu_name,
      });
    }
  };

  _on_select_menu_4 = async (menu_name) => {
    this.setState({
      loading: true,
    });

    this.setState({
      loading: false,
      current_display: "show_product",
      pre_page: "page_4",
      product_code_menu_name: menu_name,
    });
  };

  _displayback = (e) => {
    if (e.title === "Menu_product_level2") {
      this.props._displayback({
        current_display: "",
      });
    } else if (e.title === "Menu_product_level3") {
      this.setState({
        current_display: "Menu_product_level2",
      });
    } else if (e.title === "Menu_product_level4") {
      this.setState({
        current_display: "Menu_product_level3",
      });
    } else if (e.title === "product_in_menu4") {
      this.setState({
        current_display: "Menu_product_level4",
      });
    }
  };

  _showDisplay() {
    const { current_display } = this.state;
    if (current_display === "show_product") {
      return (
        <Show_product_in_menu
          status_manchine={this.state.status_manchine}
          user_code={this.props.user_code}
          user_firstname={this.props.user_firstname}
          user_lastname={this.props.user_lastname}
          pre_page={this.state.pre_page}
          product_code_menu_name={this.state.product_code_menu_name}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "Menu_product_level2") {
      return (
        <Menu_product_level2
          menu_name_select={this.state.menu_name_select}
          childent_menu_2={this.state.childent_menu_2}
          _on_select_menu_2={this._on_select_menu_2}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "Menu_product_level3") {
      return (
        <Menu_product_level3
          childent_menu_3={this.state.childent_menu_3}
          menu_name_select_munu2={this.state.menu_name_select_munu2}
          _on_select_menu_3={this._on_select_menu_3}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "Menu_product_level4") {
      return (
        <Menu_product_level4
          childent_menu_4={this.state.childent_menu_4}
          menu_name_select_munu3={this.state.menu_name_select_munu3}
          _on_select_menu_4={this._on_select_menu_4}
          _displayback={this._displayback}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        {this._showDisplay()}
      </div>
    );
  }
}
export default Main_select_menu;
