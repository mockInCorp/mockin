import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InterviewView from '@/views/InterviewView.vue'
import TermsAndConditionsView from '@/views/legal/TermsAndConditionsView.vue'
import PrivacyPolicyView from '@/views/legal/PrivacyPolicyView.vue'
import LegalMentions from '@/views/legal/LegalMentions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/legal',
      children: [
        {
          path: 'terms-and-conditions',
          name: 'legal.terms-and-conditions',
          component: TermsAndConditionsView,
        },
        {
          path: 'privacy-policy',
          name: 'legal.privacy-policy',
          component: PrivacyPolicyView,
        },
        {
          path: 'legal-mentions',
          name: 'legal.legal-mentions',
          component: LegalMentions,
        },
      ],
    },
    {
      path: '/interview',
      name: 'interview',
      component: InterviewView,
      //meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _, next) => {
  // if (to.meta.requiresAuth) {
  //   return next({ name: 'login' })
  // }
  next()
})

export default router
