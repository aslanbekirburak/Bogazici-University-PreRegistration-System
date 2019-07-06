import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col, Button, Card } from "antd";
import boun from "./resources/bogazici.jpg";
import { withRouter } from "react-router-dom";
import {
  fetchGurobiLessons,
  fetchGurobiLessonsReset
} from "./redux/ui/actions.js";
class gurobiDone extends Component {
  state = {
    searchText: "",
    selectedRowKeys: [],
    selectedLessons: [],
    intersectionLessons: []
  };
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    if (this.props.ui.Gurobilessons.length === 0) {
      this.props.fetchGurobiLessons();
    } else {
      console.log(this.props.ui.Gurobilessons, "not fetch gurobi");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      fetchGurobiLessonsInProgress,
      fetchGurobiLessonsHasError,
      fetchGurobiLessonsCompleted
    } = this.props.ui;

    if (
      !fetchGurobiLessonsInProgress &&
      !fetchGurobiLessonsHasError &&
      fetchGurobiLessonsCompleted
    ) {
      this.props.fetchGurobiLessonsReset();
    } else if (
      !fetchGurobiLessonsInProgress &&
      fetchGurobiLessonsHasError &&
      fetchGurobiLessonsCompleted
    ) {
      this.props.fetchGurobiLessonsReset();
    }
  }
  render() {
    const { Gurobilessons } = this.props.ui;
    return (
      <div>
        <img
          src={boun}
          alt="Logo"
          style={{
            overflowY: "auto",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundSize: "cover",
            zIndex: -1,
            width: "100%",
            height: "100%"
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#00000090"
          }}
        />
        <div
          style={{
            marginTop: 30
          }}
        />

        <Button type="danger" style={{marginLeft:"35%"}} onClick={() => this.props.history.goBack()}>Geri</Button>
        <div />
        <Col span={24}>
          <div style={{ top: 0, left: 0, backgroundColor: "#FFFFFF90" }}>
            <Row type="flex" justify="space-around" align="middle">
              {Gurobilessons &&
                Gurobilessons.map((el, index) => (
                  <Col span={10}>
                    <Card
                      title={index + 1 + ". Alınan Ders"}
                      style={{ width: "100%" }}
                    >
                      <p>{el.code_sec}</p>
                      <p>{el.course_name}</p>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}
function mapStateToProps(appState, ownProps) {
  return {
    ui: appState.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGurobiLessons: () => dispatch(fetchGurobiLessons()),
    fetchGurobiLessonsReset: () => dispatch(fetchGurobiLessonsReset())
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(gurobiDone)
);
