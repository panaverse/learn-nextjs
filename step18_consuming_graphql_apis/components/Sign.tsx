import { NextPage } from 'next'
import React from 'react'
import { Sign } from '../pages'

const Sign: NextPage<Sign> = (props) => {
    const {content, country, created_at, nickname, uuid} = props;
  return (
    <div style={{border: "1px solid black", margin: "5px 0px", padding: "5px"}}>
        <div>Name: {nickname}</div>
        <div>From: {country}</div>
        <div>content: {content}</div>
    </div>
  )
}

export default Sign