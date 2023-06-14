import { RefObject, createRef,useRef,Children,cloneElement } from 'react';
import {
  RouteObject,
  useLocation,
  createHashRouter,
  useOutlet,
  RouterProvider,
} from 'react-router-dom';
import { CSSTransition as _CSSTransition , SwitchTransition } from 'react-transition-group';
import { AppLayout } from '@/components/AppLayout';
import { Prefab } from '@/pages/Prefab';
import {Detail} from '@/pages/Detail'
import { List } from '@/pages/List';
import {Favorite} from "@/pages/Favorite";
import {Random} from "@/pages/Random";
import {Search} from "@/pages/Search";
import {Collect} from "@/pages/Collect";
import {About} from "@/pages/About";
import {Setting} from '@/pages/Setting'
import './index.less';

type RouteItem = RouteObject & { nodeRef: RefObject<any> };
const routes: RouteItem[] = [
  {
    path: '/',
    element: <Prefab />,
    nodeRef: createRef(),
  },
  {
    path: '/detail',
    element: <Detail />,
    nodeRef: createRef(),
  },
  {
    path: '/list/:type',
    element: <List />,
    nodeRef: createRef(),
  },
  {
    path: '/favorite',
    element: <Favorite />,
    nodeRef: createRef(),
  },
  {
    path: '/random',
    element: <Random />,
    nodeRef: createRef(),
  },
  {
    path: '/search',
    element: <Search />,
    nodeRef: createRef(),
  },
  {
    path: '/collect',
    element: <Collect />,
    nodeRef: createRef(),
  },
  {
    path: '/about',
    element: <About />,
    nodeRef: createRef(),
  },
  {
    path: '/setting',
    element: <Setting />,
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

//解决 react-transition-group出现的警告 ”findDOMNode is deprecated in StrictMode"
const CSSTransition = (props: any) => {
  const nodeRef = useRef(null);

  return (
      <_CSSTransition {...props} nodeRef={nodeRef}>
        <>
          {Children.map(props.children, (child) => cloneElement(child, { ref: nodeRef }))}
        </>
      </_CSSTransition>
  );
};

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
