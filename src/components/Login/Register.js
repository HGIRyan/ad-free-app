import React, { Component } from 'react'
import axios from 'axios';
import { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer } from './../../ducks/reducer'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './login.css'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';







const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.text.primary,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 2,
    },
    subTitle: {
        marginTop: theme.spacing.unit
    }
});
class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
            passConfirm: '',
            autoRenew: false,
            renewalPeriod: 0,
            message: 'Thank you for Registering',
            isDev: false,
            developer: '',
        }
    }
    async register() {
        let { email, username, password, autoRenew, renewalPeriod, isDev, developer } = this.state;
        let res = await axios.post('/auth/register', { email, username, password, autoRenew, renewalPeriod, isDev, developer })
        if (res.data.loggedIn && res.data.sessionUser.isDev) {
            this.props.history.push('/dev')
            this.props.dataDump(res.data.sessionUser)
        }
        else if (res.data.loggedIn) {
            this.props.history.push('/user/today')
            this.props.dataDump(res.data.sessionUser)
        }
        console.log(res.data.message)
        this.setState({ username: '', password: '', passConfirm: '', email: '', autoRenew: false, renewalPeriod: 1, message: res.data.message })
    }
    render() {
        const { classes } = this.props;
        let screenSize = window.innerWidth
        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <img src='https://user-images.githubusercontent.com/25380057/51049671-c8804e00-158b-11e9-9aab-a5a26e8aa754.png' alt='logo' className='LoginLogo' />
                        <form
                            className={classes.form}
                            onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">UserName</InputLabel>
                                <Input
                                    onChange={(e) => { this.setState({ username: e.target.value }) }}
                                    id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                                    name="password" type="password" id="password" autoComplete="current-password" />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                                <Input
                                    onChange={(e) => { this.setState({ passConfirm: e.target.value }) }}
                                    name="password" type="password" id="password" autoComplete="current-password" />
                            </FormControl>
                            {screenSize < 800 ?
                                <div className='userRegister'>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"
                                            onClick={(e) => this.setState(prevState => ({ autoRenew: !prevState.autoRenew }))}
                                        />}
                                        label="AutoRenew?"
                                    />
                                    {this.state.autoRenew ?
                                        <div>
                                            <hr />
                                            <Button variant="outlined" className={classes.button}
                                                onClick={(e) => { this.setState({ renewalPeriod: 1 }) }}
                                            >
                                                1 Month for $2.50
                                        </Button>
                                            <hr />
                                            <Button variant="outlined" className={classes.button}
                                                onClick={(e) => { this.setState({ renewalPeriod: 3 }) }}
                                            >
                                                3 Months for $7 or 7% OFF of $7.50 (Most Popular)
                                        </Button>
                                            <hr />
                                            <Button variant="outlined" className={classes.button}
                                                onClick={(e) => { this.setState({ renewalPeriod: 12 }) }}
                                            >
                                                Anual for $25 or 17% OFF of $30.00 (BEST DEAL)
                                        </Button>
                                            <hr />
                                            <h4>Selected Renewall Period: {this.state.renewalPeriod} Months</h4>
                                        </div>
                                        :
                                        null}
                                    <p>By Registering you agree to our <a href='https://termsfeed.com/blog/sample-terms-and-conditions-template/'>Terms & Privacy Policy</a></p>
                                </div>
                                :
                                <div>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"
                                            onClick={(e) => this.setState(prevState => ({ isDev: !prevState.isDev }))}
                                        />}
                                        label="Are You A Developer?"
                                    />
                                    {this.state.isDev ?
                                        <div>
                                            <FormControl margin="normal" required fullWidth>
                                                <InputLabel htmlFor="company name">Company Name</InputLabel>
                                                <Input
                                                    onChange={(e) => { this.setState({ developer: e.target.value }) }}
                                                    name="companyName" type="text" id="password" autoComplete="current-password" />
                                            </FormControl>
                                        </div>
                                        :
                                        null}
                                </div>}
                            {this.state.password === this.state.passConfirm ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    className={classes.submit}
                                    onClick={() => this.register()}
                                >
                                    Register
                            </Button>
                            :
                            <h4>Passwords Don't Match</h4>
                            }
                            {/* <Typography className={classes.subTitle} variant="subtitle1" align='center'>Not Registered?</Typography> */}
                            <Link
                                id='login-link'
                                to="/">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    className={classes.submit}>Back</Button>
                            </Link>
                        </form>
                    </Paper>
                </main>
            </div>
            // <div>
            //     <img src='' alt='' />
            //     <p>Email: <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} type='text' /></p>
            //     <p>Username: <input value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} type='text' /></p>
            //     <p>Password: <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} type='password' /></p>
            //     <p>Confirm Password: <input value={this.state.passConfirm} onChange={(e) => { this.setState({ passConfirm: e.target.value }) }} type='password' /></p>
            //     <hr />
            //     {screenSize < 800 ?
            //         <div>
            //             <p>Auto Renew? <input type='checkbox' value='check' onChange={(e) => this.setState(prevState => ({ autoRenew: !prevState.autoRenew }))} /></p>
            //             <button onClick={(e) => { this.setState({ renewalPeriod: 1 }) }}>
            //                 <div className='renewal'>
            //                     <div>1 Month</div>
            //                     <div className='price'> $2.50 </div>
            //                 </div>
            //             </button>
            //             <button onClick={(e) => { this.setState({ renewalPeriod: 3 }) }}>
            //                 <div className='renewal'>
            //                     <div>3 Month</div>
            //                     <div className='price'> $7 or 7% OFF <p className='discount'>$7.50</p> </div>
            //                 </div>
            //             </button>
            //             <button onClick={(e) => { this.setState({ renewalPeriod: 12 }) }}>
            //                 <div className='renewal'>
            //                     <div>1 Year</div>
            //                     <div className='price'> $25 or 17% OFF <p className='discount'>$30</p> </div>
            //                 </div>
            //             </button>
            //             <hr />
            //             <p>By Signing up you agree to our <a href='https://termsfeed.com/blog/sample-terms-and-conditions-template/'>Terms & Privacy Policy</a></p>
            //             <hr />
            //         </div>
            //         :
            //         <div>
            //             <p>Are you Registering to be a developer? <input type='checkbox' value='check' onChange={(e) => this.setState(prevState => ({ isDev: !prevState.isDev }))} /></p>
            //             {this.state.isDev ?
            //                 <h1>Company Name: <input value={this.state.developer} onChange={(e) => { this.setState({ developer: e.target.value }) }} type='text' /></h1>
            //                 :
            //                 null
            //             }
            //         </div>

            //     }
            //     {this.state.password === this.state.passConfirm ?
            //         <button onClick={() => this.register()}>
            //             Register
            //         </button>
            //         :
            //         <div>Password Doesn't Match</div>}
            //     <hr />
            //     {this.state.message}
            //     <hr />
            //     {/* <Link to='/user/today'>
            //         <button> PAY NOW </button>
            //     </Link> */}
            // </div>
        )
    }
}
function mapPropsToState(state) {
    return { ...state }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapPropsToState, { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer })(withStyles(styles)(Register))
