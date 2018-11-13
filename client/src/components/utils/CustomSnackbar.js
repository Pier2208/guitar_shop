import React, { Component } from 'react'

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';


//styles
const styles = {
    success: {
        backgroundColor: '#32A232'
    },
    error: {
        backgroundColor: 'red'
    },
    info: {
        backgroundColor: 'blue'
    },
    warning: {
        backgroundColor: 'orange'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.6rem'
    },
    icon: {
        marginRight: '1rem'
    }
}

//icons
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
}



class CustomSnackbar extends Component {

    state = {
        open: false
    }


    componentDidMount() {
        if(this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }


    renderSnackbarContent = (variant, message, classes) => {
        const Icon = variantIcon[variant]

        return (
            <SnackbarContent
                className={classes[variant]}
                aria-describedby='client-snackbar'
                message={
                    <span id='client-snackbar'
                          className={classes.message}>
                        <Icon className={classes.icon} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}>
            </SnackbarContent>
        )
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false })
    }



    render() {

        const { classes } = this.props

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
            >
                {this.renderSnackbarContent(this.props.variant, this.props.message, classes)}
            </Snackbar>

        )
    }
}

export default withStyles(styles)(CustomSnackbar)
