<template>
  <form @submit.prevent="onSubmit" method="post">
    <div class="form-field-inline">
      <div class="form-field">
        <label for="givenName" class="required">{{
          $t('authentication.register.givenName')
        }}</label>
        <input v-model="givenName" id="givenName" type="text" required />
      </div>
      <div class="form-field">
        <label for="familyName" class="required">{{
          $t('authentication.register.familyName')
        }}</label>
        <input v-model="familyName" id="familyName" type="text" required />
      </div>
    </div>
    <div class="form-field">
      <label for="email" class="required">{{ $t('authentication.register.email') }}</label>
      <input v-model="email" id="email" type="email" required />
    </div>
    <div class="form-field">
      <label for="password" class="required">{{ $t('authentication.register.password') }}</label>
      <input v-model="password" id="password" type="password" required />
    </div>
    <CheckboxInput
      v-model="gdprAccepted"
      id="gdpr-accepted"
      :label="$t('authentication.register.gdprAccepted')"
    />
    <BaseButton
      :disabled="isDisabled"
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
import { computed, ref } from 'vue'
import { useAPIRequestStore } from '@/stores/apiRequest'
import gql from 'graphql-tag'
import { useAuthenticationStore } from '@/stores/authentication'
import { useRouter } from 'vue-router'
import CheckboxInput from '../ui/inputs/CheckboxInput.vue'

const { t } = useI18n()
const router = useRouter()

const givenName = ref('')
const familyName = ref('')
const email = ref('')
const password = ref('')
const gdprAccepted = ref(false)

const isDisabled = computed(() => {
  return (
    !givenName.value.trim() ||
    !familyName.value.trim() ||
    !email.value.trim() ||
    !password.value.trim() ||
    gdprAccepted.value === false
  )
})

const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

globalUtils.setPageTitle(t('authentication.register.title'))

const onSubmit = async () => {
  isLoading.value = true
  try {
    const response = await useAPIRequestStore().request<{ register: string }>({
      type: 'MUTATION',
      document: gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      variables: {
        input: {
          givenName: givenName.value,
          familyName: familyName.value,
          email: email.value,
          password: password.value,
          gdprAccepted: gdprAccepted.value,
        },
      },
    })
    useAuthenticationStore().storeToken(response.register)
    window.toast({
      level: 'SUCCESS',
      title: t('authentication.success.nowConnected'),
    })
    await router.push({ name: 'home' })
  } catch (e) {
    const error = e as Error
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
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
