import React, { Fragment, useState, useRef } from 'react'
import BottomTabs from './Navigations/BottomTabs';

const Main = ({ navigation }) => {


  return (
    <Fragment>

      <BottomTabs navigation={navigation} />

    </Fragment>
  )
}

export default Main

