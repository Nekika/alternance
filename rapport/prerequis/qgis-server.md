---
prev: /prerequis/qgis
next: /prerequis/lizmap
---

# QGIS Server

**QGIS Server** est un module qui permet d'utiliser QGIS comme **serveur de données géospatiales**.

Il offre la possibilité de **générer** des **Web services** à partir d'un projet QGIS.

C'est un outil très intéressant puisqu'en l'utilisant on s'affranchit du développement de nos propres services et on s'assure d'obtenir un **résultat standardisé**.

Il suffit simplement de l'installer, de le configurer sur un serveur Web et de lui fournir un projet QGIS.

## Flux WMS/WFS

Comme annoncé précédemmenent, l'objectif de **QGIS Server** est de **générer** des **Web services** depuis un projet QGIS.

Ces Web services sont **standardisés** par [l'OGC](https://www.ogc.org/) et ceux que l'on utilise le plus souvent sont le **Web Map Service** (WMS) et le **Web Feature Service** (WFS).

Ils permettent principalement de **mettre à disposition** les données des couches et de leurs entités via le **Web**.

Ainsi, par le biais de **requêtes HTTP**, il est possible de **récupérer** ou **mettre à jour** les données.

## Configuration serveur

Le module peut être installé sur un **serveur Web** classique tel que [**Apache**](http://httpd.apache.org/) ou [**NGINX**](https://www.nginx.com/).

Pour la configuration, il suffit de suivre l'exemple détaillé dans la [documentation officielle](https://docs.qgis.org/3.10/en/docs/training_manual/qgis_server/install.html) de **QGIS Server**.

## Servir un projet QGIS

**QGIS Server** va récupérer les données contenues dans un projet QGIS afin de créer des **flux WMS/WFS**.

Dans le cas où les couches sont importées depuis une **base de données** telle que **PostGIS**, **QGIS Server** aura recours à la **configuration de la couche** pour se connecter à la base de données et récupérer les informations (cf. [présentation de QGIS](/prerequis/qgis#postgis)).

Pour indiquer à **QGIS Server** le projet à partir duquel il doit générer des **Web services**, deux options sont disponibles :

### Par configuration

Lors de la configuration de **QGIS Server**, il est possible d'ajouter une ligne dans le **fichier de configuration** du serveur Web fin de spécifier le projet à utiliser par défaut :

```apacheconf
<VirtualHost *:80>
  ...
  FcgidInitialEnv QGIS_PROJET_FILE /chemin/vers/le/projet.qgs
  ...
</VirtualHost>
```

Cette option est très pratique lorsque **QGIS Server** est destiné à ne servir qu'un seul projet.

::: warning Note

Spécifier un projet par défaut n'implique pas que ce projet sera le seul capable d'être servi par **QGIS Server**.

Dans le cas où un projet par défaut est défini dans la configuration, il faut utiliser la méthode **par paramètre de requête HTTP** ci-dessous pour indiquer à **QGIS Server** le chemin vers le projet à servir.

:::

### Par paramètre de requête HTTP

Si l'on préfère indiquer à QGIS Server le chemin vers le projet au moment où on effectue une **requête HTTP**, il est possible d'ajouter le **paramètre `MAP`** dans l'URL :

```shell
curl "https://qgis.server.dev?MAP=/chemin/vers/le/projet.qgs&SERVICE=WFS"
```
