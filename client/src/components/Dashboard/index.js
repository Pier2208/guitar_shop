import React, { Component } from 'react'
import DashboardLayout from '../UI/HOC/DashboardLayout'


class Dashboard extends Component {
  render() {
    console.log('dashboard', this.props)
    return (
      <DashboardLayout>
        VIEW
      </DashboardLayout>
    )
  }
}

export default Dashboard
