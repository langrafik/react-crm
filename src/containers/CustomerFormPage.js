import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
// import DatePicker from 'material-ui/DatePicker';
import { green400, grey400, grey500, white } from 'material-ui/styles/colors'
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

import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'
import Data from '../data'

const groups = Data.groups

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

const priority = {
  0: 'Низкий',
  1: 'Нормальный',
  2: 'Высокий'
}


const statuses = {
  0: 'Не выполнен',
  1: 'Выполнен',
  2: 'В процессе'
}


class CustomerFormPage extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      customer: {},
      tabIndex: 0,
      showMoreKpi: false,
      totalKpi: null
    }

    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleCalculateClick = this.handleCalculateClick.bind(this)
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

  handleTabChange (event, value) {
    this.setState({tabIndex: value})
  }

  handleGroupChange (event, value) {
    let customer = Object.assign({}, this.state.customer)
    customer['group'] = value
    this.setState({customer: customer})
  }

  handleCalculateClick () {
    let customer = this.state.customer
    let totalKpi = 0

    customer.kpiArray.map((kpi, index) => {
      let paramsCalc = 0

      switch (kpi.znak) {
        case '+':
          paramsCalc = (customer[kpi.paramName] + customer[kpi.paramName2])
          break;

        case '-':
          paramsCalc = (customer[kpi.paramName] - customer[kpi.paramName2])
          break;

        case '*':
          paramsCalc = (customer[kpi.paramName] * customer[kpi.paramName2])
          break;

        default:
          paramsCalc = (customer[kpi.paramName] / customer[kpi.paramName2])
      }

      let tmpKpi = customer[`kpiWeight${index}`] * paramsCalc

      totalKpi = totalKpi + tmpKpi;
    })

    customer['totalKpi'] = totalKpi

    this.setState({totalKpi})
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

    const {isFetching, customer, totalKpi, showMoreKpi} = this.state

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
      },
      columns: {
        width: '16.7%'
      }
    }
    if (isFetching) {
      return <CircularProgress/>
    } else {

      const kpiArray = customer.kpiArray

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
                  hintText='Имя'
                  floatingLabelText='Имя'
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
                  hintText='Фамилия'
                  floatingLabelText='Фамилия'
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

            <Paper className='root-tab'>
              <Tabs
                value={this.state.value}
                onChange={this.handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                centered
              >
                <Tab label='Показатели'>
                  {/*<div className='customer-page'>
                    <div className='item-a'>
                      First Call Resolution
                    </div>
                    <div className='grid-3-col'>


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
                          value={customer.kpiWeight1}
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
                  </div>*/}

                  <div className='customer-page'>
                    <div className='grid-2-col'>
                      <div className='item-a kpi customertitle'>
                        Количество закрытых сделок сотрудником
                      </div>

                      <div className=''>
                        <FormsyText
                          floatingLabelText='количество'
                          type='number'
                          name='closedDeals'
                          fullWidth
                          onChange={this.handleChange}
                          value={customer.closedDeals}
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

                    <div className='grid-2-col'>
                      <div className='item-a kpi customertitle'>
                        Прибыль принесенная сотрудником
                      </div>

                      <div className=''>
                        <FormsyText
                          floatingLabelText='$'
                          type='number'
                          name='rewards'
                          fullWidth
                          onChange={this.handleChange}
                          value={customer.rewards}
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

                    <div className='grid-2-col'>
                      <div className='item-a kpi customertitle'>
                        Сумма сделки
                      </div>

                      <div className=''>
                        <FormsyText
                          floatingLabelText='$'
                          type='number'
                          name='dealSumm'
                          fullWidth
                          onChange={this.handleChange}
                          value={customer.dealSumm}
                        />
                      </div>
                    </div>

                    <div className='grid-2-col'>
                      <div className='item-a kpi customertitle'>
                        Дата сделки
                      </div>

                      <div className=''>
                        <DatePicker
                          defaultDate={new Date(customer.dataSumm)}
                          floatingLabelText="Дата сделки"
                          fullWidth={true}
                          formatDate={(date) => moment(date).format('DD.MM.YYYY')}
                        />
                      </div>
                    </div>

                    <div className='grid-2-col'>
                      <div className='item-a kpi customertitle'>
                        Компания заказчик
                      </div>

                      <div className=''>
                        <FormsyText
                          floatingLabelText='Имя компании'
                          type='text'
                          name='customerCompanyName'
                          fullWidth
                          onChange={this.handleChange}
                          value={customer.customerCompanyName}
                        />
                      </div>
                    </div>

                  </div>

                </Tab>

                <Tab label='Задачи'>

                  <Table
                  >
                    <TableHeader
                    >
                      <TableRow>
                        <TableHeaderColumn style={styles.columns}>
                          Задача
                        </TableHeaderColumn>
                        <TableHeaderColumn style={styles.columns}>
                          Приоритет
                        </TableHeaderColumn>
                        <TableHeaderColumn style={styles.columns}>
                          Статус
                        </TableHeaderColumn>
                        <TableHeaderColumn style={styles.columns}>
                          Старт
                        </TableHeaderColumn>
                        <TableHeaderColumn style={styles.columns}>
                          Конец
                        </TableHeaderColumn>
                        <TableHeaderColumn style={styles.columns}>
                          % выполнения
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                      deselectOnClickaway={this.state.deselectOnClickaway}
                      showRowHover={this.state.showRowHover}
                      stripedRows={this.state.stripedRows}
                    >
                      {customer.tasks.map(item => (
                        <TableRow key={item.id}>
                          <TableRowColumn style={styles.columns}>
                            {item.name}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns}>
                            {priority[item.priority]}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns}>
                            {statuses[item.status]}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns}>
                            {moment(item.start, 'DD.MM.YYYY').format('DD.MM.YYYY')}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns}>
                            {moment(item.end, 'DD.MM.YYYY').format('DD.MM.YYYY')}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns}>
                            {item.perc}
                          </TableRowColumn>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>


                </Tab>


                <Tab label='KPI'>
                  <div className='customer-page'>

                    <div className='grid-2-col'>
                      <div className='item-a kpi'>
                        KPI
                      </div>

                      <div className='item-a fact'>
                        ФАКТ
                      </div>
                    </div>

                    {/*<div className='grid-5-col'>
                      <div className='col'>
                        <div style={{marginTop: '40px', marginRight: '20px', fontSize: '20px'}}>KPI 1</div>
                      </div>
                      <div className='col'>
                        <div className='col'>
                          <FormsyText
                            hintText='%'
                            floatingLabelText='Вес KPI %'
                            fullWidth={true}
                            type='number'
                            name='kpiWeight1'
                            onChange={this.handleChange}
                            value={customer.kpiWeight1}
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

                      <div className='col'>
                        <div style={{marginTop: '40px', fontSize: '20px'}}>Средний объем заказа</div>
                      </div>

                      <div className='col'>
                        <FormsyText
                          hintText='Объем заказов'
                          floatingLabelText='Объем заказов'
                          fullWidth={true}
                          type='number'
                          name='Vzak'
                          onChange={this.handleChange}
                          value={customer.Vzak}
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
                          hintText='Количество заявок'
                          floatingLabelText='Количество заявок'
                          fullWidth={true}
                          type='number'
                          name='Nzak'
                          onChange={this.handleChange}
                          value={customer.Nzak}
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

                    <div className='grid-5-col'>
                      <div className='col'>
                        <div style={{marginTop: '40px', marginRight: '20px', fontSize: '20px'}}>KPI 2</div>
                      </div>
                      <div className='col'>
                        <div className='col'>
                          <FormsyText
                            hintText='%'
                            floatingLabelText='Вес KPI %'
                            fullWidth={true}
                            type='number'
                            name='kpiWeight2'
                            onChange={this.handleChange}
                            value={customer.kpiWeight2}
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

                      <div className='col'>
                        <div style={{marginTop: '40px', fontSize: '20px'}}>Коэффициент выполнения целевых показателей
                        </div>
                      </div>

                      <div className='col'>
                        <FormsyText
                          hintText='Целевые показатели'
                          floatingLabelText='Целевые показатели'
                          fullWidth={true}
                          type='number'
                          name='CP'
                          onChange={this.handleChange}
                          value={customer.CP}
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
                          floatingLabelText='Общее число ЦП'
                          fullWidth={true}
                          type='number'
                          name='CPplan'
                          onChange={this.handleChange}
                          value={customer.CPplan}
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

                    <div className='grid-5-col'>
                      <div className='col'>
                        <div style={{marginTop: '40px', marginRight: '20px', fontSize: '20px'}}>KPI 3</div>
                      </div>
                      <div className='col'>
                        <div className='col'>
                          <FormsyText
                            floatingLabelText='Вес KPI %'
                            fullWidth={true}
                            type='number'
                            name='kpiWeight3'
                            onChange={this.handleChange}
                            value={customer.kpiWeight3}
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

                      <div className='col'>
                        <div style={{marginTop: '40px', fontSize: '20px'}}>Количество товарных позиций</div>
                      </div>

                      <div className='col'>
                        <FormsyText
                          floatingLabelText='Кол-во позиций у сотрудника'
                          fullWidth={true}
                          type='number'
                          name='CustomerGoods'
                          onChange={this.handleChange}
                          value={customer.CustomerGoods}
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
                          floatingLabelText='В компании'
                          fullWidth={true}
                          type='number'
                          name='CompanyGoods'
                          onChange={this.handleChange}
                          value={customer.CompanyGoods}
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
                    </div>*/}

                    {
                      kpiArray.map((kpi, index) =>
                        <div className='grid-5-col'>
                          <div className='col'>
                            <div style={{marginTop: '40px', marginRight: '20px', fontSize: '20px'}}>KPI {index}</div>
                          </div>
                          <div className='col'>
                            <div className='col'>
                              <FormsyText
                                floatingLabelText='Вес KPI %'
                                fullWidth={true}
                                type='number'
                                name={`kpiWeight${index}`}
                                onChange={this.handleChange}
                                value={customer[`kpiWeight${index}`]}
                                required
                                positive
                              />
                            </div>
                          </div>

                          <div className='col'>
                            <div style={{marginTop: '40px', fontSize: '20px'}}>{kpi.name}</div>
                          </div>

                          <div className='col'>
                            <FormsyText
                              floatingLabelText={kpi.floatText}
                              fullWidth={true}
                              type={kpi.type || 'number'}
                              name={kpi.paramName}
                              onChange={this.handleChange}
                              value={customer[kpi.paramName]}
                            />
                          </div>

                          <div className='col'>
                            <FormsyText
                              floatingLabelText={kpi.floatText2}
                              fullWidth={true}
                              type={kpi.type2 || 'number'}
                              name={kpi.paramName2}
                              onChange={this.handleChange}
                              value={customer[kpi.paramName2]}
                            />
                          </div>
                        </div>
                      )
                    }

                    {showMoreKpi && <div className='grid-5-col'>
                      <div className='col'>
                        <div style={{marginTop: '40px', marginRight: '20px', fontSize: '20px'}}>KPI {kpiNumber}</div>
                      </div>
                      <div className='col'>
                        <div className='col'>
                          <FormsyText
                            hintText='%'
                            floatingLabelText='Вес KPI %'
                            fullWidth={true}
                            type='number'
                            name='kpiWeight1'
                            onChange={this.handleChange}
                            value={customer.kpiWeight1}
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

                      <div className='col'>
                        <div style={{marginTop: '40px', fontSize: '20px'}}>Средний объем заказа</div>
                      </div>

                      <div className='col'>
                        <FormsyText
                          hintText='Объем заказов'
                          floatingLabelText='Объем заказов'
                          fullWidth={true}
                          type='number'
                          name='Vzak'
                          onChange={this.handleChange}
                          value={customer.Vzak}
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
                          hintText='Количество заявок'
                          floatingLabelText='Количество заявок'
                          fullWidth={true}
                          type='number'
                          name='Nzak'
                          onChange={this.handleChange}
                          value={customer.Nzak}
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
                    </div>}

{/*
                    <RaisedButton
                      label='Добавить KPI'
                      type='button'
                      style={{
                        margin: '10 500'
                      }}
                      onClick={() => this.handleCalculateClick(event)}
                      primary={true}
                    />
*/}


                    <RaisedButton
                      label='Рассчитать'
                      type='button'
                      style={{
                        margin: '10 500'
                      }}
                      onClick={() => this.handleCalculateClick(event)}
                      primary={true}
                    />


                    {customer.totalKpi !== null && <div className='total-kpi'>
                      Сотрудник эффективен на {customer.totalKpi.toFixed(2)} %
                    </div>}

                  </div>


                </Tab>
                <Tab label='Зарплата'>
                  <div className='customer-page'>
                    <div className='grid-3-col'>
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
                        <div style={{marginTop: '40px', fontSize: '50px'}}> *</div>
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
                </Tab>
              </Tabs>
            </Paper>

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
