import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        { props.sushis.map((sushi, i) => {
          return <Sushi key={i} sushi={sushi} handleSushiClick={props.handleSushiClick} />
        })}
        <MoreButton handleMoreClick={props.handleMoreClick} />
      </div>
    </Fragment>
  )
}

export default SushiContainer