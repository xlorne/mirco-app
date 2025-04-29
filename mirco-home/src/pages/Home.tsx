import React from "react";
import {useNavigate} from "react-router";
import {Button} from "antd";

const Home = () => {
    const navigate = useNavigate();

    const handlerRemote = () => {
        navigate('/remote');
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '50px',
            }}
        >
            Home Static Remote Component Page
            <Button onClick={handlerRemote}>go remote component page</Button>
        </div>
    )
}

export default Home;
