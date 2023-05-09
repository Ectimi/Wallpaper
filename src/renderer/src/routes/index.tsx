import { RefObject, createRef } from 'react';
import {
  RouteObject,
  useLocation,
  createHashRouter,
  useOutlet,
  RouterProvider,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { AppLayout } from '@/components/AppLayout';
import { Prefab } from '@/pages/Prefab';
import { List } from '@/pages/List';
import './index.less';

type RouteItem = RouteObject & { nodeRef: RefObject<any> };
const routes: RouteItem[] = [
  {
    path: '/',
    element: <Prefab />,
    nodeRef: createRef(),
  },
  {
    path: '/list/:type',
    element: <List />,
    nodeRef: createRef(),
  },
];

const router = createHashRouter([
  {
    path: '/',
    element: <AppRoutes />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function AppRoutes() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <AppLayout>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <div ref={nodeRef} className="page">
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </AppLayout>
  );
}

export default () => <RouterProvider router={router} />;
