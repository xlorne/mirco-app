import React, {FC, lazy, Suspense} from 'react';
import {HeaderProps} from "@/gateway";

const Header: FC<HeaderProps> = lazy(() => {
    // @ts-ignore
    return import('MircoApp/Header');
});

const RemotePage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '50px',
        }}>
            <h1>Load Remote Component Page</h1>

            <Suspense fallback={<div>Loading Header...</div>}>
                <Header title={"Remote Component Header"} onClick={()=>{
                    alert('click')
                }}/>
            </Suspense>
        </div>
    )
}

export default RemotePage;
