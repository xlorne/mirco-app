import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Button} from "antd";
import {loadRemoteComponent, loadRemoteScript} from '@/utils/dynamicLoader';
import {ModalForm, ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {HeaderProps} from "@/gateway";

const RemotePage = () => {

    const [RemoteReactComponent, setRemoteReactComponent] = useState<(React.ComponentType<HeaderProps>) | null>(null);


    const unmountFn = useRef<(() => void) | null>(null);

    const [visible, setVisible] = useState(false);

    const [form] = ProForm.useForm();

    const containerRef = React.useRef<HTMLDivElement>(null);

    const handlerLoadComponent = async (values: any) => {
        const {remoteUrl, scope, module, type} = values;
        loadRemoteScript(remoteUrl).then(() => {
            loadRemoteComponent(scope, module).then((ComponentModule: any) => {
                console.log('ComponentModule', ComponentModule);
                unmountFn.current?.();
                if (containerRef.current) {
                    containerRef.current.innerHTML = ''; // 清理 Vue 上次挂载的 DOM
                }
                if (type === 'react') {
                    const Component = ComponentModule.default || ComponentModule;
                    setRemoteReactComponent(()=>Component);
                }

                if (type === 'vue2') {
                    const mountFn = Object.values(ComponentModule)[0] as any;
                    const destroyFn = mountFn(containerRef.current, {
                        title: "vue2 Header",
                        onClick: () => {
                            alert('vue2 click')
                        }
                    });
                    console.log('destroyFn:',destroyFn)
                    unmountFn.current = typeof destroyFn === 'function' ? destroyFn : null;
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
                    console.log('destroyFn:',destroyFn)
                    unmountFn.current = typeof destroyFn === 'function' ? destroyFn : null;
                    setRemoteReactComponent(null);
                }
            });
        }).catch(ignore => {
        });
        setVisible(false);
    }

    useEffect(() => {
        return () => {
            unmountFn.current?.();
            setRemoteReactComponent(null);
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

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

            {!RemoteReactComponent && <div ref={containerRef}></div>}

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

