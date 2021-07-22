import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Home() {
    return (
        <>
            Welcome to PrestaLy
            Please login to :
            <div>
                Login
                <Button component={Link} to='/login'>Login</Button>
            </div>
        </>
    )
}

export default Home
