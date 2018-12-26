import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
                    <div className='Menu' >
                        <Link to='/dev/addapp'>
                            <p>Add an App</p>
                        </Link>
                        <Link to='/dev/devinfo'>
                            <p>Developer Info</p>
                        </Link>
                        <Link to='/dev/addedapps'>
                            <p>Your Apps</p>
                        </Link>
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
export default connect(mapPropsToState)(MenuWithLocation);