import React from 'react'

const layout = ({ children }: any) => {
    return (
        <div className='p-4 bg-red-500'>
            {children}
        </div>
    )
}

export default layout