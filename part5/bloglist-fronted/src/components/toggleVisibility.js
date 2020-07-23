import React, { useState, useImperativeHandle } from 'react'

const TogglableVisibility = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

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
            <div style={showOnVisible}>
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