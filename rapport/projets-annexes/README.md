---
prev: /bourgs-centres/

next: /liens/

---

# Projets annexes

Durant les premiers mois au sein du service SIG, j'ai eu l'occasion de travailler sur des petits projets annexes en attendant le lancement du projet [Bourgs-Centres](/bourgs-centres/).

Ces projets m'ont permis de manipuler diverses technologies telles que JavaScript ou Python.

## Modal Lizmap

::: tip Informations

**Contexte** : Les applications web proposées par le service SIG sont souvent destinées à des utilisateurs novices. Pour les aider, une modal explicative apparaît au lancement des applications.

**Poblème** : Cette modal appraît à chaque lancement d'application sans qu'il n'y est aucun moyen de l'en empêcher.

**Objectifs** : Redesigner la modal et ajouter un moyen permettant à l'utilisateur d'empêcher la modal d'appraître lors des utilisations futures.

**Technologies utilisées** : JavaScript

:::

### Lizmap

La modal sur laquelle je dois travailler s'affiche au lancement d'applications web développées avec l'aide de [Lizmap](https://3liz.com/lizmap.html), un plugin intégrable à [QGIS](https://qgis.org) permettant de créer des applications web à partir de projets QGIS. Voir [www.3liz.com/lizmap.html](https://3liz.com/lizmap.net) pour davantage d'informations sur le fonctionnement du plugin.

<img src="../assets/images/lizmap.png" title="Logo Lizmap" alt="logo_lizmap" data-align="center">

Lizmap propose un moyen de customiser l'interface des applications web qu'il génère. En effet, en intégrant des fichiers JavaScript ou CSS dans l'arborescence d'un projet, il est possible de modifier le comportement ou l'apparence des applications qu'il contient.

::: warning Note

Un unique projet Lizmap peut regrouper plusieurs cartes et donc plusieurs applications. Cela peut permettre de diviser une grande thématique en plusieurs petites applications.

:::

```bash
# Exemple d'aborescence

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

* `mon_super_projet` : racine du projet

* `mon_super_projet/media` : peut inclure des sous-répertoires destinées à customiser les applications du projet.

* `mon_super_projet/media/themes` : peut inclure des sous-répertoires destinées à modifier l'apparence des applications du projets grâce à des fichiers CSS.

* `mon_super_projet/media/js` : peut inclure des sous-répertoires destinées à modifier le comportement ou la structure des applications du projets grâce à des fichiers CSS.

::: warning Note

`mon_super_projet/media/*/default` permet de créer des modifications qui seront appliquées à toutes les applications du projet.

:::

### Analyse
