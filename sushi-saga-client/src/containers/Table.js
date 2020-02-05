import React, { Fragment } from 'react'

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div className="empty-plate" key={index} style={{ top: -7 * index }}/>
    })
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have <span style={{color: "green"}}>$</span><span style={{color: "red"}}>{props.balance}</span> remaining!
      </h1>
      <div className="table">
        <div className="stack">
          { renderPlates([...props.eatenSushis]) }
        </div>
      </div>
    </Fragment>
  )
}

export default Table