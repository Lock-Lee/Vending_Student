import React from "react";
import { Modal } from "reactstrap";
import Swal from "sweetalert2";
import Select_compart_type from "../modal/select-compart-type";
import Assign_product_qty from "../modal/assign-product-qty";
import Select_job_level1 from "../modal/select_job_level1"
import Select_job_level2 from "../modal/select_job_level2"
import Select_job_level3 from "../modal/select_job_level3"
import Select_job_level4 from "../modal/select_job_level4"
import Select_choice_withdraw from "../modal/select_choice_withdraw"
import StocklayoutModel from "../../../../../models/StockLayoutModel";
import ReportModel from "../../../../../models/ReportModel";
import JobLevel1Model from "../../../../../models/JobLevel1Model";
import JobLevel2Model from "../../../../../models/JobLevel2Model";
import JobLevel3Model from "../../../../../models/JobLevel3Model";
import JobLevel4Model from "../../../../../models/JobLevel4Model";
import { Loading } from "../../../../../component/revel-strap";

const stocklay_model = new StocklayoutModel();
const report_model = new ReportModel();
const joblevel1_model = new JobLevel1Model();
const joblevel2_model = new JobLevel2Model();
const joblevel3_model = new JobLevel3Model();
const joblevel4_model = new JobLevel4Model();
class Issue_select_option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_display: "",
      loading: true,
      product_select: [],
      product_brand: [],
      product_type: [],
      product_group: [],
      product_brand_name: "",
      product_group_name: "",
      product_type_name: "",
      product_code: "",
      product_name: "",
      TypeIssue: "",
      TypeComp: "",
      size_modal: "xl",
      Issue_qty: "",
      status_add_in_basket: false,
      list_in_basket: [],
      count_slot: [],
      stock_job_name: "",
      user_code: "",
      date_start: "",
      date_end: "",
      count_issue: [{ New: 0, RF: 0, Loan: 0, Old: 0 }],
      type_slot: [],
      sum_of_products: [],
      name_thai: [],
      job_level1: [],
      job_level2: [],
      job_level3: [],
      job_level4: [],
      status_show_withdraw: false,
      job_level_1_name: '',
      job_level_2_name: '',
      job_level_3_name: '',
      job_level_4_name: '',
      pre_page: '',
    };
  }
  componentDidMount() { }
  componentDidUpdate(props_old) {
    let status_add_in_basket = this.state.status_add_in_basket;

    if (props_old.show === false && this.props.show) {
      this._fetchData();
      this._filterNameByCode();
      this._flow_value_count_product();
      this.setState({
        count_issue: this.props.count_issue,
      });
    }

    let list_in_basket = this.props.list_in_basket;
    if (status_add_in_basket === true) {
      this._fetchData();
      this.setState({
        status_add_in_basket: false,
        list_in_basket: list_in_basket,
        user_code: this.props.user_code,
        count_issue: this.props.count_issue,
      });
    }
  }

  _fetchData = async () => {

    this._filter_product_type_consumable()

    let product_code = this.props.product_select.product_code;
    let product_name = this.props.product_select.product_name;

    let product_select = this.props.product_select;
    let { count_issue, date_start, date_end, type_slot } = this.state;
    if (this.props.count_issue.length === 0) {
      count_issue = [{ New: 0, RF: 0, Loan: 0, Old: 0 }];
    } else {
      count_issue = this.props.count_issue;
    }


    this.setState({
      count_issue: count_issue,
    });

    if (date_start !== "" && date_end !== "") {
      const sum_of_products = await report_model.getIssueReport({
        user_code: this.state.user_code,
        product_code: this.props.product_select.product_code,
        date_start: date_start,
        date_end: date_end,
      });

      this.setState({
        sum_of_products: sum_of_products,
      });
    }

    this.setState({
      loading: false,
      count_issue: count_issue,
      product_select: product_select,
      product_code: product_code,
      product_name: product_name,
    });
  };

  _flow_value_count_product = async () => {
    let product_code = this.props.product_select.product_code;
    let list_in_basket = this.state.list_in_basket;
    const count_slots = await stocklay_model.getCountReserveBycode({
      product_code,
    });

    this.setState({
      count_slot: count_slots.data[0],
    });

    list_in_basket.find((list) => {
      if (list.product_code == product_code) {
        let value = 0;
        let count_slot = this.state.count_slot;
        value = parseInt(list.Issue_qty);

        if (list.TypeComp == "New") {
          count_slot.count_product_type_new -= value;
          if (count_slot.count_product_type_new < 0) {
            count_slot.count_product_type_new = 0;
          }
        } else if (list.TypeComp == "RF") {
          count_slot.count_product_type_rf -= value;
          if (count_slot.count_product_type_new < 0) {
            count_slot.count_product_type_new = 0;
          }
        } else if (list.TypeComp == "Loan") {
          count_slot.count_product_type_loan -= value;
          if (count_slot.count_product_type_new < 0) {
            count_slot.count_product_type_new = 0;
          }
        } else if (list.TypeComp == "Old") {
          count_slot.count_product_type_old -= value;
          if (count_slot.count_product_type_new < 0) {
            count_slot.count_product_type_new = 0;
          }
        }
        this.setState({
          count_slot: count_slot,
        });
      }
    });
  };

  _onSelectTypeCompartment = async (TypeComp, thai) => {
    let product_issue_type = this.props.product_select.product_issue_type;
    let name_thai = thai[0];

    if (product_issue_type === "Setpiece") {
      this.setState({
        TypeComp: TypeComp,
        current_display: "assign-product-qty",
        size_modal: "md",
        name_thai: name_thai,
      });
    }

    else if (product_issue_type === "Full" || product_issue_type === "Piecemeal") {

      this.setState({
        TypeComp: TypeComp,
        name_thai: name_thai,
      });

      this._get_job_level1()
    }
  };

  _issueQty = async (Input_Issue_qty) => {
    this.setState({
      Issue_qty: Input_Issue_qty
    })

    this._get_job_level1()
  };

  _onSelectProcress = (job_op_tools_code, job_op_tools_name, thai, skip_Issue_qty) => {
    let name_thai = [];
    name_thai["product_unit_thai"] = thai.product_unit_thai;
    name_thai["product_issue_type_thai"] = thai.product_issue_type_thai;
    let { count_issue } = this.state;

    let {
      TypeComp,
      Issue_qty,
      product_brand_name,
      product_group_name,
      product_type_name,
    } = this.state;

    let {
      product_code,
      product_name,
      product_issue_type,
      product_refill_unit,
      product_issue_unit,
      product_unit,
      product_image,
      product_amount,
      product_package_qty,
      product_price,
      product_size,
    } = this.props.product_select;
    let index_stock_layout_issue = [];
    let last_updata_stock_layout_qty = 0;
    let issuing_license = false;

    this.setState({
      job_op_tools_code: job_op_tools_code,
      job_op_tools_name: job_op_tools_name,
    });

    if (product_issue_type == "Piecemeal") {
      Issue_qty = product_issue_unit * product_package_qty;
    }
    else if (product_issue_type == "Full") {
      Issue_qty = product_package_qty * product_refill_unit;
    }
    else if (product_issue_type == "Setpiece") {
      if (skip_Issue_qty == null) {
        Issue_qty = this.state.Issue_qty
      }
      else {
        Issue_qty = skip_Issue_qty
      }
    }

    this.props.onSave(
      {
        TypeComp,
        Issue_qty,
        job_op_tools_code,
        job_op_tools_name,
        product_code,
        product_name,
        product_issue_type,
        product_refill_unit,
        product_unit,
        product_image,
        product_amount,
        product_price,
        product_issue_unit,
        product_package_qty,
        product_size,
        index_stock_layout_issue,
        last_updata_stock_layout_qty,
        product_brand_name,
        product_group_name,
        product_type_name,
        name_thai,
        issuing_license,
        count_issue,
      },
      this._resetdata()
    );
    Swal.fire({ title: "เพิ่มรายการสำเร็จ !", icon: "success", timer: 1000 });
  };

  _resetdata() {
    this.setState({
      current_display: "",
      product_select: [],
      product_brand: [],
      product_type: [],
      product_group: [],
      product_brand_name: "",
      product_group_name: "",
      product_type_name: "",
      product_code: "",
      TypeIssue: "",
      TypeComp: "",
      size_modal: "xl",
      Issue_qty: "",
      status_add_in_basket: true,
      job_level_1_name: '',
      job_level_2_name: '',
      job_level_3_name: '',
      job_level_4_name: '',
      pre_page: '',
    });
  }

  _displayback = (e) => {
    const product_type_consumable = this.props.product_select.product_type_consumable
    const product_issue_type = this.props.product_select.product_issue_type;

    if (product_type_consumable == "Loan") {

      if (e.event_page_current == "select_job_level1") {
        this._handleClose()
      }

      else if (e.event_page_current == "select_job_level2") {

        this.setState({
          current_display: "select-job-level1",
        })
      }

      else if (e.event_page_current == "select_job_level3") {

        this.setState({
          current_display: "select-job-level2",
        })
      }

      else if (e.event_page_current == "select_job_level4") {

        this.setState({
          current_display: "select-job-level3",
        })
      }

      else if (e.event_page_current == "select_job_last") {
        this.setState({
          current_display: "select-job-level4",
        })
      }
    }

    else if (product_type_consumable == "Consumable") {

      if (product_issue_type === "Full" || product_issue_type === "Piecemeal") {

        if (e.event_page_current == "select_job_level1") {
          this.setState({
            current_display: "",

          })
        }
        else if (e.event_page_current == "select_job_level2") {

          this.setState({
            current_display: "select-job-level1",
          })
        }

        else if (e.event_page_current == "select_job_level3") {

          this.setState({
            current_display: "select-job-level2",
          })
        }

        else if (e.event_page_current == "select_job_level4") {

          this.setState({
            current_display: "select-job-level3",
          })
        }

        else if (e.event_page_current == "select_job_last") {
          this.setState({
            current_display: "select-job-level4",
          })
        }
      }

      else if (product_issue_type == "Setpiece") {

        if (e.event_page_current == "event_page_assign_product") {
          this.setState({
            current_display: "",
            size_modal: "xl",
          })
        }

        if (e.event_page_current == "select_job_level1") {
          this.setState({
            current_display: "assign-product-qty",
            size_modal: "md",
          })
        }
        else if (e.event_page_current == "select_job_level2") {

          this.setState({
            current_display: "select-job-level1",
          })
        }

        else if (e.event_page_current == "select_job_level3") {

          this.setState({
            current_display: "select-job-level2",
          })
        }

        else if (e.event_page_current == "select_job_level4") {

          this.setState({
            current_display: "select-job-level3",
          })
        }

        else if (e.event_page_current == "select_job_last") {
          this.setState({
            current_display: "select-job-level4",
          })
        }
      }
    }

  };

  _handleClose = () => {
    this._resetdata();
    this.props.onClose();
  };

  _filterNameByCode = () => {
    let product_brand_code = this.props.product_select.product_brand_code;
    let product_brand = this.props.product_brand;
    let product_group_code = this.props.product_select.product_group_code;
    let product_group = this.props.product_group;
    let product_type_code = this.props.product_select.product_type_code;
    let product_type = this.props.product_type;

    const product_brands = product_brand.filter((val) => {
      return val.product_brand_code === product_brand_code;
    });
    const product_groups = product_group.filter((val) => {
      return val.product_group_code === product_group_code;
    });
    const product_types = product_type.filter((val) => {
      return val.product_type_code === product_type_code;
    });

    this.setState({
      product_brand_name: product_brands[0]?.product_brand_name,
      product_group_name: product_groups[0]?.product_group_name,
      product_type_name: product_types[0]?.product_type_name,
    });
  };

  _filter_product_type_consumable = () => {

    const { product_select } = this.props
    // console.log("product_select : ", product_select);

    const product_issue_type = this.props.product_issue_type
    const product_type_consumable = this.props.product_select.product_type_consumable

    // console.log("product_type_consumable : ", product_type_consumable);
    // console.log("product_issue_type : ", product_issue_type);

    if (product_type_consumable == "Consumable") {
      this.setState({
        current_display: "",
      })
    }
    else if (product_type_consumable == "Loan") {

      this._get_job_level1()
    }

  }

  _get_job_level1 = async () => {

    this.setState({
      loading: true,
    })

    const job_level1 = await joblevel1_model.getJobLevel1By();

    this.setState({
      job_level1: job_level1.data,
      loading: false,
      current_display: "select-job-level1",
      size_modal: "xl",
    })

  }

  _onSelectJobLevel1 = async (job_level_1_name, name_thai) => {

    this.setState({
      loading: true,
    })

    const job_level2 = await joblevel2_model.getJobLevel2By({
      job_level_1_name: job_level_1_name
    })

    let product_type_consumable = this.props.product_select.product_type_consumable
    // console.log("product_type_consumable", product_type_consumable);

    if (job_level2.data.length == 0 && product_type_consumable === "Consumable") {
      this.setState({
        job_level_1_name: job_level_1_name,
        job_level2: job_level2.data,
        loading: false,
        status_show_withdraw: true,
        current_display: "select_choice_withdraw",
        pre_page: "select-job-level1",
      })
    }

    else if (job_level2.data.length == 0 && product_type_consumable === "Loan") {

      this.setState({
        job_level_1_name: job_level_1_name,
      }
        , () => this._onSelect_withdraw_now()
      )

    }

    else {
      this.setState({
        job_level_1_name: job_level_1_name,
        job_level2: job_level2.data,
        loading: false,
        status_show_withdraw: false,
        current_display: "select-job-level2",
      })

    }
  }

  _onSelectJobLevel2 = async (job_level_2_name, name_thai) => {

    this.setState({
      loading: true,
    })
    const job_level3 = await joblevel3_model.getJobLevel3By({
      job_level_1_name: this.state.job_level_1_name,
      job_level_2_name: job_level_2_name
    })

    let product_type_consumable = this.props.product_select.product_type_consumable
    // console.log("product_type_consumable", product_type_consumable);

    if (job_level3.data.length == 0 && product_type_consumable === "Consumable") {
      this.setState({
        job_level_2_name: job_level_2_name,
        job_level3: job_level3.data,
        loading: false,
        status_show_withdraw: true,
        current_display: "select_choice_withdraw",
        pre_page: "select-job-level2",
      })

    }

    else if (job_level3.data.length == 0 && product_type_consumable === "Loan") {

      this.setState({
        job_level_2_name: job_level_2_name,
      }
        , () => this._onSelect_withdraw_now()
      )
    }

    else {
      this.setState({
        job_level_2_name: job_level_2_name,
        job_level3: job_level3.data,
        loading: false,
        status_show_withdraw: false,
        current_display: "select-job-level3",
      })

    }
  }

  _onSelectJobLevel3 = async (job_level_3_name, name_thai) => {

    this.setState({
      loading: true,
    })
    const job_level4 = await joblevel4_model.getJobLevel4By({
      job_level_1_name: this.state.job_level_1_name,
      job_level_2_name: this.state.job_level_2_name,
      job_level_3_name: job_level_3_name
    })

    let product_type_consumable = this.props.product_select.product_type_consumable
    // console.log("product_type_consumable", product_type_consumable);

    if (job_level4.data.length == 0 && product_type_consumable === "Consumable") {
      this.setState({
        job_level_3_name: job_level_3_name,
        job_level4: job_level4.data,
        loading: false,
        status_show_withdraw: true,
        current_display: "select_choice_withdraw",
        pre_page: "select-job-level3",
      })
    }

    else if (job_level4.data.length == 0 && product_type_consumable === "Loan") {
      this.setState({
        job_level_3_name: job_level_3_name,

      }
        , () => this._onSelect_withdraw_now()
      )
    }

    else {
      this.setState({
        job_level_3_name: job_level_3_name,
        job_level4: job_level4.data,
        loading: false,
        status_show_withdraw: false,
        current_display: "select-job-level4",
      })

    }
  }

  _onSelectJobLevel4 = async (job_level_4_name, name_thai) => {

    let product_type_consumable = this.props.product_select.product_type_consumable
    // console.log("product_type_consumable", product_type_consumable);

    if (product_type_consumable === "Consumable") {
      this.setState({
        job_level_4_name: job_level_4_name,
        loading: false,
        status_show_withdraw: true,
        current_display: "select_choice_withdraw",
        pre_page: "select-job-level4",
      })

    }

    else if (product_type_consumable === "Loan") {
      this.setState({
        job_level_4_name: job_level_4_name,
      }
        , () => this._onSelect_withdraw_now()
      )

    }

  }

  _onSelect_withdraw_now = () => {

    let product_issue_type_thai = "";
    let product_issue_type = this.props.product_select.product_issue_type;
    if (product_issue_type === "Full") {
      product_issue_type_thai = "เต็มจำนวน";
    } else if (product_issue_type === "Setpiece") {
      product_issue_type_thai = "ระบุจำนวน";
    } else if (product_issue_type === "Piecemeal") {
      product_issue_type_thai = "กำหนดจำนวน";
    }
    let product_unit = this.props.product_select.product_unit;
    let product_unit_thai = "";
    if (product_unit === "piece") {
      product_unit_thai = "ชิ้น";
    } else if (product_unit === "box") {
      product_unit_thai = "กล่อง";
    }
    let name_thai = [];
    name_thai["product_unit_thai"] = product_unit_thai;
    name_thai["product_issue_type_thai"] = product_issue_type_thai;

    let { count_issue,
      TypeComp, Issue_qty,
      product_brand_name,
      product_group_name,
      product_type_name,
      job_level_1_name,
      job_level_2_name,
      job_level_3_name,
      job_level_4_name,
    } = this.state;

    let {
      product_code,
      product_name,
      product_refill_unit,
      product_issue_unit,
      product_image,
      product_amount,
      product_package_qty,
      product_price,
      product_size,
      product_type_consumable,
    } = this.props.product_select;

    if (product_type_consumable == "Loan") {

      TypeComp = "Loan"

    }

    let index_stock_layout_issue = [];
    let last_updata_stock_layout_qty = 0;
    let issuing_license = false;

    const type_withdraw = "withdraw-now"

    if (product_issue_type == "Piecemeal") {
      Issue_qty = product_issue_unit * product_package_qty;
    }
    else if (product_issue_type == "Full") {
      Issue_qty = product_package_qty * product_refill_unit;
    }
    else if (product_issue_type == "Setpiece") {

      Issue_qty = this.state.Issue_qty
    }


    this.props.onSave(
      {
        TypeComp,
        Issue_qty,
        product_code,
        product_name,
        product_issue_type,
        product_refill_unit,
        product_unit,
        product_image,
        product_amount,
        product_price,
        product_issue_unit,
        product_package_qty,
        product_size,
        index_stock_layout_issue,
        last_updata_stock_layout_qty,
        product_brand_name,
        product_group_name,
        product_type_name,
        name_thai,
        issuing_license,
        count_issue,
        job_level_1_name,
        job_level_2_name,
        job_level_3_name,
        job_level_4_name,
      },
      type_withdraw
      , this._resetdata()
    );

  }

  _onSelect_add_in_basket = () => {

    let product_issue_type_thai = "";
    let product_issue_type = this.props.product_select.product_issue_type;
    if (product_issue_type === "Full") {
      product_issue_type_thai = "เต็มจำนวน";
    } else if (product_issue_type === "Setpiece") {
      product_issue_type_thai = "ระบุจำนวน";
    } else if (product_issue_type === "Piecemeal") {
      product_issue_type_thai = "กำหนดจำนวน";
    }
    let product_unit = this.props.product_select.product_unit;
    let product_unit_thai = "";
    if (product_unit === "piece") {
      product_unit_thai = "ชิ้น";
    } else if (product_unit === "box") {
      product_unit_thai = "กล่อง";
    }
    let name_thai = [];
    name_thai["product_unit_thai"] = product_unit_thai;
    name_thai["product_issue_type_thai"] = product_issue_type_thai;

    let {
      count_issue,
      TypeComp,
      Issue_qty,
      product_brand_name,
      product_group_name,
      product_type_name,
      job_level_1_name,
      job_level_2_name,
      job_level_3_name,
      job_level_4_name,
    } = this.state;

    let {
      product_code,
      product_name,
      product_refill_unit,
      product_issue_unit,
      product_image,
      product_amount,
      product_package_qty,
      product_price,
      product_size,
      product_type_consumable,
    } = this.props.product_select;

    if (product_type_consumable == "Loan") {

      TypeComp = "Loan"

    }

    let index_stock_layout_issue = [];
    let last_updata_stock_layout_qty = 0;
    let issuing_license = false;

    const type_withdraw = "add-in-basket"

    if (product_issue_type == "Piecemeal") {
      Issue_qty = product_issue_unit * product_package_qty;
    }
    else if (product_issue_type == "Full") {
      Issue_qty = product_package_qty * product_refill_unit;
    }
    else if (product_issue_type == "Setpiece") {

      Issue_qty = this.state.Issue_qty
    }

    this.props.onSave(
      {
        TypeComp,
        Issue_qty,
        product_code,
        product_name,
        product_issue_type,
        product_refill_unit,
        product_unit,
        product_image,
        product_amount,
        product_price,
        product_issue_unit,
        product_package_qty,
        product_size,
        index_stock_layout_issue,
        last_updata_stock_layout_qty,
        product_brand_name,
        product_group_name,
        product_type_name,
        name_thai,
        issuing_license,
        count_issue,
        job_level_1_name,
        job_level_2_name,
        job_level_3_name,
        job_level_4_name,
      },
      type_withdraw
      ,
      this._resetdata()
    );
    Swal.fire({ title: "เพิ่มรายการสำเร็จ !", icon: "success", timer: 1000 });

  }


  _showdisplay = () => {
    let current_display = this.state.current_display;

    if (current_display === "") {
      return (
        <>
          <Select_compart_type
            list_in_basket={this.state.list_in_basket}
            license_product={this.props.license_product}
            user_code={this.state.user_code}
            count_slot={this.state.count_slot}
            product_select={this.props.product_select}
            product_brand_name={this.state.product_brand_name}
            product_group_name={this.state.product_group_name}
            product_type_name={this.state.product_type_name}
            _onSelectTypeCompartment={this._onSelectTypeCompartment}
            _handleClose={this._handleClose}
          />
        </>
      );
    } else if (current_display === "assign-product-qty") {
      return (
        <>
          <Assign_product_qty
            _issueQty={this._issueQty}
            count_slot={this.state.count_slot}
            TypeComp={this.state.TypeComp}
            product_select={this.state.product_select}
            product_brand_name={this.state.product_brand_name}
            product_group_name={this.state.product_group_name}
            product_type_name={this.state.product_type_name}
            _handleClose={this._handleClose}
            _displayback={this._displayback}
          />
        </>
      );
    }

    else if (current_display === "select-job-level1") {
      return (
        <Select_job_level1
          product_select={this.state.product_select}
          product_brand_name={this.state.product_brand_name}
          product_group_name={this.state.product_group_name}
          product_type_name={this.state.product_type_name}
          job_level1={this.state.job_level1}
          status_show_withdraw={this.state.status_show_withdraw}
          _onSelectJobLevel1={this._onSelectJobLevel1}
          _handleClose={this._handleClose}
          _displayback={this._displayback}
        />
      );
    }

    else if (current_display === "select-job-level2") {
      return (
        <Select_job_level2
          product_select={this.state.product_select}
          product_brand_name={this.state.product_brand_name}
          product_group_name={this.state.product_group_name}
          product_type_name={this.state.product_type_name}
          job_level2={this.state.job_level2}
          status_show_withdraw={this.state.status_show_withdraw}
          _onSelectJobLevel2={this._onSelectJobLevel2}
          _handleClose={this._handleClose}
          _displayback={this._displayback}
        />
      );
    }

    else if (current_display === "select-job-level3") {
      return (
        <Select_job_level3
          product_select={this.state.product_select}
          product_brand_name={this.state.product_brand_name}
          product_group_name={this.state.product_group_name}
          product_type_name={this.state.product_type_name}
          job_level3={this.state.job_level3}
          status_show_withdraw={this.state.status_show_withdraw}
          _onSelectJobLevel3={this._onSelectJobLevel3}
          _handleClose={this._handleClose}
          _displayback={this._displayback}
        />
      );
    }

    else if (current_display === "select-job-level4") {
      return (
        <Select_job_level4
          product_select={this.state.product_select}
          product_brand_name={this.state.product_brand_name}
          product_group_name={this.state.product_group_name}
          product_type_name={this.state.product_type_name}
          job_level4={this.state.job_level4}
          status_show_withdraw={this.state.status_show_withdraw}
          _onSelectJobLevel4={this._onSelectJobLevel4}
          _handleClose={this._handleClose}
          _displayback={this._displayback}
        />
      );
    }

    else if (current_display === "select_choice_withdraw") {
      return (
        <Select_choice_withdraw
          product_select={this.state.product_select}
          product_brand_name={this.state.product_brand_name}
          product_group_name={this.state.product_group_name}
          product_type_name={this.state.product_type_name}
          job_level4={this.state.job_level4}
          status_show_withdraw={this.state.status_show_withdraw}
          pre_page={this.state.pre_page}
          _onSelectJobLevel4={this._onSelectJobLevel4}
          _onSelect_withdraw_now={this._onSelect_withdraw_now}
          _onSelect_add_in_basket={this._onSelect_add_in_basket}
          _handleClose={this._handleClose}
          _displayback={this._displayback}
        />
      );
    }
  };

  render() {
    return (
      <Modal size={this.state.size_modal} centered isOpen={this.props.show}>
        <Loading show={this.state.loading} />

        {this._showdisplay()}
      </Modal>
    );
  }
}

export default Issue_select_option;
