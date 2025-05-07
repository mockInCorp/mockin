<template>
  <footer>
    <div class="top">
      <nav>
        <nav>
          <h3>{{ $t('footer.legal.title') }}</h3>
          <ul>
            <li>
              <RouterLink :to="{ name: 'legal.terms-and-conditions' }">
                {{ $t('footer.legal.nav.termsAndConditions') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'legal.privacy-policy' }">
                {{ $t('footer.legal.nav.privacyPolicy') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'legal.legal-mentions' }">
                {{ $t('footer.legal.nav.legalMentions') }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>{{ $t('footer.links.title') }}</h3>
          <ul>
            <li>
              <RouterLink :to="{ name: 'home' }">
                {{ $t('footer.links.nav.home') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'home', hash: '#features' }">
                {{ $t('footer.links.nav.features') }}
              </RouterLink>
            </li>
            <!-- <li>
              <RouterLink :to="{ name: 'home' }">
                {{ $t('footer.links.nav.prices') }}
              </RouterLink>
            </li> -->
            <li>
              <RouterLink :to="{ name: 'home', hash: '#support' }">
                {{ $t('footer.links.nav.support') }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </nav>
      <img alt="logo full" src="/images/logo/logo-full.svg" />
    </div>
    <div class="bottom">
      &copy; MockIn {{ new Date().getFullYear() }}. {{ $t('footer.allRightReserved') }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
footer {
  padding: 2em 3em;
  background-color: #f7f8fd99;
}
div.top {
  display: flex;
  justify-content: space-between;

  & > nav {
    display: flex;
    gap: 10em;

    h3 {
      margin-bottom: 0.5em;
    }

    & ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      a {
        color: var(--black-1);
      }
    }
  }

  & > img {
    width: 20em;
    user-select: none;
  }
}
div.bottom {
  text-align: center;
  border-top: 1px solid var(--gray-3);

  padding-top: 2em;
  margin-top: 2em;
}

@media screen and (max-width: 825px) {
  div.top > nav {
    gap: 3em;
  }
}
@media screen and (max-width: 722px) {
  img {
    display: none;
  }
}
@media screen and (max-width: 399px) {
  div.top > nav {
    flex-direction: column;
  }
}
</style>
