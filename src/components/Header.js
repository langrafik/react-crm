import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import { white } from 'material-ui/styles/colors'
import Exit from 'material-ui/svg-icons/action/exit-to-app'

// import FlatButton from "material-ui/FlatButton";

class Header extends React.Component {

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onLogoutClick();
  }

  render () {
    const {styles, handleChangeRequestNavDrawer} = this.props

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      },
      iconsLeftContainer: {
        marginLeft: 20,
        marginRight: 10
      }
    }

    return (
      <div>
        <AppBar
          style={{...styles, ...style.appBar}}
          /*title={ <SearchBox />  }*/
          iconElementLeft={
            <div style={style.iconsLeftContainer}>
              {/*<img width={35} src="../assets/img/logo_rtk_sm.png" ></img>*/}
              <IconButton
                style={style.menuButton}
                onClick={handleChangeRequestNavDrawer}
              >
                <Menu color={white}/>
              </IconButton>
            </div>
          }
          iconElementRight={
            <div>
              <IconButton
                tooltip='Выход'
                color='white'
                tooltipPosition='center-left'
                onClick={this.handleClick}
              />
              <Exit
                color='white'
              />
            </div>
          }
        />
      </div>
    )
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func,
  onLogoutClick: PropTypes.func.isRequired
}

export default Header
