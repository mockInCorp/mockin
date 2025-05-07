<script setup lang="ts">
import HomeHeroHeader from '@/components/home/HomeHeroHeader.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeSupport from '@/components/home/HomeSupport.vue'

import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()

globalUtils.setPageTitle(t('home.pageTitle'))

onMounted(() => {
  const sections = ['hero-header', 'features', 'prices', 'support'].map((id) =>
    document.querySelector(`#${id}`),
  )
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        const navItems = document.querySelectorAll(`a[href="/#${id}"]`)
        for (const navItem of navItems) {
          if (navItem) {
            if (entry.isIntersecting) {
              navItem!.classList.add('active')
            } else {
              navItem!.classList.remove('active')
            }
          }
        }
      })
    },
    { threshold: 0.5 },
  )
  sections.filter((s) => !!s).forEach((section) => observer.observe(section!))
})
</script>

<template>
  <HomeHeroHeader />
  <HomeFeatures />
  <HomeSupport />
</template>
