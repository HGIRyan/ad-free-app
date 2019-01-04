import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class MenuBar extends Component {

    render() {
        // const { classes } = this.props;
        return (
            <div>
                {this.props.location.pathname === '/user/search/results' ? null :
                    <div className='MenuBar' >
                        <Link to='/user/today'>
                            <Button variant="contained">
                                <p>Today</p>
                            </Button>
                        </Link>
                        {/* {console.log(this.location.pathname)} */}
                        {/* {console.log(this.props)} */}
                        <Link to='/user/games'>
                        <Button variant="contained">
                                <p>Games</p>
                            </Button>
                        </Link>
                        <Link to='/user/apps'>
                        <Button variant="contained">
                                <p>Apps</p>
                            </Button>
                        </Link>
                        <Link to='/user/search'>
                        <Button variant="contained" color='primary'>
                                <p>Search</p>
                            </Button>
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
