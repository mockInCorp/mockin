<template>
  <section>
    <h1>Termes et Conditions d’Utilisation</h1>

    <h2>1. Objet du site</h2>
    <p>
      Ce site a pour objectif d’aider les utilisateurs à se préparer aux entretiens professionnels
      grâce à des simulations interactives, une analyse automatisée des réponses, et un suivi
      personnalisé de la progression.
    </p>

    <h2>2. Accès au service</h2>
    <p>
      L’accès à la plateforme est réservé aux utilisateurs inscrits. Certaines fonctionnalités,
      comme la sauvegarde de l’historique ou l’utilisation du mode vocal, nécessitent une
      authentification.
    </p>

    <h2>3. Création de compte</h2>
    <p>
      Lors de votre inscription, vous devez fournir des informations exactes, à jour et complètes.
      Vous êtes responsable de la sécurité de votre compte et de la confidentialité de vos
      identifiants.
    </p>

    <h2>4. Utilisation des données</h2>
    <p>
      Les données que vous fournissez (réponses, préférences, performances) sont utilisées
      uniquement pour améliorer votre expérience sur la plateforme. Elles ne sont ni revendues ni
      partagées avec des tiers sans votre consentement.
    </p>

    <h2>5. Propriété intellectuelle</h2>
    <p>
      Tous les contenus présents sur le site (textes, logos, fonctionnalités, design) sont la
      propriété exclusive de l’équipe éditrice, sauf mention contraire. Toute reproduction non
      autorisée est interdite.
    </p>

    <h2>6. Comportement des utilisateurs</h2>
    <p>
      Vous vous engagez à utiliser le site de manière respectueuse et légale. Toute tentative de
      perturbation du service, d’exploitation abusive ou de diffusion de contenus inappropriés
      pourra entraîner la suppression immédiate du compte.
    </p>

    <h2>7. Modifications</h2>
    <p>
      Nous nous réservons le droit de modifier à tout moment les présentes conditions. Vous serez
      informé des mises à jour importantes, et votre utilisation continue du site vaudra acceptation
      des nouvelles conditions.
    </p>

    <h2>8. Contact</h2>
    <p>
      Pour toute question concernant ces termes, vous pouvez nous contacter à l’adresse suivante :
      <span class="bold">contact@mockin.fr</span>
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
