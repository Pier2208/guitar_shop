import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { Tooltip, Zoom, withStyles } from '@material-ui/core'


//2 styles: dark or light themes
const styles = {
    root: {
        fontSize: '1rem',
        padding: '.4rem .6rem',
        marginLeft: '1.5rem'
    },
    light: {
        color: '#47524D',
        backgroundColor: '#F7F7F2'
    },
    dark: {
        color: 'white',
        backgroundColor: '#545454'
    }
}


const CustomTooltip = ({ title, variant, children, classes }) =>
    <Tooltip
        title={title}
        aria-label={title}
        placement="right"
        classes={{ tooltip: classNames(classes.root, classes[variant]) }}
        TransitionComponent={Zoom}
    >
        {children}
    </Tooltip>


CustomTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomTooltip)
