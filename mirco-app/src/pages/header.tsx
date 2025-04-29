import React, {useEffect} from "react";
import {Image} from "antd";
import apple from "@/assets/apple.jpg";


interface HeaderProps {
    title?: string,
    onClick?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const [title, setTitle] = React.useState<string>('Header Component');

    useEffect(() => {
        if (props.title) {
            setTitle(props.title);
        }
    }, [props.title]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <h1>{title}</h1>

            <Image
                style={{
                    margin: 10,
                    width: 500,
                }}
                src={apple}
                preview={!props.onClick}
                onClick={() => {
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
            />
        </div>
    )
}

export default Header;
