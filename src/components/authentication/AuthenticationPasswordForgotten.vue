<template>
  <form method="post">
    <div class="form-field">
      <label for="email" class="required">{{ $t('authentication.passwordForgotten.email') }}</label>
      <input id="email" type="email" required />
    </div>
    <BaseButton
      class="send-btn"
      icon="send"
      icon-position="right"
      :text="$t('authentication.passwordForgotten.confirm')"
      type="primary"
    />
  </form>
  <div class="other-choice">
    <span>
      {{ $t('authentication.passwordForgotten.otherChoice.0') }}
      <RouterLink :to="{ name: 'authentication', query: { type: 'login' } }">{{
        $t('authentication.passwordForgotten.otherChoice.1')
      }}</RouterLink>
    </span>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '../ui/BaseButton.vue'
</script>

<style scoped>
.send-btn {
  width: 100%;
  margin-top: 0.5em;
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
a {
  text-decoration: none;
  color: var(--primary);
  font-family: 'manrope-bold', sans-serif;
}
</style>
