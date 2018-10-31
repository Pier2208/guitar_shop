import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse
} from '@material-ui/core'


class CollapseRadio extends Component {

    state = {
        open: false,
        radioSelected: "0"
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


    renderList = () => {
        if (this.props.list) {
            return this.props.list.map(item => (
                <FormControlLabel
                    key={item._id}
                    value={`${item._id}`}
                    control={<Radio style={{ color: "#f08f65" }} />}
                    label={item.name}
                />
            ))
        }
    }

    render() {

        return (
            <List style={{ borderBottom: '1px solid #F7F7F2' }}>
                <ListItem onClick={this.toggleCollapse}>
                    <ListItemText primary={this.props.title} />
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
                    <List component="div" disablePadding>
                        <RadioGroup
                            aria-label="prices"
                            name="prices"
                            value={this.state.radioSelected}
                            onChange={this.handleRadioClick}
                        >
                            {this.renderList()}
                        </RadioGroup>
                    </List>
                </Collapse>
            </List>
        )
    }
}

export default CollapseRadio
