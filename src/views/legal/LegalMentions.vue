<template>
  <section>
    <h1>Mentions Légales</h1>

    <h2>Éditeur du site</h2>
    <ul>
      <li>Nom de la société: Mattéo Gaillard</li>
      <li>Type: Entreprise individuelle</li>
      <li>Numéro de SIRET: 90951150300015</li>
      <li>Adresse postale: 35520</li>
      <li>Email de contact: <span class="bold">contact@mockin.fr</span></li>
    </ul>

    <h2>Directeur de la publication</h2>
    <ul>
      <li>Mattéo Gaillard</li>
    </ul>

    <h2>Hébergement</h2>
    <ul>
      <li>Hostinger International Ltd.</li>
      <li>61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
      <li><span class="bold">www.hostinger.fr</span></li>
    </ul>

    <h2>Propriété intellectuelle</h2>
    <p>
      Tous les contenus présents sur le site (textes, images, illustrations, vidéos, logos, etc.)
      sont protégés par le droit d’auteur. Toute reproduction sans autorisation est interdite.
    </p>

    <h2>Responsabilité</h2>
    <p>
      L’éditeur ne peut être tenu responsable des dommages directs ou indirects liés à l’usage du
      site.
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
p {
  color: var(--gray-1);
}
span.bold {
  font-family: 'manrope-bold', sans-serif;
  color: var(--primary-2);
}
ul {
  margin-top: 0.5em;
  margin-left: 2em;
  & > li {
    margin: 0.5em 0;
  }
}
@media screen and (max-width: 821px) {
  section {
    width: 30em;
  }
}
</style>
