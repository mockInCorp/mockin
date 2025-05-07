<template>
  <section id="support">
    <h1>
      {{ $t('home.support.title.0') }}
      <span class="highlight">{{ $t('home.support.title.1') }}</span> ?
      {{ $t('home.support.title.2') }} !
    </h1>

    <template v-if="!isLoading">
      <section>
        <article
          v-for="(question, index) in questions"
          :key="question.title"
          :class="{ active: indexToggled === index }"
          @click="indexToggled = indexToggled === index ? -1 : index"
        >
          <h3>
            {{ question.title }}
            <BaseButton class-name="toggle" type="thirdery" icon="chevron-down" :icon-size="40" />
          </h3>
          <p>
            {{ question.answer }}
          </p>
        </article>
      </section>
    </template>
    <BaseLoader :size="10" :thickness="4" v-else />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseLoader from '../ui/BaseLoader.vue'

import useQuestions from '@/composables/useFAQQuestions'

const { questions, isLoading } = useQuestions()
const indexToggled = ref(-1)
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(--primary);
  margin-bottom: 1em;
}

section#support {
  margin-bottom: 3em;
  & > section {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    & > article {
      width: 50em;
      box-shadow: var(--shadow-settings-1);
      padding: 1.5em 2em;
      border-radius: 30px;
      cursor: pointer;

      & > h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
      }
      & > p {
        height: 0;
        overflow: hidden;

        color: var(--gray-1);
        margin-top: 0.5em;
        transition: all 0.5s ease;
      }

      &.active > p {
        height: 4em;
      }

      &.active button.toggle {
        transform: rotate(180deg);
      }
    }
  }
}

@media screen and (max-width: 832px) {
  section#support > section > article {
    width: 35em;
  }
}
@media screen and (max-width: 570px) {
  section#support > section > article {
    width: 25em;
  }
}
</style>
