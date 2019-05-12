import React, { PropTypes } from 'react'
import {
  pink500,
  grey200,
  grey500,
  green400,
  teal500,
  white
} from 'material-ui/styles/colors'
import PageBase from '../components/PageBase'
// import Data from '../data';
import { connect } from 'react-redux'
import { loadProducts, deleteProduct } from '../actions/product'
import FlatButton from 'material-ui/FlatButton'

// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import { loadCustomers } from '../actions/customer'

class ProductListPage extends React.Component {
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

  render () {
    const {errorMessage, productList, customerList} = this.props

    const styles = {
      fab: {
        // margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        marginRight: 20
      },
      fabSearch: {
        // margin: 0,
        top: 'auto',
        right: 100,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        marginRight: 20,
        backgroundColor: 'lightblue'
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
          width: '10%'
        },
        name: {
          width: '40%'
        },
        price: {
          width: '20%',
          textAlign: 'right'
        },
        category: {
          width: '20%'
        },
        edit: {
          width: '20%'
        }
      },
      dialog: {
        width: '20%',
        maxWidth: 'none'
      },
      drawer: {
        backgroundColor: 'lightgrey'
      }
    }

    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        value={false}
        onTouchTap={() => this.handleClose(false)}
      />,
      <FlatButton
        label='Confirm'
        primary={true}
        value={true}
        onTouchTap={() => this.handleClose(true)}
      />
    ]

    let groups = []
    let items = []

    if (customerList && customerList.length) {
      customerList.map((customer, ind) => {
        groups.push({
          id: ind,
          title: customer.firstName + ' ' + customer.lastName
        })

        if (customer.worktime) {
          customer.worktime.map((t, i) => (
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

/*
    items = [
      {
        id: '0_0',
        group: 1,
        title: 'Рус',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
      },
      {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().add(-0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
      },
      {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
      }
    ]*/

    return (
      <PageBase
        navigation='Производственный календарь'
      >
        <div id='calendar'>
          <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
          />

          {/*          <BigCalendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
          />*/}
        </div>
      </PageBase>
    )
  }
}

ProductListPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
