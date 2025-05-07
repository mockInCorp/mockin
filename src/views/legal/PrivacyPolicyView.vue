<template>
  <section>
    <h1>Politique de Confidentialité</h1>

    <h2>1. Introduction</h2>
    <p>
      Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons
      vos données personnelles lorsque vous utilisez notre site.
    </p>

    <h2>2. Données collectées</h2>
    <p>
      Nous collectons uniquement les données nécessaires à l’utilisation de la plateforme, telles
      que :
    </p>
    <ul>
      <li>Informations de compte : nom, prénom, adresse e-mail</li>
      <li>Préférences d’usage : domaine visé, formations, etc.</li>
      <li>Réponses aux simulations et performances</li>
      <li>Données techniques (adresse IP, type de navigateur)</li>
    </ul>

    <h2>3. Utilisation des données</h2>
    <p>Les données collectées sont utilisées pour :</p>
    <ul>
      <li>Personnaliser votre expérience utilisateur</li>
      <li>Analyser vos réponses et générer des retours</li>
      <li>Améliorer la plateforme et nos services</li>
      <li>Assurer la sécurité et le bon fonctionnement du site</li>
    </ul>

    <h2>4. Partage des données</h2>
    <p>
      Vos données ne sont pas vendues ni partagées avec des tiers sans votre consentement explicite,
      sauf obligation légale ou contractuelle.
    </p>

    <h2>5. Conservation des données</h2>
    <p>
      Vos données sont conservées aussi longtemps que nécessaire pour vous fournir le service, sauf
      demande de suppression de votre part.
    </p>

    <h2>6. Sécurité</h2>
    <p>
      Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données
      contre les accès non autorisés, la perte ou la modification.
    </p>

    <h2>7. Vos droits</h2>
    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
    <ul>
      <li>Droit d’accès à vos données</li>
      <li>Droit de rectification ou de suppression</li>
      <li>Droit de limiter ou refuser certains traitements</li>
      <li>Droit à la portabilité des données</li>
    </ul>
    <p>Pour exercer ces droits, contactez-nous à : <span class="bold">contact@mockin.fr</span></p>

    <h2>8. Cookies</h2>
    <p>
      Des cookies peuvent être utilisés pour améliorer l’expérience utilisateur. Vous pouvez les
      accepter ou les refuser via votre navigateur.
    </p>

    <h2>9. Modifications</h2>
    <p>
      Cette politique peut être mise à jour à tout moment. Les utilisateurs seront informés des
      changements majeurs.
    </p>
  </section>
</template>

<style scoped>
h1 {
  color: var(--primary);
  text-align: center;
  margin: 1em 0;
}
section {
  width: 50em;
  margin: 2em auto;
}
h2 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: var(--black-2);
}
ul {
  margin-top: 0.5em;
  margin-left: 2em;
  & > li {
    margin: 0.5em 0;
  }
}
span.bold {
  font-family: 'manrope-bold', sans-serif;
  color: var(--primary-2);
}
@media screen and (max-width: 821px) {
  section {
    width: 30em;
  }
}
</style>
