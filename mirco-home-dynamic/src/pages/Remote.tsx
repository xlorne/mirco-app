import React, {Suspense, useRef, useState} from 'react';
import {Button, Space} from "antd";
import {loadRemoteComponent, loadRemoteScript} from '@/utils/dynamicLoader';
import {ModalForm, ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {HeaderProps} from "@/gateway";

const RemotePage = () => {

    const [RemoteReactComponent, setRemoteReactComponent] = useState<(React.ComponentType<HeaderProps>) | null>(null);

    const unmountFn = useRef<(() => void) | null>(null);

    const [visible, setVisible] = useState(false);

    const [form] = ProForm.useForm();

    const containerRef = React.useRef<HTMLDivElement>(null);

    const destroyRemoteComponent = () => {
        if(containerRef.current){
            containerRef.current.innerHTML = '';
        }
        unmountFn.current?.();
        setRemoteReactComponent(null);
    }

    const handlerLoadComponent = async (values: any) => {
        const {remoteUrl, scope, module, type} = values;
        loadRemoteScript(remoteUrl).then(() => {
            loadRemoteComponent(scope, module).then((ComponentModule: any) => {
                destroyRemoteComponent();

                console.log('ComponentModule', ComponentModule);
                if (type === 'react') {
                    const Component = ComponentModule.default || ComponentModule;
                    setRemoteReactComponent(() => Component);
                }

                if (type === 'vue2') {
                    const mountFn = Object.values(ComponentModule)[0] as any;
                    const destroyFn = mountFn(containerRef.current, {
                        title: "vue2 Header",
                        onClick: () => {
                            alert('vue2 click')
                        }
                    });
                    unmountFn.current = typeof destroyFn === 'function' ? destroyFn : null;
                    console.log('destroyFn:', unmountFn.current)
                    setRemoteReactComponent(null);
                }

                if (type === 'vue3') {
                    const mountFn = Object.values(ComponentModule)[0] as any;
                    const destroyFn = mountFn(containerRef.current, {
                        title: "vue3 Header",
                        onClick: () => {
                            alert('vue3 click')
                        }
                    });
                    unmountFn.current = typeof destroyFn === 'function' ? destroyFn : null;
                    console.log('destroyFn:', unmountFn.current)
                    setRemoteReactComponent(null);
                }
            });
        }).catch(ignore => {
        });
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
            {RemoteReactComponent && (
                <Suspense fallback={<div>Loading Header...</div>}>
                    <RemoteReactComponent
                        title={"React Header"}
                        onClick={() => {
                            alert('react click');
                        }}
                    />
                </Suspense>
            )}

            <div ref={containerRef}></div>

            <Space>
                <Button
                    onClick={() => {
                        form.setFieldsValue({
                            remoteUrl: "http://localhost:3000/remoteEntry.js",
                            scope: "MircoApp",
                            module: "./Header",
                            type: 'react'
                        })
                        setVisible(true);
                    }}
                >load remote component</Button>
                <Button
                    onClick={() => {
                        destroyRemoteComponent();
                    }}>
                    remove remote component
                </Button>
            </Space>

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
                            label: 'react',
                            value: 'react'
                        },
                        {
                            label: 'vue2',
                            value: 'vue2'
                        },
                        {
                            label: 'vue3',
                            value: 'vue3'
                        }
                    ]}
                    onChange={(value, option) => {
                        if (value === 'react') {
                            form.setFieldsValue({
                                scope: "MircoApp",
                                remoteUrl: "http://localhost:3000/remoteEntry.js",
                            })
                        }
                        if (value === 'vue2') {
                            form.setFieldsValue({
                                scope: "MircoVue2",
                                remoteUrl: "http://localhost:4000/remoteEntry.js",
                            })
                        }
                        if (value === 'vue3') {
                            form.setFieldsValue({
                                scope: "MircoVue3",
                                remoteUrl: "http://localhost:9000/remoteEntry.js",
                            })
                        }
                    }}
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

export default RemotePage;

