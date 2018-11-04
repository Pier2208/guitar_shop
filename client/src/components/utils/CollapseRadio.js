import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse,
    withStyles
} from '@material-ui/core'

//custom styles
const styles = {
    categoryName: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        color: '#47524D'
    },
    listItem: {
        fontSize: '1.3rem',
        textTransform: 'Capitalize',
        paddinLeft: '2rem'
    },
    list: {
        paddingLeft: '2rem'
    }
}


class CollapseRadio extends Component {

    state = {
        open: false,
        radioSelected: "0"
    }

    componentDidMount() {
        if(this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    
    toggleCollapse = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleRadioClick = e => {
        this.setState({
            radioSelected: e.target.value
        }, () => {
            this.props.updateFilters(this.state.radioSelected)
        })
    }


    renderList = (classes) => {
        if (this.props.list) {
            return this.props.list.map(item => (
                <FormControlLabel
                    key={item._id}
                    value={`${item._id}`}
                    control={<Radio style={{ color: "#9B9B9B" }} />}
                    label={item.name}
                    classes={{label: classes.listItem}}
                />
            ))
        }
    }

    render() {

        const { classes } = this.props

        return (
            <List>
                <ListItem onClick={this.toggleCollapse} >
                    <ListItemText primary={this.props.title} classes={{primary: classes.categoryName}} />
                    {this.state.open ?
                        <FontAwesomeIcon icon="angle-up" />
                        :
                        <FontAwesomeIcon icon="angle-down" />
                    }
                </ListItem>
                <Collapse
                    in={this.state.open}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding className={classes.list}>
                        <RadioGroup
                            aria-label="prices"
                            name="prices"
                            value={this.state.radioSelected}
                            onChange={this.handleRadioClick}
                        >
                            {this.renderList(classes)}
                        </RadioGroup>
                    </List>
                </Collapse>
            </List>
        )
    }
}

export default withStyles(styles)(CollapseRadio)
