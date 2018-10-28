import React, { Component } from 'react'
import DashboardLayout from '../UI/HOC/DashboardLayout'


class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <DashboardLayout>
        VIEW for mister {this.props.user.userInfo.firstname}
      </DashboardLayout>
    )
  }
}

export default Dashboard
