import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getUserPage } from './api/axios'
import User from './User'
import PageButton from './PageButton'
const Example2 = () => {
    const [page, setPage] = useState(1)

    const {
        isLoading,
        isError,
        data: users,
        isFetching,
        isPreviousData
    } = useQuery(['/users', page], () => getUserPage(page), {
        keepPreviousData: true
    })

    if (isLoading) return <p>Loading Users...</p>

    if (isError) return <p>Error::{error.message}</p>

    const content = users.data.map(user => <User key={user.id} user={user} />)

    const lastPage = () => setPage(users.total_pages)

    const firstPage = () => setPage(1)

    const pagesArray = Array(users.total_pages).fill().map((_, index) => index + 1)

    const nav = (
        <nav className='nav-ex2'>
            <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData}></PageButton>)}
            <button onClick={lastPage} disabled={isPreviousData || page === users.total_pages}>&gt;&gt;</button>
        </nav>
    )
    return (
        <>
            {nav}
            {isFetching && <span className='loading'>Loading...</span>}
            {content}
        </>
    )
}

export default Example2
