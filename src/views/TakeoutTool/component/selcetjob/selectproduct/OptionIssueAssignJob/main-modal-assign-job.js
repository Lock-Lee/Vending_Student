import React from "react";
import {
    CardBody,
    Card,
    CardTitle,
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
import Select_compart_type_assign from './select-compart-type-assign'
import Assign_product_qty_assign from "./assign-product-qty-assign"
import StocklayoutModel from "../../../../../../models/StockLayoutModel";

const stocklay_model = new StocklayoutModel();

class Main_modal_assign_job extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_display: "",
            job_op_code: "",
            job_op_name: "",
            job_op_tools_code: "",
            job_op_tools_name: "",
            product_select: [],
            product_brand: [],
            product_type: [],
            product_group: [],
            product_brand_name: "",
            product_group_name: "",
            product_type_name: "",
            product_code: '',
            TypeComp: '',
            size_modal: 'xl',
            Issue_qty: '',
            status_add_in_basket: false,
            list_in_basket: [],
            count_slot: [],
            cost_center: [],
            stock_job_name: '-',
            stock_machine_name: '-',
        };

    }

    componentDidUpdate(props_old) {
        let status_add_in_basket = this.state.status_add_in_basket

        if (props_old.show === false && this.props.show) {
            this._fetchData();
            this._filterNameByCode();
            this._flow_value_count_product();
        }

        let list_in_basket = this.props.list_in_basket
        if (status_add_in_basket === true) {
            this.setState({
                status_add_in_basket: false,
                list_in_basket: list_in_basket,
            })
        }
    }

    _fetchData = async () => {
        let product_code = this.props.product_select.product_code
        let product_name = this.props.product_select.product_name
        let product_select = this.props.product_select
        let cost_center = this.props.cost_center
        this.setState({
            product_select: product_select,
            product_code: product_code,
            product_name: product_name,
            cost_center: cost_center,
        })

    }

    _flow_value_count_product = async () => {
        let product_code = this.props.product_select.product_code
        let list_in_basket = this.state.list_in_basket
        const count_slots = await stocklay_model.getCountReserveBycode({ product_code })
        this.setState({
            count_slot: count_slots.data[0],
        })

        list_in_basket.find((list) => {
            if (list.product_code == product_code) {
                let value = 0
                let count_slot = this.state.count_slot
                value = parseInt(list.Issue_qty)

                if (list.TypeComp == 'New') {
                    count_slot.count_product_type_new -= value
                    if (count_slot.count_product_type_new < 0) {
                        count_slot.count_product_type_new = 0
                    }
                }
                else if (list.TypeComp == 'RF') {
                    count_slot.count_product_type_rf -= value
                    if (count_slot.count_product_type_new < 0) {
                        count_slot.count_product_type_new = 0
                    }
                }
                else if (list.TypeComp == 'Loan') {
                    count_slot.count_product_type_loan -= value
                    if (count_slot.count_product_type_new < 0) {
                        count_slot.count_product_type_new = 0
                    }
                }
                else if (list.TypeComp == 'Old') {
                    count_slot.count_product_type_old -= value
                    if (count_slot.count_product_type_new < 0) {
                        count_slot.count_product_type_new = 0
                    }
                }
                this.setState({
                    count_slot: count_slot,
                })
            }

        })

    }

    _onSelectTypeCompartment = (TypeComp, thai) => {
        let product_issue_type = this.props.product_select.product_issue_type;

        if (product_issue_type === "Setpiece") {
            this.setState({
                TypeComp: TypeComp,
                current_display: "assign-product-qty",
                size_modal: "md",
            });
        } else if (product_issue_type === "Full" || product_issue_type === "Piecemeal") {
            this.setState({
                TypeComp: TypeComp,
                size_modal: "xl",
            }, () => this._onSaveInbasket(thai));
        }
    };

    _issueQty = (Issue_qty, thai) => {
        this.setState({
            Issue_qty: Issue_qty,
            size_modal: "xl",
        }, () => this._onSaveInbasket(thai));
    };

    _onSaveInbasket = async (thai) => {
        let name_thai = []
        name_thai["product_unit_thai"] = thai.product_unit_thai
        name_thai["product_issue_type_thai"] = thai.product_issue_type_thai

        let { TypeComp, Issue_qty, product_brand_name, product_group_name, product_type_name, stock_job_name, stock_machine_name } = this.state
        let { job_code, job_name, job_op_code, job_op_name, machine_code, machine_name, job_op_tools_code, job_op_tools_name } = this.state.cost_center
        let { product_code, product_name, product_issue_type, product_refill_unit, product_issue_unit, product_unit, product_image, product_amount, product_package_qty, product_price, product_size } = this.props.product_select
        let index_stock_layout_issue = []
        let last_updata_stock_layout_qty = 0
        let issuing_license = false

        if (product_issue_type == 'Piecemeal') {
            Issue_qty = product_issue_unit * product_package_qty
        }
        else if (product_issue_type == 'Full') {
            Issue_qty = product_package_qty * product_refill_unit
        }

        this.props.onSave({
            TypeComp,
            Issue_qty,
            job_code,
            job_name,
            job_op_code,
            job_op_name,
            machine_code,
            machine_name,
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
            stock_job_name,
            stock_machine_name,
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
            TypeComp: "",
            size_modal: "xl",
            Issue_qty: "",
            status_add_in_basket: true,
        });
    }
    _displayback = (e) => {
        this.setState({
            current_display: e.current_display,
            size_modal: e.size_modal,
        });
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
            product_brand_name: product_brands[0].product_brand_name,
            product_group_name: product_groups[0].product_group_name,
            product_type_name: product_types[0].product_type_name,
        });
    };

    _showdisplay = () => {
        let current_display = this.state.current_display;

        if (current_display === "") {
            return (
                <>
                    <Select_compart_type_assign
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
                    <Assign_product_qty_assign
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

    };

    render() {
        return (
            <Modal
                size={this.state.size_modal}
                centered
                isOpen={this.props.show}
            >
                {this._showdisplay()}
            </Modal>
        );
    }
}

export default Main_modal_assign_job;
