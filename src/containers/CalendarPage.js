import React, { PropTypes } from 'react'
import {
  grey500,
  green400,
  teal500,
  white
} from 'material-ui/styles/colors'
import PageBase from '../components/PageBase'
import { connect } from 'react-redux'
import { loadProducts, deleteProduct } from '../actions/product'
import FlatButton from 'material-ui/FlatButton'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { loadCustomers } from '../actions/customer'
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import Divider from "material-ui/Divider";

class CalendarPage extends React.Component {
  constructor (props) {
    super(props)

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
      productId: null,
      customerEndTime: moment().toDate(),
      customerDate: moment().toDate(),
      customerStartTime: moment().toDate(),
      dialogText: 'Are you sure to do this?',
      search: {
        product: ''
      }
    }

    this.onChangePage = this.onChangePage.bind(this)
    this.onDelete = this.onDelete.bind(this)

    this.handleToggle = this.handleToggle.bind(this)
    this.handleSearchFilter = this.handleSearchFilter.bind(this)
    this.handleSearchProducts = this.handleSearchProducts.bind(this)
    this.handleSearchCustomers = this.handleSearchCustomers.bind(this)
    this.handleErrorMessage = this.handleErrorMessage.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);

    if (this.props.productList || this.props.productList.length < 1)
      props.getAllProducts(this.state.search)

    if (this.props.customerList || this.props.customerList.length < 1)
      props.getAllCustomers(this.state.search);
  }

  componentWillMount () { }

  /* eslint-disable */
  componentDidUpdate (prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.productList !== prevProps.productList) {
      //this.setPage(this.props.initialPage);
      this.onChangePage(this.props.productList.slice(0, 10))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({snackbarOpen: true})
    }

    if (
      !this.props.deleteSuccess &&
      nextProps.deleteSuccess &&
      !nextProps.errorMessage &&
      !nextProps.isFetching
    ) {
      this.props.getAllProducts()
    }
  }

  onChangePage (pageOfItems) {
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.productList
    )
      this.setState({pageOfItems: pageOfItems})
  }

  onDelete (id) {
    if (id) {
      this.handleOpen(id)
    }
  }

  handleToggle () {
    this.setState({searchOpen: !this.state.searchOpen})
  }

  handleSearchProducts () {
    this.setState({searchOpen: !this.state.searchOpen})
    this.props.getAllProducts(this.state.search)
  }

  handleOpen (id) {
    this.setState({dialogText: 'Are you sure to delete this data?'})
    this.setState({open: true})
    this.setState({productId: id})
  }

  handleClose (isConfirmed) {
    this.setState({open: false})

    if (isConfirmed && this.state.productId) {
      this.props.deleteProduct(this.state.productId)
      this.setState({productId: null})
    }
  }

  handleSearchCustomers () {
    this.setState({searchOpen: !this.state.searchOpen})
    this.props.getAllCustomers(this.state.search)
  }

  handleSearchFilter (event) {
    const field = event.target.name

    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search)
      search[field] = event.target.value

      this.setState({search: search})
    }
  }

  handleErrorMessage () {
    this.setState({
      snackbarOpen: true
    })
  }

  handleSnackBarClose () {
    this.setState({
      snackbarOpen: false
    })
  }

  onItemClick(itemId, e, time) {
    debugger
    this.setState({
      timeEdit: true,
      itemId
    })
  }

  handleCancel() {
    this.setState({ timeEdit: false });
  }

  handleOk() {
    const { order } = this.state;

    this.setState({ timeEdit: false });
  }

  render () {
    const {errorMessage, productList, customerList} = this.props

    let groups = []
    let items = []

    //Перебираем сотрудников
    if (customerList && customerList.length) {
      customerList.map((customer, ind) => {
        //groups это правая колонка с именами сотрудников в календаре
        groups.push({
          id: ind,
          title: customer.firstName + ' ' + customer.lastName
        })


        if (customer.worktime) {
          customer.worktime.map((t, i) => (
            //items это записи времени на шкале
            items.push({
              title: t.title,
              start_time: moment(t.start_time),//t.start_time,
              end_time: moment(t.end_time),
              id: `${ind}_${i}`,
              group: ind
            })
          ))
        }
      })
    }

    return (
      <PageBase
        navigation='Производственный календарь'
      >
        <div id='calendar'>
          <Timeline
            groups={groups}
            items={items}
            onItemClick={this.onItemClick}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
          />

          <Dialog
            title="Редактировать время"
            open={this.state.timeEdit}
            ignoreBackdropClick
            ignoreEscapeKeyUp
            maxWidth="xs"
          >
            <div>
              <DatePicker
                defaultDate={this.state.customerDate}
                floatingLabelText="Выберите дату"
                fullWidth={true}
              />
              <TimePicker
                floatingLabelText="Выберите время начала"
                fullWidth={true}
                defaultTime={this.state.customerStartTime} />
              <TimePicker
                floatingLabelText="Выберите время окончания"
                fullWidth={true}
                defaultTime={this.state.customerEndTime}
                style={{marginBottom: '20'}}/>
              <span>
                  <RaisedButton onClick={this.handleCancel} color="primary">
                    Отмена
                  </RaisedButton>
                  <RaisedButton
                    onClick={this.handleOk}
                    primary={true}
                    color="primary">
                    OK
                  </RaisedButton>
                </span>
            </div>
          </Dialog>
        </div>
      </PageBase>
    )
  }
}

CalendarPage.propTypes = {
  productList: PropTypes.array,
  getAllProducts: PropTypes.func.isRequired,
  getAllCustomers: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps (state) {
  const {productReducer, customerReducer} = state
  const {
    productList,
    deleteSuccess,
    isFetching,
    isAuthenticated,
    errorMessage,
    user
  } = productReducer

  return {
    productList,
    customerList: customerReducer.customerList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCustomers: filters => dispatch(loadCustomers(filters)),
    getAllProducts: filters => dispatch(loadProducts(filters)),
    deleteProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
