import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { white, purple600, purple500 } from 'material-ui/styles/colors'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ComposedChart } from 'recharts'
import { typography } from 'material-ui/styles'
import { loadCustomers } from '../../actions/customer'
import { connect } from 'react-redux'
import { loadOrders } from '../../actions/order'
import autoBind from 'react-autobind'
import moment from 'moment'
import SelectField from "material-ui/SelectField";
import MenuItem from 'material-ui/MenuItem'

const styles = {
  paper: {
    backgroundColor: purple500,
    height: 250
  },
  div: {
    height: 90,
    padding: '5px 40px 0 0'
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: purple600,
    padding: 10
  }
}

class NewOrders extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      month: 'May',
      year: 2019
    }
  }

  componentWillMount () {
    this.props.getAllOrders && this.props.getAllOrders()
  }

  render () {
    const {orderList, sortedOrdersByDate, months} = this.props

    return (
      <Paper style={styles.paper}>
        <div style={{...styles.header}}>Закрытые сделки по дням</div>

        <div className='grid-2-col' style={{gridTemplateColumns: '100px 100px', maxWidth: '400px'}}>
          <div style={{color: 'white', fontSize: 20, maxWidth: 100}}>
            Месяц:
          </div>
          <div style={{maxWidth: 80}}>
            <SelectField
              labelStyle={{
                color: 'white',
              }}
                value={this.state.month}>
              {
                months.map(m => <MenuItem value={m.name} primaryText={m.name} />)
              }
            </SelectField>
          </div>
        </div>
        <div style={styles.div}>
          <ResponsiveContainer>
            <LineChart data={sortedOrdersByDate} >
              <Line
                type='monotone'
                dataKey='deals'
                stroke='#ffffff'
                strokeWidth={2}
              />
              <XAxis label="День месяца" stroke='white' dataKey="day" />
              <YAxis label="Сделки" stroke='white' dataKey="deals"/>

            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    )
  }
}

NewOrders.propTypes = {
  data: PropTypes.array
}

function mapStateToProps (state) {
  const { orderReducer } = state;
  const {
    orderList
  } = orderReducer

  let sortedOrdersByDate = [];
  let months = [];
  let years = [];

  orderList.map(o => {
    let dates = o.orderDate.split('.')
    let monthName = moment(dates[1], 'M').format('MMMM')
    let year = moment(dates[2], 'Y')


    sortedOrdersByDate.push( {
      day: dates[0],
      deals: o.closedDeals,
      monthName,
      year
    })

    if (!months.find(n => n.name === monthName)) {
      months.push({
        name: monthName
      })
    }

    years.push({
      name: year
    })
  })

  return {
    orderList,
    sortedOrdersByDate,
    months,
    years
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCustomers: () => dispatch(loadCustomers()),
    getAllOrders: filters => dispatch(loadOrders(filters)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrders)
