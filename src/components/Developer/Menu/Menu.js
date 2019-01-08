import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {resetState} from './../../../ducks/reducer'
import './../Dev.css'

class Menu extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        //   console.log(this.props.location.pathname)
        return (
            <div>
                {this.props.location.pathname === '/user/search/results' ? null :
                    <div className='Menu-Header' >
                        <Link to='/dev/addapp'>
                            <p>Add an App</p>
                        </Link>
                        <Link to='/dev/devinfo'>
                            <p>Developer Info</p>
                        </Link>
                        <Link to='/dev/addedapps'>
                            <p>Your Apps</p>
                        </Link>
                        <a href='http://localhost:4000/logout'>
                            <p onClick={(e) => { resetState() }}> Log Out </p>
                        </a>
                    </div>
                }
            </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
const MenuWithLocation = withRouter(Menu)
export default connect(mapPropsToState, {resetState})(MenuWithLocation);