import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
// import DatePicker from 'material-ui/DatePicker';
import { green400, grey400 } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import PageBase from '../components/PageBase'

import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList'
import { Card } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import {
  getCustomer,
  updateCustomer,
  addCustomer,
  newCustomer
} from '../actions/customer'
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib'
import Formsy from 'formsy-react'
import autoBind from 'react-autobind'
import MenuItem from 'material-ui/MenuItem'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import globalStyles from '../styles'

const groups = [
  {
    id: 0,
    name: 'Маркетолог'
  },
  {
    id: 1,
    name: 'Оператор'
  },
  {
    id: 2,
    name: 'Руководитель'
  }
]

const kpiWeight = [
  {
    id: 0,
    name: '25%'
  },
  {
    id: 1,
    name: '50%'
  },
  {
    id: 2,
    name: '75%'
  },
  {
    id: 3,
    name: '100%'
  }
]

class CustomerFormPage extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      customer: {}
    }

    this.handleGroupChange = this.handleGroupChange.bind(this)
    // this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  componentWillMount () {
    if (this.props.routeParams.id)
      this.props.getCustomer(this.props.routeParams.id)
    else this.props.newCustomer()
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.customer &&
      nextProps.customer
    ) {
      this.setState({isFetching: false})
      this.setState({customer: Object.assign({}, nextProps.customer)})
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push('/customers')
    }
  }

  handleChange (event) {
    const field = event.target.name
    // const { customer } = this.state;

    if (event && event.target && field) {
      const customer = Object.assign({}, this.state.customer)
      customer[field] = event.target.value
      this.setState({customer: customer})
    }
  }

  handleGroupChange (event, value) {
    let customer = Object.assign({}, this.state.customer)
    customer['group'] = value
    this.setState({customer: customer})
  }

  enableButton () {
    this.setState({
      canSubmit: true
    })
  }

  disableButton () {
    this.setState({
      canSubmit: false
    })
  }

  notifyFormError (data) {
    console.error('Form error:', data)
  }

  handleClick (event) {
    event.preventDefault()
    if (this.state.customer.id) this.props.updateCustomer(this.state.customer)
    else this.props.addCustomer(this.state.customer)
  }

  render () {
    const {errorMessage} = this.props

    const {isFetching, customer} = this.state

    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },
      card: {
        width: 120
      }

    }
    if (isFetching) {
      return <CircularProgress/>
    } else {
      return (
        <PageBase title='Сотрудник' navigation='Карточка сотрудника'>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={230}>
              <GridTile>
                <FormsyText
                  hintText='First Name'
                  floatingLabelText='First Name'
                  name='firstName'
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={customer.firstName ? customer.firstName : ''}
                  validationErrors={{
                    isWords: 'Please provide valid first name',
                    isDefaultRequiredValue: 'This is a required field'
                  }}
                  required
                />

                <FormsyText
                  hintText='Last Name'
                  floatingLabelText='Last Name'
                  fullWidth={true}
                  name='lastName'
                  onChange={this.handleChange}
                  validationErrors={{
                    isWords: 'Please provide valid first name',
                    isDefaultRequiredValue: 'This is a required field'
                  }}
                  value={customer.lastName ? customer.lastName : ''}
                  required
                />

                <FormsySelect
                  floatingLabelText='Группа пользователя'
                  value={customer.group || 0}
                  onChange={this.handleGroupChange}
                  style={styles.customWidth}
                  name='customerId'
                >
                  {groups.map((g, index) => (
                    <MenuItem
                      key={index}
                      name='groupId'
                      value={g.id}
                      style={styles.menuItem}
                      primaryText={g.name}
                    />
                  ))}
                </FormsySelect>
              </GridTile>

              <GridTile>
                {this.state.customer &&
                customer.avatar && (
                  <Card style={styles.card}>
                    <img width={100} src={customer.avatar}/>
                  </Card>
                )}
              </GridTile>
            </GridList>

            <Divider/>

            <div className='customer-page'>
              <h3 style={globalStyles.title} className='customertitle'>Показатели</h3>

              <div className='item-a'>
                First Call Resolution
              </div>
              <div className='grid'>


                <div className='col'>
                  <div style={{marginTop: '40px'}}> Количество проблем клиентов</div>
                </div>
                <div className='col'>
                  <FormsyText
                    floatingLabelText='проблемы'
                    fullWidth={true}
                    type='number'
                    name='clientProblems'
                    onChange={this.handleChange}
                    value={customer.clientProblems}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>
                <div className='col'>

                </div>

                <div className='col'>
                  <div style={{marginTop: '40px'}}> Общее количество решенных проблем клиентов</div>
                </div>
                <div className='col'>
                  <FormsyText
                    floatingLabelText='проблемы'
                    fullWidth={true}
                    type='number'
                    name='allClientProblems'
                    onChange={this.handleChange}
                    value={customer.allClientProblems}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>
                <div className='col'>
                </div>


                <div className='col'/>
                <div className='col'>
                  <FormsyText
                    hintText=''
                    floatingLabelText='Итог'
                    fullWidth={true}
                    type='number'
                    name='summary'
                    onChange={this.handleChange}
                    value={customer.summary}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>

                <div className='col'>
                  <FormsyText
                    hintText='%'
                    floatingLabelText='Вес KPI %'
                    fullWidth={true}
                    type='number'
                    name='kpiWeight'
                    onChange={this.handleChange}
                    value={customer.kpiWeight}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>

              </div>


              <div className='item-a'>
                Average time in queue
              </div>
              <div className='grid'>


                <div className='col'>
                  <div style={{marginTop: '40px'}}> Общее время ожидания клиента в очереди звонков</div>
                </div>
                <div className='col'>
                  <FormsyText
                    floatingLabelText='время (сек)'
                    fullWidth={true}
                    type='number'
                    name='clientProblemsTime'
                    onChange={this.handleChange}
                    value={customer.clientProblemsTime}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>
                <div className='col'>

                </div>

                <div className='col'>
                  <div style={{marginTop: '40px'}}> Общее количество отвеченных оператором звонков</div>
                </div>
                <div className='col'>
                  <FormsyText
                    floatingLabelText='кол-во'
                    fullWidth={true}
                    type='number'
                    name='allClientCalls'
                    onChange={this.handleChange}
                    value={customer.allClientCalls}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>
                <div className='col'>
                </div>


                <div className='col'/>
                <div className='col'>
                  <FormsyText
                    hintText=''
                    floatingLabelText='Итог'
                    fullWidth={true}
                    type='number'
                    name='summary'
                    onChange={this.handleChange}
                    value={customer.summary}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>

                <div className='col'>
                  <FormsyText
                    hintText='%'
                    floatingLabelText='Вес KPI %'
                    fullWidth={true}
                    type='number'
                    name='kpiWeight'
                    onChange={this.handleChange}
                    value={customer.kpiWeight}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>

              </div>
            </div>

            <div className='customer-page'>
              <h3 style={globalStyles.title} className='customertitle'>Зарплата</h3>

              <div className='grid'>
                <div className='col'>
                  <FormsyText
                    floatingLabelText='руб'
                    fullWidth={true}
                    type='number'
                    name='payment'
                    onChange={this.handleChange}
                    value={customer.payment}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>
                <div className='col'>
                  <div style={{marginTop: '40px', fontSize: '50px'}}> * </div>
                </div>
                <div className='col'>
                  <FormsyText
                    hintText=''
                    floatingLabelText='KPI ФАКТ'
                    fullWidth={true}
                    type='number'
                    name='factKpi'
                    onChange={this.handleChange}
                    value={customer.factKpi}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>


                <div className='col'/>
                <div className='col'/>
                <div className='col'>
                  <FormsyText
                    hintText=''
                    floatingLabelText='Итог'
                    fullWidth={true}
                    type='number'
                    name='summary'
                    onChange={this.handleChange}
                    value={customer.summary}
                    validations={{
                      isInt: true
                    }}
                    validationErrors={{
                      isInt: 'Введите валидное число',
                    }}
                    required
                    positive
                  />
                </div>

              </div>
            </div>

            <div style={styles.buttons}>
              <Link to='/customers'>
                <RaisedButton label='Cancel'/>
              </Link>

              <RaisedButton
                label='Save'
                style={styles.saveButton}
                type='button'
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              />
            </div>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          </Formsy.Form>
        </PageBase>
      )
    }
  }
}

CustomerFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  customer: PropTypes.object,
  newCustomer: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addCustomer: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps (state) {
  const {customerReducer} = state
  const {
    customer,
    isFetching,
    updateSuccess,
    addSuccess,
    errorMessage,
    isAuthenticated,
    user
  } = customerReducer

  return {
    customer: customer || {},
    isFetching,
    addSuccess,
    updateSuccess,
    errorMessage,
    isAuthenticated,
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newCustomer: () => dispatch(newCustomer()),
    getCustomer: id => dispatch(getCustomer(id)),
    updateCustomer: customer => dispatch(updateCustomer(customer)),
    addCustomer: customer => dispatch(addCustomer(customer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormPage)
