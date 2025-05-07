<script lang="ts" setup>
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <div id="hero-header" class="hero-header">
    <div class="left">
      <h1>
        {{ $t('home.heroHeader.title.0') }}
        <span class="highlight">{{ $t('home.heroHeader.title.1') }}</span
        >.
      </h1>
      <p>{{ $t('home.heroHeader.subtitle') }}.</p>
      <BaseButton :link="{ name: 'interview' }" text="Teste-toi maintenant" />
    </div>
    <div class="right">
      <img alt="une personne qui est joyeuse" src="/images/illustrations/home/home-1.svg" />
    </div>

    <div class="wave-motif" />
  </div>
</template>

<style scoped>
div.hero-header {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10em;

  margin: 5em 0;
}
div.hero-header div.left {
  & > h1 {
    color: var(--primary);
    font-size: 3em;

    max-width: 20ch;
    word-wrap: break-word;
    line-height: 1.6;
  }
  & > p {
    font-size: 1.5em;
    color: var(--gray-1);
    margin-top: 0.5em;
    max-width: 40ch;
    word-wrap: break-word;
    margin-bottom: 1em;
  }
  & a * {
    font-size: 1.2em;
  }
}
div.hero-header div.right {
  user-select: none;
}

div.wave-motif {
  background-image: url(/images/illustrations/home/home-2.svg);
  background-size: cover;

  width: 100%;
  height: 60vh;

  position: absolute;
  bottom: 5%;
  left: 0;
  z-index: -1;
}

@media screen and (max-width: 1270px) {
  div.hero-header {
    gap: 2em;
  }
  div.right img {
    width: 24em;
  }
}
@media screen and (max-width: 936px) {
  div.left {
    & > h1,
    & > p {
      text-align: center;
    }
    & > button {
      width: fit-content;
      margin: auto;
    }
  }
  div.right img {
    display: none;
  }
}
</style>
