import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
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
        cursor: 'pointer'
    }
}


class CollapseCheckbox extends Component {

    state = {
        open: false,
        itemsChecked: []
    }

    //checkbox can be either opened or closed on page load
    //if props initState exists, set the state of checkbox to open/close
    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    //function to toggle the checkbox on click
    toggleCollapse = () => {
        this.setState({ open: !this.state.open })
    }

    //function that handles the click/unclick of checkboxes
    handleToggle = item => () => {
        //do not mutate state, make a copy
        const newItemsChecked = this.state.itemsChecked
        //get the index of the item
        const itemIndex = newItemsChecked.indexOf(item)
        //if index === -1 --> the checkbox is unchecked, so add the item
        if (itemIndex === -1) {
            newItemsChecked.push(item)
        } else {
            //if index >= 0, the checkbox is checked so remove the item
            newItemsChecked.splice(itemIndex, 1)
        }
        //update the state
        this.setState({
            itemsChecked: newItemsChecked
        }, () => {
            //pass new set of filters to parent shop component
            this.props.updateFilters(newItemsChecked)
        })
    }

//function to render list of brand checkbox items
renderList = (classes) => {
    //if a prop list has been passed in
    if (this.props.list) {
        return this.props.list.map(item => (
            <ListItem
                onClick={this.handleToggle(item._id)}
                key={item._id}>
                <ListItemText 
                    classes={{primary: classes.listItem}}
                    primary={item.name}
                />
                <ListItemSecondaryAction>
                    <Checkbox
                        style={{ color: "#9B9B9B" }}
                        onChange={this.handleToggle(item._id)}
                        checked={this.state.itemsChecked.indexOf(item._id) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ))
    }
}

render() {

    const { classes } = this.props

    return (
        <List style={{ borderBottom: '1px solid #F7F7F2'}}>
            <ListItem onClick={this.toggleCollapse}>
                <ListItemText
                    classes={{primary: classes.categoryName}}
                    primary={this.props.title}
                />
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
                    {this.renderList(classes)}
                </List>
            </Collapse>
        </List>
    )
}
}

export default withStyles(styles)(CollapseCheckbox)