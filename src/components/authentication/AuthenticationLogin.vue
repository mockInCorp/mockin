<template>
  <form method="post">
    <div class="form-field">
      <label for="email">{{ $t('authentication.login.email') }}</label>
      <input id="email" type="email" required />
    </div>
    <div class="form-field">
      <label for="password">
        <span>{{ $t('authentication.login.password') }}</span>
        <RouterLink :to="{ name: 'authentication', query: { type: 'passwordForgotten' } }"
          >Mot de passe oublié ?</RouterLink
        >
      </label>
      <input id="password" type="password" required />
    </div>
    <!-- <div class="form-field remember-me">
      <input id="remember-me" type="checkbox" />
      <label tabindex="0" for="remember-me">{{ $t('authentication.login.rememberMe') }}</label>
    </div> -->
    <BaseButton
      class="login-btn"
      icon="login"
      icon-position="right"
      :text="$t('authentication.login.confirm')"
      type="primary"
    />
  </form>
  <div class="other-choice">
    <span>
      {{ $t('authentication.login.otherChoice.0') }}
      <RouterLink :to="{ name: 'authentication', query: { type: 'register' } }">{{
        $t('authentication.login.otherChoice.1')
      }}</RouterLink>
    </span>
  </div>

  <div class="or-line">
    <span class="line" />
    <span class="text">{{ $t('authentication.login.or') }}</span>
  </div>
  <button @click="useGoogleProvider().authenticate" class="google-provider">
    <img src="/images/logo/google.webp" alt="google logo" />
    <span> {{ $t('authentication.login.connectWith') }} <span>Google</span></span>
  </button>
</template>

<script lang="ts" setup>
import useGoogleProvider from '@/composables/authProviders/useGoogleProvider'
import BaseButton from '../ui/BaseButton.vue'
import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

globalUtils.setPageTitle(t('authentication.login.title'))
</script>

<style scoped>
label[for='password'] {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    display: block;
  }
}
a {
  text-decoration: none;
  color: var(--primary);
  font-family: 'manrope-bold', sans-serif;
}
div.other-choice {
  margin-top: 1em;
  & > span,
  & > a {
    display: block;
    width: fit-content;
    margin: auto;
  }
}

div.or-line {
  width: 100%;
}
div.or-line {
  position: relative;
  margin: 1em auto;

  & > span.text {
    display: block;
    background-color: var(--white);
    position: relative;
    width: fit-content;
    margin: auto;
    z-index: 9;
    padding: 0 0.5em;

    text-transform: uppercase;

    font-family: 'manrope-bold', sans-serif;
    color: var(--gray-2);
  }
  & > span.line {
    width: 100%;
    height: 2px;

    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    background-color: var(--gray-3);
  }
}

button.login-btn {
  width: 100%;
  margin-top: 1.5em;
}

button.google-provider {
  display: block;

  font-family: 'manrope-medium', sans-serif;
  font-size: 1em;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5em;

  width: 100%;

  background-color: transparent;
  cursor: pointer;

  border-radius: 100px;
  border: 1px solid var(--primary);
  padding: 0.3em 1em;
  color: var(--primary);

  &:focus {
    outline: 2px dashed var(--primary);
    outline-offset: 4px;
  }

  & > span > span {
    font-family: 'manrope-bold', sans-serif;
  }

  & > img {
    width: 2em;
  }
}
</style>
