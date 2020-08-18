import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './logoutButton'

const padding = {
    padding: 5
}
const NavigationBar = () => {
    return (
        <header>
            <nav className="navbar">
                <Link style={padding} to='/'>home</Link>
                <Link style={padding} to='/users'>users</Link>
                <LogoutButton />
            </nav>
        </header>
    )
}

export default NavigationBar