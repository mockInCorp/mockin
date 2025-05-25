<template>
  <div class="authentication-area">
    <div class="left">
      <RouterLink :to="{ name: 'home' }">
        <img alt="MockIn logo in white" src="/images/logo/logo-white.svg" />
      </RouterLink>
    </div>
    <div class="right">
      <header>
        <BaseButton
          type="thirdery"
          icon="arrow-left"
          :link="{ name: 'home' }"
          :text="$t('authentication.backToHome')"
        />
        <h2 v-if="authenticationType !== 'passwordForgotten'">
          {{ $t(`authentication.${authenticationType}.title`) }}
        </h2>
      </header>
      <KeepAlive>
        <component :is="{ ...authenticationComponent }" />
      </KeepAlive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthenticationLogin from '@/components/authentication/AuthenticationLogin.vue'
import AuthenticationPasswordForgotten from '@/components/authentication/AuthenticationPasswordForgotten.vue'
import AuthenticationRegister from '@/components/authentication/AuthenticationRegister.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const authenticationType = ref('login')
const authenticationComponent = ref(AuthenticationLogin)

const AuthenticationComponentMapper: Record<string, any> = {
  login: AuthenticationLogin,
  register: AuthenticationRegister,
  passwordForgotten: AuthenticationPasswordForgotten,
}

watch(
  route,
  (value) => {
    if (value?.query) {
      const query = value.query as { type?: string }
      if (query.type) {
        authenticationType.value = query.type
        authenticationComponent.value =
          AuthenticationComponentMapper[query.type] ?? AuthenticationLogin
      }
    }
  },
  { immediate: true },
)
</script>

<style scoped>
div.authentication-area {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  background-color: var(--white);

  display: flex;
  gap: 4em;
  flex-direction: row-reverse;
  align-items: center;
}
div.authentication-area div.right,
div.authentication-area div.left {
  width: 50%;
}
div.authentication-area div.right {
  width: 61vh;
  margin: auto;
}
div.authentication-area div.left {
  background-image: url(/images/illustrations/authentication/layout.svg);
  background-size: cover;
  height: 100vh;
  position: relative;

  & > a {
    position: absolute;
    bottom: 3em;
    right: 3em;
    & > img {
      width: 15em;
    }
  }
}
header a {
  display: block;
  width: fit-content;
}

@media screen and (max-width: 1080px) {
  div.authentication-area {
    gap: 1em;

    & > div.right {
      margin-left: 1em;
    }
  }
}
@media screen and (max-width: 771px) {
  div.authentication-area {
    flex-direction: column-reverse;

    & > div.right {
      margin: 4em 0;
    }

    & > div.left {
      width: 100%;
    }
  }
}
@media screen and (max-width: 469px) {
  div.authentication-area {
    & > div.left {
      & > a {
        bottom: 1em;
      }
    }
    & > div.right {
      width: 100%;
    }
  }
}
</style>
