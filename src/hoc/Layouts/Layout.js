import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Toolbar/Toolbar'
import SideBar from '../../components/Navigation/SideBar/SideBar'

class Layout extends Component {
    state = {
        showSideBar: false
    }
    sideBarAction = () => {
        this.setState((prevState) => {
            return {
                showSideBar: !prevState.showSideBar
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar openSideBar={this.sideBarAction} />
                <SideBar open={this.state.showSideBar} closed={this.sideBarAction} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;