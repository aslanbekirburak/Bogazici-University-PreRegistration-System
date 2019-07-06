import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Input, Button, Icon, Card } from "antd";

import { withRouter } from "react-router-dom";
import {
  fetchLessons,
  fetchLessonsReset,
  postLessonsRequest,
  postLessonsReset,
  fetchSelectedLessons,
  fetchSelectedLessonsReset
} from "./redux/ui/actions.js";
import boun from "./resources/bogazici.jpg";
import Highlighter from "react-highlight-words";

class TablePage extends Component {
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
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] &&
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    if (this.props.ui.lessons.length === 0) {
      this.props.fetchLessons();
    } else {
      console.log(this.props.ui.lessons);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      fetchLessonsInProgress,
      fetchLessonsHasError,
      fetchLessonsCompleted,
      pushLessonsInProgress,
      pushLessonsHasError,
      pushLessonsCompleted,
      fetchSelectedLessonsInProgress,
      fetchSelectedLessonsHasError,
      fetchSelectedLessonsCompleted
    } = this.props.ui;
    if (
      !fetchLessonsInProgress &&
      !fetchLessonsHasError &&
      fetchLessonsCompleted
    ) {
      this.props.fetchLessonsReset();
      console.log(this.props.ui.lessons);
    } else if (
      !fetchLessonsInProgress &&
      fetchLessonsHasError &&
      fetchLessonsCompleted
    ) {
      this.props.fetchLessonsReset();
      console.log("err");
    }
    if (
      !pushLessonsInProgress &&
      !pushLessonsHasError &&
      pushLessonsCompleted
    ) {
      this.props.postLessonsReset();
      this.props.fetchSelectedLessons();
    } else if (
      !pushLessonsInProgress &&
      pushLessonsHasError &&
      pushLessonsCompleted
    ) {
      this.props.postSelectedLessonsReset();
      console.log("err");
    }
    if (
      !fetchSelectedLessonsInProgress &&
      !fetchSelectedLessonsHasError &&
      fetchSelectedLessonsCompleted
    ) {
      this.props.fetchSelectedLessonsReset();
    } else if (
      !fetchSelectedLessonsInProgress &&
      fetchSelectedLessonsHasError &&
      fetchSelectedLessonsCompleted
    ) {
      this.props.fetchSelectedLessonsReset();
    }
  }
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  sendList(isRedirecting) {
    const { selectedRowKeys } = this.state;
    this.props.postLessonsRequest({
      courses: selectedRowKeys.map(el => el + "")
    });
    if (isRedirecting) this.props.history.push("/gurobiDone");
  }
  delete(item) {
    let { selectedRowKeys } = this.state;
    let deletedEl = selectedRowKeys.splice(item, 1);
    console.log("DELETEselectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.sendList(false);
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { Selectedlessons, lessons } = this.props.ui;
    const filteredSelectedLessons = Selectedlessons.map(el =>
      lessons.find(el1 => el1.id === el)
    );
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const data1 = lessons
      ? lessons.map(lesson => ({
          key: lesson.id,
          code_sec: lesson.code_sec,
          course_name: lesson.course_name,
          hours: lesson.hours.join(" ")
        }))
      : [];

    const columns1 = [
      {
        title: "Course Code",
        dataIndex: "code_sec",
        key: "code_sec",

        ...this.getColumnSearchProps("code_sec")
      },
      {
        title: "Course Name",
        dataIndex: "course_name",
        key: "course_name",

        ...this.getColumnSearchProps("course_name")
      },

      {
        title: "Hours",
        dataIndex: "hours",
        key: "hours"
      }
    ];
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
        >
          <Row type="flex" justify="space-around">
            <Col span={10}>
              <div
                style={{
                  top: 0,
                  left: 0,
                  backgroundColor: "#FFFFFF90"
                }}
              >
                <Table
                  rowSelection={rowSelection}
                  bordered
                  columns={columns1}
                  dataSource={data1}
                />
              <Button type="primary" block onClick={() => this.sendList()}>Add List</Button> 
              </div>              
            </Col>
            <Col span={10}>
              <div style={{ top: 0, left: 0, backgroundColor: "#FFFFFF90" }}>
                <Row type="flex" justify="space-around" align="middle">
                  {Selectedlessons &&
                    Selectedlessons.map((el, index) => (
                      <Col span={10}>
                        <Card
                          title={index + 1 + ". Eklenen Ders"}
                          style={{ width: "100%",height: "240px" ,marginTop:"10px" }}
                        >
                          <p>{el.code_sec}</p>
                          <p>{el.course_name}</p>
                          <Button type="danger" style={{marginTop:"10px"}} onClick={index => this.delete(index)}>
                            Delete
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  <Button type="primary" block onClick={() => this.sendList(true)}>
                    Submit Lessons
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
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
    fetchLessons: () => dispatch(fetchLessons()),
    fetchLessonsReset: () => dispatch(fetchLessonsReset()),
    postLessonsRequest: selectedRowKeys =>
      dispatch(postLessonsRequest(selectedRowKeys)),
    postLessonsReset: () => dispatch(postLessonsReset()),
    fetchSelectedLessons: () => dispatch(fetchSelectedLessons()),
    fetchSelectedLessonsReset: () => dispatch(fetchSelectedLessonsReset())
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TablePage)
);
