---
prev: /prerequis/qgis
next: /projets/
---

# Lizmap

La modal sur laquelle je dois travailler s'affiche au lancement d'applications web développées à l'aide de [Lizmap](https://3liz.com/lizmap.html), un plugin intégrable à [QGIS](https://qgis.org) permettant de créer des applications web à partir de projets QGIS.

Voir [www.3liz.com/lizmap.html](https://3liz.com/lizmap.net) pour davantage d'informations sur le fonctionnement du plugin.

::: warning Note

Un unique projet Lizmap peut regrouper plusieurs projets QGIS et donc plusieurs cartes. Cela peut permettre de diviser une grande thématique en plusieurs petites applications.

:::

![logolizmap](../assets/images/lizmap.png "Logo Lizmap")

Lizmap propose un moyen de customiser l'interface des applications web qu'il génère.

En effet, en intégrant des fichiers JavaScript ou CSS dans l'arborescence d'un projet, il est possible de modifier le comportement ou l'apparence des applications qu'il contient :

```shell
# Exemple de structure de fichiers

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
