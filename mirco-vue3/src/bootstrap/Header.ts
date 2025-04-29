import {createApp, h} from 'vue';
import HeaderView from '../views/Header.vue';

export function Header(el: HTMLElement, props: Record<string, any>) {
    const mountEl = document.createElement('div');
    el.appendChild(mountEl);

    const app = createApp({
        render: () => h(HeaderView, props),
    });

    app.mount(mountEl);

    return () => {
        app.unmount();
        if (mountEl.parentNode) {
            mountEl.parentNode.removeChild(mountEl);
        }
    };
}
