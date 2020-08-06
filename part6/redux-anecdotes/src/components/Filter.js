import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
    const anecdotes = props.anecdotes

    const handleChange = (event) => {
        event.preventDefault()
        const searchFor = event.target.value
        props.filterAnecdotes(
            {
                anecdotes: anecdotes,
                searchFor: searchFor
            }
        )
    }

    const style = {
        marginBotton: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    filterAnecdotes,
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter