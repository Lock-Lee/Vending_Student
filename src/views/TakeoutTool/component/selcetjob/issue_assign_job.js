import React, { Component } from "react";
import Select_Job from "./assign_job";
import Select_Op from "./job_op";
import Select_Machine from "./job_op_machine";
import Select_Process from "./job-op-machine-tool";
import Select_Product from "./selectproduct/select_product";
import TakeoutAssignJobModel from "../../../../models/TakeoutAssignJobModel";

const takeoutassignjob_Model = new TakeoutAssignJobModel();

export class Issue_assign_job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_display: "",
      jobs: [],
      job_ops: [],
      product_target: [],
      cost_center: [],
      user_code: "",
      user_firstname: "",
      user_lastname: "",
    };
  }
  async componentDidMount() {
    this._fetchData();
  }
  async _fetchData() {
    const { user_code, user_firstname, user_lastname } = this.props;
    const jobs = await takeoutassignjob_Model.getJobBy();
    this.setState({
      jobs: jobs.data,
      user_code: user_code,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
    });
  }

  _onSelectJob = async (job_code, job_name) => {
    let cost_center = this.state.cost_center;
    cost_center["job_code"] = job_code;
    cost_center["job_name"] = job_name;
    const job_ops = await takeoutassignjob_Model.getJobOpByCode({ job_code });

    this.setState({
      loading: false,
      current_display: "job-op",
      job_ops: job_ops.data,
      cost_center: cost_center,
    });
  };

  _onSelectOp = async (job_op_code, job_op_name) => {
    let cost_center = this.state.cost_center;
    cost_center["job_op_code"] = job_op_code;
    cost_center["job_op_name"] = job_op_name;

    const job_op_machine = await takeoutassignjob_Model.getMachineByJobOpCode({
      job_op_code,
    });
    this.setState({
      loading: false,
      current_display: "job-op-machine",
      job_op_machine: job_op_machine.data,
      cost_center: cost_center,
    });
  };

  _onSelectMachine = async (job_op_code, machine_code, machine_name) => {
    let cost_center = this.state.cost_center;
    cost_center["machine_code"] = machine_code;
    cost_center["machine_name"] = machine_name;
    const job_op_tool = await takeoutassignjob_Model.getProcressByJobOpCode({
      job_op_code,
    });
    this.setState({
      loading: false,
      current_display: "job-op-machine-tool",
      job_op_tool: job_op_tool.data,
      cost_center: cost_center,
    });
  };

  _onSelectOpTool = async (job_op_tool_code, job_op_tools_name) => {
    let cost_center = this.state.cost_center;
    cost_center["job_op_tools_code"] = job_op_tool_code;
    cost_center["job_op_tools_name"] = job_op_tools_name;
    const job_op_tool_use =
      await takeoutassignjob_Model.getToolUseByJobOpToolCode({
        job_op_tool_code,
      });
    this.setState({
      loading: false,
      current_display: "select-product",
      product_target: job_op_tool_use.data,
      cost_center: cost_center,
    });
  };

  _displayback = (e) => {
    if (e.title === "Select_Job") {
      this.props._displayback({
        current_display: "",
      });
    } else {
      this.setState({
        current_display: e.current_display,
      });
    }
  };

  _showDisplay() {
    const { current_display } = this.state;
    if (current_display === "") {
      return (
        <Select_Job
          jobs={this.state.jobs}
          _onSelectJob={this._onSelectJob}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "job-op") {
      //หน้าเลือกOP
      return (
        <Select_Op
          job_ops={this.state.job_ops}
          _onSelectOp={this._onSelectOp}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "job-op-machine") {
      //หน้าเลือกMachine
      return (
        <Select_Machine
          job_op_machine={this.state.job_op_machine}
          _onSelectMachine={this._onSelectMachine}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "job-op-machine-tool") {
      //หน้าเลือกprocress
      return (
        <Select_Process
          job_op_tool={this.state.job_op_tool}
          _onSelectOpTool={this._onSelectOpTool}
          _displayback={this._displayback}
        />
      );
    } else if (current_display === "select-product") {
      //หน้าเลือกproduct
      return (
        <Select_Product
          product_target={this.state.product_target}
          user_code={this.state.user_code}
          user_firstname={this.state.user_firstname}
          user_lastname={this.state.user_lastname}
          cost_center={this.state.cost_center}
          _displayback={this._displayback}
        />
      );
    }
  }

  render() {
    return <div>{this._showDisplay()}</div>;
  }
}
export default Issue_assign_job;
