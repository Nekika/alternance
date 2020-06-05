---
prev: /prerequis/
next: /prerequis/lizmap
---

# QGIS

[QGIS](https://qgis.org) est un logiciel libre et open source destiné à manipuler des données géospatiales.

<img src="../assets/images/qgis_exemple.png" title="Exemple de projet QGIS" alt="qgis_exemple" data-align="center">

### Couches

Dans un QGIS (et généralement dans tous les SIG), les données sont organisées sous formes de couches que l'on peut venir superposer.

Une couche possède un type, qui définit la nature des entités qui la compose. Les principaux types sont :

* **Vectoriel** : les données sont réprésentées sous forme géométriques (points, lignes, polygones).

* **Raster** : les données raster sont comme des images (voir la [documentation](https://docs.qgis.org/3.10/fr/docs/training_manual/rasters/data_manipulation.html)) et peuvent par exemple servir de fond de carte.

### Emprise

Le terme "emprise" peut être défini comme le périmètre englobant tous les éléments visibles.

Dans QGIS, l'emprise n'est ni plus ni moins que le canvas sur lequel les données sont représentées. Elle est entièrement réglable par l'utilisateur par le biais de l'échelle.

En prenant exemple sur la photo plus haut, l'emprise est réglée de manière à ce que le département de Meurthe-et-Moselle soit entièrement englobé.

### Plugins

L'aspect open source de QGIS le rend totalement customisable, notamment en réutilisant [son API](https://qgis.org/api/) ou en développant des plugins qui permettent d'ajouter de nouvelles fonctionnalités.

::: warning Note

QGIS étant principalement écrit en C++ et Python, il existe donc une [version Python de l'API](https://qgis.org/pyqgis/3.0/).

:::

Les plugins font partie intégrante de l'écosystème QGIS. Le logiciel propose notamment une interface permettant de gérer les extentions installées ou d'en télécharger de nouvelles depuis un dépôt officiel :

<img src="../assets/images/qgis_extensions.png" title="L'interface de gestion des extensions dans QGIS" alt="qgis_extensions" data-align="center">

Il arrive que certains plugins développés par la communauté rencontrent un tel succès qu'ils viennent à être intégrés nativement dans QGIS.

::: warning Note

**Lizmap** (cf. [Modal](/projets-annexes/modal#lizmap)) était à l'origine un plugin développé sous la version 2 de QGIS. 

Lors de la release de la version 3, il fut inclu dans le logiciel en tant qu'extension native.

:::
