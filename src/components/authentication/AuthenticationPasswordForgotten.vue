<template>
  <h2 v-if="!isMailSent">{{ $t('authentication.passwordForgotten.title') }}</h2>
  <template v-if="!isMailSent && !isNewPasswordSetted">
    <form @submit.prevent="sendRecoveryCode">
      <div class="form-field">
        <label for="email" class="required">{{
          $t('authentication.passwordForgotten.email')
        }}</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <BaseButton
        class="send-btn"
        icon="send"
        icon-position="right"
        :text="$t('authentication.passwordForgotten.confirm')"
        type="primary"
        :disabled="!email.trim()"
        :is-loading="isLoading"
      />
    </form>
  </template>
  <template v-else-if="isMailSent && !isNewPasswordSetted">
    <h3>
      {{ $t('authentication.passwordForgotten.mailSentAt') }}
      <span class="highlight">{{ email }}</span>
    </h3>

    <img
      class="illustration"
      alt="mail sent illustration"
      src="/images/illustrations/authentication/mail-sent.svg"
    />

    <form @submit.prevent="checkCode" method="post">
      <BaseCodeInput v-model="code" class="code-input" />
      <div class="form-field">
        <label for="password" class="required">{{
          $t('authentication.passwordForgotten.newPassword')
        }}</label>
        <input type="password" id="password" v-model="newPassword" required />
      </div>
      <BaseButton
        :disabled="!newPassword.trim() || !code.trim()"
        :is-loading="isLoading"
        class="confirm-btn"
        :text="$t('authentication.passwordForgotten.changeMyPassword')"
        icon="arrow-right"
        icon-position="right"
      />
    </form>
  </template>
  <template v-else>
    <img
      class="illustration"
      alt="password changed illustration"
      src="/images/illustrations/authentication/password-changed.svg"
    />
    <h2>{{ $t('authentication.passwordForgotten.newPasswordDefined') }} !</h2>
    <h4>
      {{ $t('authentication.passwordForgotten.redirect.0') }}
      <RouterLink :to="{ name: 'authentication', query: { type: 'login' } }">{{
        $t('authentication.passwordForgotten.redirect.1')
      }}</RouterLink>
    </h4>
  </template>
  <BaseBanner class="banner" :is-shown="!!errorMessage" level="error" :text="errorMessage" />

  <div v-if="!isNewPasswordSetted" class="other-choice">
    <span>
      {{ $t('authentication.passwordForgotten.otherChoice.0') }}
      <RouterLink :to="{ name: 'authentication', query: { type: 'login' } }">{{
        $t('authentication.passwordForgotten.otherChoice.1')
      }}</RouterLink>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gql from 'graphql-tag'

import BaseButton from '../ui/BaseButton.vue'
import { useAPIRequestStore } from '@/stores/apiRequest'
import BaseCodeInput from '../ui/inputs/CodeInput.vue'
import BaseBanner from '../ui/BaseBanner.vue'
import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'

const isMailSent = ref(false)
const isLoading = ref(false)
const isNewPasswordSetted = ref(false)

const email = ref('')
const code = ref('')
const newPassword = ref('')

const errorMessage = ref<string | null>(null)

const { t } = useI18n()

globalUtils.setPageTitle(t('authentication.passwordForgotten.title'))

const reset = () => {
  isMailSent.value = false
  isLoading.value = false
  isNewPasswordSetted.value = false

  email.value = ''
  code.value = ''
  newPassword.value = ''
}

const sendRecoveryCode = async () => {
  if (!email.value.trim()) return
  isLoading.value = true
  try {
    await useAPIRequestStore().request({
      type: 'MUTATION',
      document: gql`
        mutation SendRecoveryInstructions($email: String!) {
          sendRecoveryInstructions(email: $email)
        }
      `,
      variables: { email: email.value },
    })
    isMailSent.value = true
  } catch (e) {
    const error = e as Error
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
const checkCode = async () => {
  isLoading.value = true
  try {
    await useAPIRequestStore().request({
      type: 'MUTATION',
      document: gql`
        mutation SendRecoveryInstructions($code: String!, $newPassword: String!) {
          useRecoveryCode(code: $code, newPassword: $newPassword)
        }
      `,
      variables: { code: code.value, newPassword: newPassword.value },
    })
    isNewPasswordSetted.value = true
  } catch (e) {
    const error = e as Error
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  reset()
})
</script>

<style scoped>
h2,
h3 {
  color: var(--primary);
}
h2,
h4 {
  text-align: center;
}
div.banner {
  margin-top: 1em;
}

.send-btn,
.confirm-btn {
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
.code-input {
  margin-top: 1em;
  margin-bottom: 1em;
}
img.illustration {
  width: 10em;
  display: block;
  margin: 1em auto;
}
</style>
