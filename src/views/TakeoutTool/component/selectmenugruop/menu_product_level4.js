import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardTitle, Col, FormGroup, Input, Row, Modal, ModalBody, ModalFooter, ModalHeader, } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// import GLOBAL from "../../../../../GLOBAL";

import ProductMenuModel from "../../../../models/ProductMenuModel";
import ProductMenuListModel from "../../../../models/ProductMenuListModel";

const productmenu_model = new ProductMenuModel();
const productmenuList_model = new ProductMenuListModel();

export class Menu_product_level4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            keyword: "",
            title_modal: "",
            layoutName: "default",
            languageKeyboard: "english",
            show_Keyboard: true,
            product_select: [],
            childent_menu_3: [],
            gridTemplateColumns: "",
        };
    }


    componentDidMount() {

        this._fetchData()

    }

    async _fetchData() {
        let menu_name_select_munu3 = this.props.menu_name_select_munu3;

        const childent_menu_3 = await productmenu_model.getProductMenuBy({ product_menu_name_ref: menu_name_select_munu3 })

        this.setState({
            childent_menu_3: childent_menu_3.data,
            menu_name_select_munu3: menu_name_select_munu3,
        }
            ,
            () =>
                this._set_gridTemplateColumns(),
            this._push_tag_null()
        )
    }


    _optionDisplayback() {

        this.props._displayback({
            title: "Menu_product_level4",
        });
    }

    _push_tag_null() {
        let { childent_menu_3 } = this.state
        let length_menu = childent_menu_3.length

        let tag_null = []

        if (length_menu == 0) {
            tag_null.push(
                <Col></Col>
            )
            tag_null.push(
                <Col></Col>
            )
            return tag_null;
        } else if (length_menu == 1) {
            tag_null.push(
                <Col></Col>
            )
            tag_null.push(
                <Col></Col>
            )
            return tag_null;
        } else if (length_menu == 2) {
            tag_null.push(
                <Col></Col>
            )
            return tag_null;
        } else if (length_menu == 3) {
            tag_null.push(
                <Col></Col>
            )
            return tag_null;
        } else {
            tag_null.push(
                <></>
            )
            return tag_null;
        }
    }

    _set_gridTemplateColumns() {

        let { childent_menu_3 } = this.state
        let length_menu = childent_menu_3.length

        if (length_menu == 0) {
            this.setState({
                gridTemplateColumns: "20% 20% 20% 20% 20%"
            })
        } else if (length_menu == 1) {
            this.setState({
                gridTemplateColumns: "20% 20% 20% 20% 20%"
            })
        } else if (length_menu == 2) {
            this.setState({
                gridTemplateColumns: "25% 25% 25% 25%"
            })
        } else if (length_menu == 3) {
            this.setState({
                gridTemplateColumns: "20% 20% 20% 20% 20%"
            })
        } else if (length_menu == 4) {
            this.setState({
                gridTemplateColumns: "25% 25% 25% 25%"
            })
        } else {
            this.setState({
                gridTemplateColumns: "20% 20% 20% 20% 20%"
            })
        }
    }

    render() {

        const { gridTemplateColumns } = this.state;

        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            {" "}
                            <Button
                                type="button"
                                style={{
                                    width: "120px",
                                    height: "80px",
                                }}
                                onClick={() => this._optionDisplayback()}
                            >
                                {" "}
                                <i className="fas fa-arrow-left"></i>
                            </Button>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            {" "}
                            <h1>{this.state.menu_name_select_munu3}</h1>
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

                        {this.state.childent_menu_3.map((item, idx) => (

                            <Col
                                className="home"
                                style={{
                                    paddingLeft: "0px",
                                    paddingRight: "0px",
                                    backgroundColor: "white",
                                    maxWidth: "95%",
                                }}
                            >
                                {" "}
                                <Link
                                    to="/takeoutTool"
                                    style={{ alignItems: "center", textAlign: "center" }}
                                    onClick={
                                        () => this.props._on_select_menu_4(item.product_menu_name)
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
            </Card>
        );
    }
}
export default Menu_product_level4;
