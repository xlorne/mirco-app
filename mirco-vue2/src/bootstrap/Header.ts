import Vue from 'vue';
import HeaderVue from '../views/Header.vue';

export function Header(el: HTMLElement, props: Record<string, any>) {
    const vm = new Vue({
        render: (h) => h(HeaderVue, {props}),
    }).$mount(el);

    return () => {
        vm.$destroy();
        if (el) {
            el.innerHTML = '';
        }
    };
}
