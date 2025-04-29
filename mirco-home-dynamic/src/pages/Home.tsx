import React from "react";
import {useNavigate} from "react-router";
import {Button, Space} from "antd";
import {useRoutesContext} from "@/config/routes";

const HomePage = () => {
    const navigate = useNavigate();

    const {removeRoute, addDynamicComponentRoute, addPageRoute} = useRoutesContext();

    const handlerDynamic = () => {
        navigate('/remote');
    }

    const handlerGoLocal = () => {
        navigate('/local');
    }

    const handlerRemoveLocal = () => {
        removeRoute('/local');
    }

    const handlerAddLocalPage = () => {
        addPageRoute({
            path: '/local',
            pageName: 'Local'
        });
    }

    const handlerAddDynamicHello = () => {
        addDynamicComponentRoute({
            path: "/local",
            remoteUrl: "http://localhost:3000/remoteEntry.js",
            scope: "MircoApp",
            module: "./Header"
        });
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
            Home Dynamic Remote Component Page
            <Space>
                <Button onClick={handlerAddLocalPage}>add local page </Button>
                <Button onClick={handlerGoLocal}>go local page</Button>
                <Button onClick={handlerRemoveLocal}>remove local page</Button>
            </Space>
            <Space>
                <Button onClick={handlerDynamic}>go remote component</Button>
            </Space>
            <Space>
                <Button onClick={handlerAddDynamicHello}>add remote component to local page</Button>
            </Space>
        </div>
    )
}

export default HomePage;
