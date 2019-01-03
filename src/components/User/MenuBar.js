import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class MenuBar extends Component {
    render() {
        return (
            <div>
                {this.props.location.pathname === '/user/search/results' ? null :
                    <div className='MenuBar' >
                        <Link to='/user/today'>
                            <p>Today</p>
                        </Link>
                        {/* {console.log(this.props.location.pathname)} */}
                        {/* {console.log(this.props)} */}
                        <Link to='/user/games'>
                            <p>Games</p>
                        </Link>
                        <Link to='/user/apps'>
                            <p>Apps</p>
                        </Link>
                        <Link to='/user/search'>
                            <p>Search</p>
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
const MenuBarWithLocation = withRouter(MenuBar)
export default connect(mapPropsToState)(MenuBarWithLocation);
