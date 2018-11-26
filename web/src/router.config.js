import dynamic from 'dva/dynamic';

function dynamicWrapper(app, models, component) {
  return dynamic({
    app,
    models: () => models.map(m => import(`./models/${m}.js`)),
    component,
  });
}

// 路由配置
export default app => [
  {
    component: dynamicWrapper(app, [], () => import('./layouts/UserLayout')),
    path: 'user',
    layout: 'UserLayout',
    children: [
      {
        path: 'user',
        children: [
          {
            name: '用户登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('./routes/Login/Index')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('./layouts/AdminLayout')),
    path: '',
    layout: 'AdminLayout',
    children: [
      {
        path: 'system',
        children: [
          {
            name: '菜单管理',
            path: 'menu',
            component: dynamicWrapper(app, ['menu'], () => import('./routes/Menu/MenuList')),
          },
          {
            name: '角色管理',
            path: 'role',
            component: dynamicWrapper(app, ['menu', 'role'], () =>
              import('./routes/Role/RoleList')
            ),
          },
        ],
      },
    ],
  },
];
