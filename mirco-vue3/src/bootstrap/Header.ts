import { createApp, h } from 'vue';
import HeaderView from '../views/Header.vue';

export function Header(el: HTMLElement, props: Record<string, any>) {
  const app = createApp({
    render: () => h(HeaderView, props),
  });
  app.mount(el);
  return () => {
    app.unmount();
    el.innerHTML = '';
  };
}

