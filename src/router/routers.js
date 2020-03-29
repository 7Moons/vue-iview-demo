import Layout from '@/views/Layout'

export default [{
    path: '/',
    name: 'home',
    meta: {
      hideInBread: true
    },
    component: Layout,
    children: [
      {
        path: 'home_page',
        name: 'home_page',
        meta: {
          title: 'Home'
        },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'form',
    meta: {
      hideInBread: true
    },
    component: Layout,
    children: [
      {
        path: 'form_page',
        name: 'form_page',
        meta: {
          title: 'Form'
        },
        component: () => import('@/views/FormPage.vue')
      }
    ]
  },
{
    path: '/',
    name: 'about',
    meta: {
      hideInBread: true
    },
    component: Layout,
    children: [
      {
        path: 'about_page',
        name: 'about_page',
        meta: {
          title: 'About'
        },
        component: () => import('@/views/About.vue')
      }
    ]
  }]