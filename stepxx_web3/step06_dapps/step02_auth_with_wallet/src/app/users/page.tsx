import React from 'react'

const getUsers = async () => {
    const res = await fetch(`http://localhost:3000/api/user`, {
        cache: 'no-cache'
    })
    return res.json();
}

const UsersPage = async () => {
    const users = await getUsers();
    console.log("users", users)
    return (
        <div className='px-1.5 md:px-12 lg:px-20'>
            <h1 className='font-semibold text-4xl'>Users</h1>
            {
                users.map((item: any) => (
                    <p>{item.publicAddress}</p>
                ))
            }
        </div>
    )
}

export default UsersPage