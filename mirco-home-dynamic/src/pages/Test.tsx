import React, {Suspense, useState} from 'react';
import {Button} from "antd";
import {loadRemoteComponent, loadRemoteScript} from '@/utils/dynamicLoader';
import {ModalForm, ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";

const Test = () => {

    const [RemoteTestComponent, setRemoteTestComponent] = useState<React.ComponentType | null>(null);

    const [visible, setVisible] = useState(false);

    const [form] = ProForm.useForm();

    const contanierRef = React.useRef<HTMLDivElement>(null);

    const handlerLoadComponent = async (values: any) => {
        const {remoteUrl, scope, module,type} = values;
        loadRemoteScript(remoteUrl).then(() => {
            loadRemoteComponent(scope, module).then((ComponentModule: any) => {
                console.log('ComponentModule',ComponentModule);

                if(type ==='react'){
                    const Component = ComponentModule.default || ComponentModule;
                    setRemoteTestComponent(Component);
                }

                if(type ==='vue2'){
                    const Component = Object.values(ComponentModule)[0] as any;
                    Component(contanierRef.current,{title:"asd",onClick:()=>{
                        alert('xxx')
                    }});
                }
            });
        }).catch(ignore => {});
        setVisible(false);
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
            {RemoteTestComponent && (
                <Suspense fallback={<div>Loading Header...</div>}>
                    <RemoteTestComponent/>
                </Suspense>
            )}

            <div ref={contanierRef}></div>

            <Button
                onClick={() => {
                    form.setFieldsValue({
                        remoteUrl: "http://localhost:3000/remoteEntry.js",
                        scope: "MircoApp",
                        module: "./Header",
                        type:'react'
                    })
                    setVisible(true);
                }}
            >load remote component</Button>

            <ModalForm
                title={"load remote component"}
                open={visible}
                form={form}
                modalProps={{
                    onCancel: () => {
                        setVisible(false);
                    },
                    destroyOnClose: true
                }}
                onFinish={handlerLoadComponent}
            >

                <ProFormSelect
                    label={"type"}
                    name={"type"}
                    options={[
                        {
                            label:'react',
                            value:'react'
                        },
                        {
                            label:'vue2',
                            value:'vue2'
                        }
                    ]}
                    rules={[
                        {
                            required: true,
                            message: "type is required"
                        }
                    ]}
                />


                <ProFormText
                    label={"remoteUrl"}
                    name={"remoteUrl"}
                    rules={[
                        {
                            required: true,
                            message: "remoteUrl is required"
                        }
                    ]}
                />

                <ProFormText
                    label={"scope"}
                    name={"scope"}
                    rules={[
                        {
                            required: true,
                            message: "scope is required"
                        }
                    ]}
                />

                <ProFormText
                    label={"module"}
                    name={"module"}
                    rules={[
                        {
                            required: true,
                            message: "module is required"
                        }
                    ]}
                />

            </ModalForm>

        </div>
    )
}

export default Test;

