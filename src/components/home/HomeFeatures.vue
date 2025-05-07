<script lang="ts" setup>
import { ref } from 'vue'

const NB_FEATURES = ref(6)
</script>

<template>
  <section id="features">
    <h1>
      {{ $t('home.features.title.0') }}
      <span class="highlight">{{ $t('home.features.title.1') }}</span>
    </h1>

    <section class="list">
      <article v-for="feature in new Array(NB_FEATURES).fill('').map((_, i) => i)" :key="feature">
        <div
          :style="{ backgroundImage: `url(/images/illustrations/home/feature-${feature + 1}.svg)` }"
          class="illustration"
        />
        <div class="content">
          <h2>{{ $t('home.features.features.' + feature + '.title') }}</h2>
          <p>{{ $t('home.features.features.' + feature + '.subtitle') }}</p>
          <!-- <footer>
            <BaseButton
              :text="$t('home.features.features.' + feature + '.link')"
              icon="arrow-right"
              type="thirdery"
              icon-position="right"
            />
          </footer> -->
        </div>
      </article>
    </section>
  </section>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--primary);
}
section.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;

  justify-items: center;
  width: fit-content;
  margin: 3em auto;
}
section.list article {
  width: 30em;
  box-shadow: var(--shadow-settings-1);
  border-radius: 40px;

  position: relative;

  & > div.illustration {
    width: 100%;
    height: 26vh;

    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-size: cover;
    background-position: center;
  }
  & > div.content {
    padding: 1em 2em;
    padding-bottom: 2em;

    & > p {
      color: var(--gray-1);
    }

    & > footer {
      border-top: 1px solid var(--gray-3);
      padding-top: 1em;
      margin-top: 1em;

      position: absolute;
      bottom: 1em;
      width: 87%;

      & > button {
        padding-left: 1em;
      }
    }
  }
}

@media screen and (max-width: 1004px) {
  section.list {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (max-width: 490px) {
  section.list article {
    width: 25em;
  }
}
@media screen and (max-width: 408px) {
  section.list article {
    width: 22em;
    & > div.content {
      padding-bottom: 8em;
    }
  }
}
</style>
