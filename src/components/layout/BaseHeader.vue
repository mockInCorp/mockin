<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref } from 'vue'

const isResponsiveMenuToggled = ref(false)

const headerRef = ref<HTMLElement | undefined>(undefined)
const headerSticky = ref<boolean>(false)

// onMounted(() => {
//   const headerHeight = headerRef.value!.offsetHeight

//   window.addEventListener('scroll', () => {
//     headerSticky.value = window.scrollY >= headerHeight
//   })
// })

// TODO propper sticky header
</script>

<template>
  <header :class="{ sticky: headerSticky }" ref="headerRef">
    <nav :style="{ top: !headerSticky ? '-10em' : '0' }">
      <RouterLink :to="{ name: 'home' }">
        <img src="/images/logo/logo.svg" alt="logo" />
      </RouterLink>
      <ul>
        <li>
          <RouterLink :to="{ name: 'home' }">{{ $t('header.nav.home') }}</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'home', hash: '#features' }">{{
            $t('header.nav.features')
          }}</RouterLink>
        </li>
        <!-- <li>
          <RouterLink :to="{ name: 'home', hash: '#prices' }">{{
            $t('header.nav.prices')
          }}</RouterLink>
        </li> -->
        <li>
          <RouterLink :to="{ name: 'home', hash: '#support' }">{{
            $t('header.nav.support')
          }}</RouterLink>
        </li>
      </ul>
      <ul>
        <li>
          <BaseButton :link="{ name: 'authentication' }" :text="$t('header.nav.login')" />
        </li>
      </ul>
    </nav>
    <nav :style="{ top: !headerSticky ? '-10em' : '0' }" class="responsive">
      <RouterLink :to="{ name: 'home' }">
        <img src="/images/logo/logo.svg" alt="logo" />
      </RouterLink>
      <BaseButton
        @click="isResponsiveMenuToggled = !isResponsiveMenuToggled"
        text="MENU"
        icon="menu"
        type="thirdery"
        class="menu-btn"
        :icon-size="33"
      />

      <div :class="{ active: isResponsiveMenuToggled }" class="menu">
        <div class="header">
          <RouterLink :to="{ name: 'home' }">
            <img src="/images/logo/logo.svg" alt="logo" />
          </RouterLink>
          <BaseButton
            :icon-size="50"
            @click="isResponsiveMenuToggled = false"
            type="thirdery"
            icon="close"
          />
        </div>
        <nav>
          <ul>
            <li>
              <RouterLink :to="{ name: 'home' }">{{ $t('header.nav.home') }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'home', hash: '#features' }">{{
                $t('header.nav.features')
              }}</RouterLink>
            </li>
            <!-- <li>
              <RouterLink :to="{ name: 'home', hash: '#prices' }">{{
                $t('header.nav.prices')
              }}</RouterLink>
            </li> -->
            <li>
              <RouterLink :to="{ name: 'home', hash: '#support' }">{{
                $t('header.nav.support')
              }}</RouterLink>
            </li>
          </ul>
        </nav>
        <!-- <BaseButton :link="{ name: 'home' }" :text="$t('header.nav.login')" /> -->
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  margin: 0 3em;
  padding-top: 1em;

  &.sticky > nav:not(.responsive) {
    width: 100%;
    position: fixed;
    top: -5em;
    left: 0;
    padding: 0.5em 2em;

    backdrop-filter: blur(24px);
    background-color: #f7f8fd99;
    z-index: 999;

    transition: all 0.3s ease;
  }

  nav:not(.responsive) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      display: flex;
      align-items: center;
      gap: 2em;
      list-style: none;

      a {
        text-decoration: none;
        color: var(--black-1);
        transition: all 0.3s ease;
        font-family: 'manrope-medium', sans-serif;

        &:is(:hover, .active) {
          color: var(--primary);
        }
        &.active {
          font-family: 'manrope-bold', sans-serif;
        }
      }
    }
  }

  nav.responsive {
    display: none;
    align-items: center;
    justify-content: space-between;

    & button.menu-btn {
      font-size: 1.4em;
    }

    & > div.menu {
      position: fixed;
      top: 0;
      left: -100em;
      z-index: 99;
      transition: left 0.5s ease;
      &.active {
        left: 0;
      }

      backdrop-filter: blur(24px);
      background-color: #f7f8fd99;
      width: 100%;
      height: 100vh;

      & > div.header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2em 3em;
      }

      & > nav {
        font-size: 1.5em;
        padding-top: 1em;
        padding-left: 2em;
      }
      & > a * {
        font-size: 1.2em;
      }

      & > a {
        width: fit-content;
        display: block;
        margin-left: 2.5em;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      margin-bottom: 2em;

      a {
        &:is(:hover, .active) {
          color: var(--primary);
        }
        &.active {
          font-family: 'manrope-bold', sans-serif;
        }
      }
    }
  }
}

@media screen and (max-width: 801px) {
  header {
    & > nav.responsive {
      display: flex;
    }
    & > nav:not(.responsive) {
      display: none !important;
    }
  }
}
</style>
