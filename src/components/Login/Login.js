import React, { Component } from 'react'
import axios from 'axios';
import { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer } from './../../ducks/reducer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import './login.css'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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



class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message: 'Hello!',
            dev: false,
            user: false
        }
    }

    async login() {
        let { username, password } = this.state;
        let res = await axios.post('/auth/login', { username, password })
        if (res.data.loggedIn && res.data.sessionUser.isDev) {
            this.props.history.push('/dev')
            this.props.dataDump(res.data.sessionUser)
        } 
        else if (res.data.loggedIn) {
            this.props.history.push('/user/today')
            this.props.dataDump(res.data.sessionUser)
        }
        this.setState({ username: '', password: '', message: res.data.message })
    }
    async isDevTrue() {
        await this.setState({
            username: 'dev',
            password: '1'
        })
        console.log('DEV')
        this.login()
    }
    async isUserTrue() {
        await this.setState({
            username: 'User',
            password: '1'
        })
        console.log('User')
        this.login()
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.login()
    }


    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <img src='https://user-images.githubusercontent.com/25380057/51049671-c8804e00-158b-11e9-9aab-a5a26e8aa754.png' alt ='logo' className='LoginLogo'/>
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className={classes.submit}
                        >
                            Sign in
                </Button>
                        <Typography className={classes.subTitle} variant="subtitle1" align='center'>Not Registered?</Typography>
                        <Link
                            id='login-link'
                            to="/register">
                            <Button
                                fullWidth
                                variant="contained"
                                color="default"
                                className={classes.submit}>REGISTER</Button>
                        </Link>
                            <Button
                                fullWidth
                                variant="contained"
                                color="default"
                                className={classes.submit}
                                onClick={() => { this.isDevTrue() }}
                                >Dev</Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="default"
                                className={classes.submit}
                                onClick={() => { this.isUserTrue() }}
                                >User</Button>

                    </form>
                </Paper>
            </main>
        );
    }
}



Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(null, { dataDump, update_username, update_user_id, update_user_email, update_autoRenewal, update_renewalPeriod, update_isDev, update_developer })(withStyles(styles)(Login))
// export default Auth