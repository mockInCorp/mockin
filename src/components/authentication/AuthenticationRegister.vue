<template>
  <form method="post">
    <div class="form-field">
      <label for="email" class="required">{{ $t('authentication.register.email') }}</label>
      <input id="email" type="email" required />
    </div>
    <BaseButton
      class="register-btn"
      icon="login"
      icon-position="right"
      :text="$t('authentication.register.confirm')"
      type="primary"
    />
  </form>
  <div class="other-choice">
    <span>
      {{ $t('authentication.register.otherChoice.0') }}
      <RouterLink :to="{ name: 'authentication', query: { type: 'login' } }">{{
        $t('authentication.register.otherChoice.1')
      }}</RouterLink>
    </span>
  </div>
</template>

<script lang="ts" setup>
import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'
import BaseButton from '../ui/BaseButton.vue'

const { t } = useI18n()

globalUtils.setPageTitle(t('authentication.register.title'))
</script>

<style scoped>
div.other-choice {
  margin-top: 1em;
  & > span,
  & > a {
    display: block;
    width: fit-content;
    margin: auto;
  }
}
button.register-btn {
  width: 100%;
  margin-top: 1.5em;
}
a {
  text-decoration: none;
  color: var(--primary);
  font-family: 'manrope-bold', sans-serif;
}
</style>
