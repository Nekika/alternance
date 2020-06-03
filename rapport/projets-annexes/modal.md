---
prev: /projets-annexes/

next: ./smc

---

# Modal

::: tip Informations

**Contexte** : Les applications web proposées par le service SIG sont souvent destinées à des utilisateurs novices. Pour les aider, une modal explicative apparaît au lancement des applications.

**Poblème** : Cette modal appraît à chaque lancement d'application sans qu'il n'y est aucun moyen de l'en empêcher.

**Objectifs** : Analyser le code de la modal et ajouter un moyen permettant à l'utilisateur d'empêcher la modal d'appraître lors des utilisations futures.

**Technologies utilisées** : JavaScript

:::

## Lizmap

La modal sur laquelle je dois travailler s'affiche au lancement d'applications web développées à l'aide de [Lizmap](https://3liz.com/lizmap.html), un plugin intégrable à [QGIS](https://qgis.org) permettant de créer des applications web à partir de projets QGIS.

Voir [www.3liz.com/lizmap.html](https://3liz.com/lizmap.net) pour davantage d'informations sur le fonctionnement du plugin.

::: warning Note

Un unique projet Lizmap peut regrouper plusieurs projets QGIS et donc plusieurs cartes. Cela peut permettre de diviser une grande thématique en plusieurs petites applications.

:::

![logolizmap](../assets/images/lizmap.png "Logo Lizmap")

Lizmap propose un moyen de customiser l'interface des applications web qu'il génère.

En effet, en intégrant des fichiers JavaScript ou CSS dans l'arborescence d'un projet, il est possible de modifier le comportement ou l'apparence des applications qu'il contient :

```bash
# Exemple d&#39;aborescence

-- mon_super_projet
  |-- media
    |-- themes
      |-- default
      |-- ma_premiere_carte
      |-- ma_seconde_carte
    |-- js
      |-- default
      |-- ma_premiere_carte
      |-- ma_seconde_carte
```

- `mon_super_projet` : racine du projet.

- `mon_super_projet/media` : peut inclure des sous-répertoires destinées à customiser les applications du projet.

- `mon_super_projet/media/themes` : peut inclure des sous-répertoires destinées à modifier l'apparence des applications du projets grâce à des fichiers CSS.

- `mon_super_projet/media/js` : peut inclure des sous-répertoires destinées à modifier le comportement ou la structure des applications du projets grâce à des fichiers JavaScript.

::: warning Note

`mon_super_projet/media/*/default` permet de créer des modifications qui seront appliquées à toutes les applications du projet.

:::

## Analyse du code

Après avoir consulté les fichier liés à la modal, j'ai remarqué que je pouvais apporter quelques modifications :

- **Mise à jour du code** : le code était écrit selon les anciens standards d'ECMAScript, j'ai donc utilisé des fonctionnalités plus récentes afin d'améliorer la qualité du code (let/const au lieu de var, utilisation des backquotes).

- **Utilisation de Bootstrap** : le framework étant directement intégré à Lizmap, il n'était pas nécessaire de créer un fichier CSS pour apporter du style à la modal.

- **Utilisation de jQuery**: la librairie étant directement intégrée à Lizmap, il est possible de l'utiliser afin de simplier le code.

## Affichage de la modal

Afin d'empêcher la modal de s'afficher lorsque l'utilisateur le décide, il fallait mettre en place deux choses :

- **Interaction avec l'utilisateur** : créer un moyen lui permettant de choisir s'il désire que la modal s'affiche au lancement de l'application.

- **Sauvegarder le choix de l'utilisateur** : il faut que cette information soit stockée quelque part afin d'être consultée au lancement de l'application.Modal Lizmap
