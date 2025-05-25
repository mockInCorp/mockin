<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthenticationStore } from '@/stores/authentication'
import globalUtils from '@/utils/global.utils'

import BaseButton from '@/components/ui/BaseButton.vue'

const isResponsiveMenuToggled = ref(false)

const headerRef = ref<HTMLElement | undefined>(undefined)
const headerSticky = ref<boolean>(false)

const isToggled = ref<boolean>(false)

const profileRef = ref<HTMLElement | undefined>(undefined)

const { isAuthenticated, me } = storeToRefs(useAuthenticationStore())

const isClickingOutside = (event: Event) => {
  globalUtils.isClickingOutside(event.target as HTMLElement, profileRef.value!, (isFound) => {
    if (!isFound) {
      isToggled.value = false
    }
  })
}

onMounted(() => {
  window.addEventListener('click', isClickingOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', isClickingOutside)
})

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
        <template v-if="!isAuthenticated">
          <li>
            <BaseButton :link="{ name: 'authentication' }" :text="$t('header.nav.login')" />
          </li>
        </template>
        <template v-else>
          <li ref="profileRef" class="profile">
            <div tabindex="0" class="profile-section" @click="isToggled = !isToggled">
              {{ me?.givenName }} {{ me?.familyName.substring(0, 1) }}.
              <span class="logo">{{
                globalUtils.extractInitials(`${me?.givenName} ${me?.familyName}`)
              }}</span>
              <mdicon name="chevron-down" />
            </div>

            <ul v-show="isToggled">
              <li>
                <RouterLink :to="{ name: 'home' }">
                  {{ $t('header.profile.myProfile') }}
                </RouterLink>
              </li>
              <li tabindex="0" @click="useAuthenticationStore().disconnect" class="disconnect">
                <span>{{ $t('header.profile.disconnect') }}</span>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>

    <!-- TODO: ajouter la section profil dans la navbar responsive -->
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

li.profile {
  position: relative;

  & > div.profile-section {
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 0.5em;

    background-color: var(--gray-4);
    padding: 0.5em 0.8em;
    border-radius: 100px;
    user-select: none;

    & > span.logo {
      background-color: var(--primary);
      padding: 0.5em 0;
      width: 2.8em;
      text-align: center;
      color: var(--white);
      padding: 0.6em 0.5em;
      border-radius: 100px;
      font-family: 'manrope-bold', sans-serif;
      user-select: none;
    }
  }

  & > ul {
    position: absolute;
    bottom: -5.5em;
    left: 0;
    box-shadow: var(--shadow-settings-1);
    width: 100%;
    border-radius: 10px;

    flex-direction: column;
    gap: 0 !important;

    & > li {
      width: 100%;
      text-align: center;
      transition: all 0.5s ease;
      user-select: none;
      cursor: pointer;

      a,
      span {
        display: block;
        padding: 0.5em 0.8em;
      }

      &:first-of-type {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      &:last-of-type {
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &.disconnect:hover {
        background-color: var(--red);
        color: var(--white);
      }

      &:hover {
        background-color: var(--primary);
        & > a {
          color: var(--white) !important;
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
