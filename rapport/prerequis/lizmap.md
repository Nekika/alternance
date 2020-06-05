---
prev: /prerequis/qgis-server
next: /projets/
---

# Lizmap

Conçu par [3Liz](https://3liz.com), une société française spécialisée dans les services autour des logiciels libres SIG, [Lizmap](https://3liz.com/lizmap.html) est **logiciel open-source** se présentant comme un **plugin QGIS** permettant de créer des **applications Web cartographiques**.

![logolizmap](../assets/images/lizmap.png "Logo Lizmap")

L'idée est de **permettre à des utilisateurs de QGIS** n'ayant peu ou pas de notions de développement Web de pouvoir **créer et deployer simplement une application Web cartographique** à partir d'un projet QGIS.

::: danger Attention

Dans **Lizmap**, la **notion de projet** **diffère** de celle abordée dans les présentations de [QGIS](/prerequis/qgis) et [QGIS Server](/prerequis/qgis-server).

Avec **Lizmap**, voyons plutôt un projet QGIS comme une carte.

Ainsi, un unique projet **Lizmap** peut contenir plusieurs cartes afin de créer plusieurs applications.

Ce mécanisme permet de découper une thématique en plusieurs applications.

:::

## Avantages

**Lizmap** apporte un lot de **fonctions avancées** et la possibilité d'apporter des **modifications** quant au comportement et au style des applications.

### Fonctions avancées

* Un système de **cache** permettant la publication de service WMTS.
- Un système de **gestion de droit** permettant le contrôle d'accès aux applications mais aussi aux outils.
- Un système de **gestion des médias** pour lier des documents, images, vidéos aux objets géographiques.
- Un système de **filtrage dynamique** des données pour un affichage spécifique.
- Un système **modulaire** pour développer et intégrer des outils métiers (Cadastre, ADS, etc).

### Modifications

**Lizmap** propose un moyen de **modifier l'interface** des applications Web qu'il génère.

En effet, en intégrant des fichiers **JavaScript** ou **CSS** dans l'arborescence d'un projet, il est possible de modifier le **comportement** ou **l'apparence** des applications qu'il contient :

```shell
# Exemple de structure de fichiers

-- $LIZMAP_DIRECTORY
  |-- mon_super_projet
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

- `mon_super_projet/media/themes` : inclut des répertoires contenant des fichiers CSS.

- `mon_super_projet/media/js` : inclut des répertoires contenant des fichiers JavaScript.

::: warning Note

`mon_super_projet/media/*/default` permet d'apporter des modifications qui seront appliquées à **toutes** les applications du projet.

De la même manière, `mon_super_projet/media/*/ma_premiere_carte` permet d'apporter des modifications qui seront appliquées à l'application *ma_première_carte* **uniquement**.

:::

## Inconvénient

Bien qu'il soit possible d'apporter des modifications aux applications créées par **Lizmap**, une véritable customisation reste difficile à produire.

En effet, à l'heure actuelle, **3Liz** ne propose pas **d'API** ou de **documentation** permettant de **réutiliser** leur code.

Si l'on souhaite proposer une interface **totalement différente** de celle proposée par Lizmap, le mieux reste de développer une **nouvelle application** en utilisant une **autre technologie**.
