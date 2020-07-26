import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const TogglableVisibility = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    TogglableVisibility.propTypes = {
        buttonTitle: PropTypes.string.isRequired
    }

    const hideOnVisible = { display: visible ? 'none' : '' }
    const showOnVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hideOnVisible}>
                <button
                    type='button'
                    onClick={toggleVisibility}>
                    {props.buttonTitle}
                </button>
            </div>
            <div style={showOnVisible} className="togglableContent">
                {props.children}
                <button
                    type='button'
                    onClick={toggleVisibility}>
                    Cancel
            </button>
            </div>
        </>
    )
})

export default TogglableVisibility