import Link from 'next/link'
import React from 'react'
import Counter from './Counter'
import Users from './Users'

const NavBar = () => {
  return (
    <div>

      <nav style={{ display: "flex", }}>
        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Link href="/users">
            <a>UsersPage</a>
          </Link>
        </div>

        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Link href="/counter">
            <a>CounterPage</a>
          </Link>
        </div>

        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Link href="/serverSideCounter">
            <a>SSRCounter</a>
          </Link>
        </div>

        <div style={{ marginRight: "20px", cursor: "pointer" }}>
          <Link href="/serverSideUser">
            <a>SSRUser</a>
          </Link>
        </div>

      </nav>

      <div style={{ border: "1px solid #cccccc", marginTop: "20px" }}>
        <Counter />
        <Users />
      </div>


    </div>
  )
}

export default NavBar