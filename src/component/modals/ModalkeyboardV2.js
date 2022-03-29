import React from "react";
import { Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Button, Row, } from "reactstrap";
import Keyboard from 'react-virtual-keyboard';
// import "css/keyboard.css"

class ModalKeyboardV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            title_modal: "",
            layoutName: "default",
            languageKeyboard: "english",
        };
    }

    componentDidUpdate(props_old) {
        if (props_old.show === false && this.props.show) {
            this._fetchData();
        }
    }

    _fetchData() {
        let title_modal = this.props.title_modal;
        let data_modal;
        if (this.props.data_modal) {
            data_modal = this.props.data_modal;
        } else {
            data_modal = "";
        }

        this.setState({ loading: true }, async () => {
            this.setState({
                loading: false,
                keyword: data_modal,
                title_modal: title_modal,
            });
        });
    }

    _languageKeyboard() {

    }


    render() {
        return (
            <Modal
                size="xl"
                centered
                isOpen={this.props.show}
                toggle={this._handleClose}

            >
                <ModalHeader toggle={this._handleClose}>
                    <label>{this.state.title_modal}</label>
                </ModalHeader>
                <ModalBody>
                    <Row
                        style={{ height: '480px' }}
                    >

                        <Keyboard

                            value={this.state.input}
                            name='keyboard'

                            options={{
                                language: ["ar"],
                                type: "input",
                                layout: "qwerty",
                                alwaysOpen: true,
                                usePreview: true, // แสดงอินพุต
                                useWheel: false,
                                stickyShift: false,
                                appendLocally: true,
                                color: "light",
                                updateOnChange: true,
                                initialFocus: true,
                                display: {
                                    "accept": "Submit"
                                },
                            }}

                            onChange={this.onInputChanged}
                            onAccepted={this.onInputSubmitted}
                            ref={k => this.keyboard = k}
                        />

                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ height: "80px", width: "120px" }}
                        onClick={() =>
                            this.setState({
                                keyword: "",
                            })
                        }
                    >
                        Reset
                    </Button>
                    <button
                        className="btn btn-success"
                        style={{ height: "80px", width: "120px" }}
                        onClick={() => this._handleSave()}
                    >
                        Finish
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalKeyboardV2;