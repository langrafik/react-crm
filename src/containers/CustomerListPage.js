import React, { PropTypes } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentAdd from "material-ui/svg-icons/content/add";
import Search from "material-ui/svg-icons/action/search";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import Cancel from "material-ui/svg-icons/navigation/cancel";
import {
  teal500,
  pink500,
  grey200,
  grey500,
  green400,
  white
} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
import Data from '../data';
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { loadCustomers, deleteCustomer } from "../actions/customer";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

const groups = Data.groups

console.log('groups', groups)

class CustomerListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchOpen: false,
      snackbarOpen: false,
      autoHideDuration: 1500,

      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      pageOfItems: [],
      customerId: null,
      dialogText: "Are you sure to do this?",
      search: {
        firstName: "",
        lastName: ""
      }
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);

    if (this.props.customerList || this.props.customerList.length < 1)
      props.getAllCustomers(this.state.search);
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.customerList !== prevProps.customerList) {
      this.onChangePage(this.props.customerList.slice(0, 10));
    }
  }

  onChangePage(pageOfItems) {
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.customerList
    )
      this.setState({ pageOfItems: pageOfItems });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllCustomers(this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ customerId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.customerId) {
      this.props.deleteCustomer(this.state.customerId);
      this.setState({ customerId: null });
    }
  }

  handleSearchFilter(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search[field] = event.target.value;
      this.setState({ search: search });
    }
  }

  handleErrorMessage() {
    this.setState({
      snackbarOpen: true
    });
  }

  handleSnackBarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({ snackbarOpen: true });
    }

    if (
      !this.props.deleteSuccess &&
      nextProps.deleteSuccess &&
      !nextProps.errorMessage &&
      !nextProps.isFetching
    ) {
      this.props.getAllCustomers();
    }
  }

  render() {
    const {
      errorMessage,
      customerList,
      deleteSuccess,
      isFetching
    } = this.props;

    //  if ( deleteSuccess && !isFetching){
    //        this.props.getAllCustomers();
    //  }
    //  else if (!deleteSuccess && errorMessage){
    //    this.handleErrorMessage ();
    //  }

    const styles = {
      fab: {
        // margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20
      },
      fabSearch: {
        // margin: 0,
        top: "auto",
        right: 100,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20,
        backgroundColor: "lightblue"
      },
      editButton: {
        paddingRight: 25
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: "10%"
        },
        name: {
          width: "20%"
        },
        price: {
          width: "20%"
        },
        category: {
          width: "20%"
        },
        edit: {
          width: "20%"
        }
      },
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      drawer: {
        backgroundColor: "lightgrey"
      }
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.handleClose(false)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.handleClose(true)}
      />
    ];

    return (
      <PageBase
        title={"Сотрудники (" + customerList.length + ")"}
        navigation="CRM / Сотрудники"
      >
        <div>
          <div>
            {/*<Link to="/customer">
              <FloatingActionButton
                backgroundColor="lightblue"
                secondary={true}
                style={styles.fab}
                backgroundColor={pink500}
              >
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <FloatingActionButton
              style={styles.fabSearch}
              backgroundColor={teal500}
              onTouchTap={this.handleToggle}
            >
              <Search />
            </FloatingActionButton>*/}
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Snackbar
            open={this.state.snackbarOpen}
            message={errorMessage ? errorMessage : ""}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleSnackBarClose}
          />

          <Table
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn style={styles.columns.name} />
                <TableHeaderColumn style={styles.columns.name}>
                  Имя
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>
                  Фамилия
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>
                  KPI
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.category}>
                  Группа пользователя
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>

                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.state.pageOfItems.map(item => (
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.name}>
                    <img width={40} src={item.avatar} />
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>
                    {item.firstName}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>
                    {item.lastName}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>
                    {item.rewards}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.category}>
                    {groups[item.group].name}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={"/customer/" + item.id}>
                      <FloatingActionButton
                        zDepth={0}
                        mini={true}
                        style={styles.editButton}
                        backgroundColor={green400}
                        iconStyle={styles.editButtonIcon}
                      >
                        <ContentCreate />
                      </FloatingActionButton>
                    </Link>

                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/*<div className={"row center-xs"}>
            <div className={"col-xs-6"}>
              <div className={"box"}>
                <Pagination
                  items={customerList}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
*/}
          {/*<Dialog
            title="Confirm Dialog "
            actions={actions}
            modal={true}
            contentStyle={styles.dialog}
            open={this.state.open}
          >
            {this.state.dialogText}
          </Dialog>*/}
        </div>
      </PageBase>
    );
  }
}

CustomerListPage.propTypes = {
  isFetching: PropTypes.bool,
  customerList: PropTypes.array,
  getAllCustomers: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { customerReducer } = state;
  const {
    customerList,
    isFetching,
    deleteSuccess,
    isAuthenticated,
    errorMessage,
    user
  } = customerReducer;

  return {
    customerList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCustomers: filters => dispatch(loadCustomers(filters)),
    deleteCustomer: id => dispatch(deleteCustomer(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
