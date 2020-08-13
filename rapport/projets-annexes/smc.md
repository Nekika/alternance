---
prev: /projets-annexes/modal
next: /cartogis54/
title: Projets annexes - SMC
---

# SMC (Sélection Multi Couches)

![icon-smc](../assets/images/smc/icon.png)

## Introduction

J'ai été chargé de créer un **plugin** pour QGIS, permettant de **sélectionner d'un seul coup toutes les entités visibles dans l'interface, et ceux pour toutes les couches du projet**.

::: tip Informations

**Contexte** : Le logiciel QGIS est utilisé par les géomaticiens et les agents de terrain chargés de collecter des données à travers le département de Meurthe-et-Moselle.

**Problème** : N'ayant pas de connexion internet sur le terrain, les agents n'ont donc pas accès aux bases de données. Il sont alors contraints de sauvegader les données sur leur ordinateur portable avant de partir. Cette tâche est fastidieuse puisqu'ils doivent sélectionner manuellement chaque entité qu'ils souhaient sauvegarder en cliquant dessus. Cela devient très pénible pour des projets de grande envergure.

**Objectif** : Développer un plugin QGIS permettant la sélection de toutes les entités présentes dans l'emprise définie par l'utilisateur.

**Technologie utilisée** : Python

:::

## Analyse

Ma mission consistant à **développer un plugin**, j'ai donc commencé par prendre le temps de **chercher des informations** et de lire la [documentation](https://docs.qgis.org/3.10/fr/docs/index.html) avant **d'analyser le besoin**.

### Intégration d'un plugin

Afin d'intégrer un **plugin local**, QGIS nous propose de placer notre code dans un répertoire qu'il viendra **scanner au démarrage** :

```shell
# Exemple de structure de fichiers

-- $REPERTOIRE_QGIS
  |-- profiles/
    |-- default/
      |-- python/
        |-- plugins/
    |-- mon_profil/
      |-- python/
        |-- plugins/
```

* `profiles/` : le répertoire qui stocke les différents profils utilisateurs.

* `profiles/*/python/plugins` : le sous-répertoire scanné par QGIS, dans lequel on peut retrouver le code source des extensions.

::: warning Note

Le répertoire `profiles/default` permet de définir des configurations qui seront appliqués à l'utilisateur par défaut **ET** à tous les utilisateurs.

Ainsi, dans le répertoire `profiles/default/python/plugins` on pourra retrouver des extensions disponibles pour tous les utilisateurs tandis que le répertoire `profiles/mon_profil/python/plugins` contiendra des extentions destinées à l'utilisateur *mon_profil* **uniquement**.

:::

### Développement d'un plugin

Pour le développement de plugins, QGIS encourage l'utilisation de **Python** plutôt que C++.

Ainsi, sur la documentation officielle de QGIS, on peut retrouver le [PyQGIS Developer Cookbook](https://docs.qgis.org/3.10/en/docs/pyqgis_developer_cookbook/index.html) qui explique de manière détaillée la marche à suivre pour créer un plugin en utilisant [l'API Python](https://qgis.org/pyqgis/3.0/).

#### Structure d'un plugin

```shell
# Structure minimale

-- $REPERTOIRE_QGIS_PLUGINS
  |-- mon_super_plugin/
    |-- __init__.py
    |-- form.ui
    |-- form.py
    |-- metadata.txt
    |-- mon_super_plugin.py
    |-- resources.py
    |-- resources.qrc
```

* `__init__.py` : le point d'entrée du plugin.

* `form.ui` : l'interface utilisateur que l'on peut éditer avec [Qt Designer](https://doc.qt.io/qt-5/qtdesigner-manual.html).

* `form.py` : une classe réprésentant l'interface utilisateur du plugin, basée sur le contenu du fichier `form.ui`.

* `metadata.txt` : les métadonnées relatives au plugin.

* `mon_super_plugin.py` : le code source du plugin.

* `resources.py` : la version compilée en Python de `resources.qrc`

* `resources.qrc` : un fichier au format XML créé par [Qt Designer](https://doc.qt.io/qt-5/qtdesigner-manual.html) et contenant des informations relatives à l'interface utilisateur.

Ces fichiers composent le **squelette de base** d'un plugin QGIS.

Pour un plugin d'une **plus grande ampleur** il est possible de se retrouver avec des architectures telles que celle-ci : 

Dans notre cas, une **structure simple** telle que celle ci-dessus suffira puisque le plugin ne contiendra que **quelques instructions**.

### Besoin

Il faut permettre à l'utilisateur de **gagner du temps** en obtenant **immédiatement** une sélection de **toutes les entités** présentes dans l'emprise, tout en effectuant **le moins d'action possible**.

## Solution proposée

Il s'avère qu'au cours de mes quelques mois au sein du service SIG, j'ai eu l'occasion de travaillé deux fois sur ce projet.

En effet, au mois d'octobre j'ai développé et livré une première version de l'outil afin de répondre au besoin primaire des utilisateurs.

Bien que cette solution ait fait l'affaire pendant quelques mois, avant et après la période de confinement causée par la crise sanitaire du COVID-19, les utilisateurs m'ont remonté des idées d'amélioration au mois de juillet.

Je me suis donc chargé de développer une nouvelle version du plugin afin de répondre aux nouveaux besoins des utilisateurs.

### Première version

L'idée est de fournir un outil capable d'effectuer la sélection **en un seul clic** :

![SMC v1 preview](../assets/images/smc/v1-preview.gif)

::: warning Note

Les utilisateurs finaux sélectionnent les entités de toutes les couches du projet, sauf une (la couche *Communes*).

Il n'était alors pas nécessaire de fournir une interface utilisateur permettant de sélectionner les couches sur lesquelles effectuer la sélection.

:::

#### Structure

L'architecture est très **simplifiée** puisque d'une part il n'y a que quelques instructions à fournir, et d'autre part il n'y a pas besoin d'interface utilisateur :

```shell
-- $REPERTOIRE_QGIS_PLUGINS
  |-- SMC/
    |-- __init.py__
    |-- icon.png
    |-- metadata.txt
    |-- pb_tool.cfg
    |-- smc.py
    |-- README.md
    |-- resources.py
    |-- resources.qrc
    |-- tools.py
```

On remarque tout de même la présence de nouveaux fichiers :

* `icon.png` : l'icone qui représente le plugin dans l'interface de QGIS.

* `pb_tool.cfg` : un outil permettant de compiler le plugin, voir [Plugin Builder Tool](http://g-sherman.github.io/plugin_build_tool/).

* `tools.py` : des fonctions dont la présence au sein du coeur du plugin n'était pas pertinente.

#### Code

L'utilisation de [l'API Python](https://qgis.org/pyqgis/3.0/) de QGIS rend le code **simple à lire et à comprendre** même pour quelqu'un n'ayant jamais manipuler Python. Je vais donc me permettre de détailler le fonctionnement du plugin.

Le **fichier principal** ( `smc.py` ) est une classe qui doit implémenter des **méthodes définies par l'API**.

Ces méthodes servent à **configurer** le plugin lors du démarrage de QGIS. Elles sont donc **indispensables**.

::: warning Note

L'idée n'étant pas d'expliquer les mécanismes derrière le fonctionnement global d'un plugin, je me contenterai d'expliquer ce que j'ai développé.

Pour plus de détail sur ces méthodes ou sur le fonctionnement des plugins, se référer au [PyQGIS Developer Cookbook](https://docs.qgis.org/3.10/en/docs/pyqgis_developer_cookbook/plugins/plugins.html#writing-a-plugin).

:::

Parmi les méthodes **indispensables**, on peut retrouver `run()`. 

C'est elle qui sera appelée lorsque l'utilisateur souhaite se servir du plugin, c'est donc à l'intérieur que l'on va indiquer les **actions à effectuer** :

**`smc.py`**
```python
def run(self):
  layers = get_all_vectorLayers()
  extent = self.get_extent()
  select_features_in_area(layers, extent)
```

On remarque que cette méthode fait appel à **2 fonctions** et **une autre méthode** :

* `get_all_vectorLayers()`

Cette fonction permet de **récupérer la liste des couches vectorielles** du projet puisque c'est sur celles-ci que sont représentées les entités à sélectionner :

**`tools.py`**
```python
def get_all_vectorLayers():
    res = []
    layers = QgsProject.instance().mapLayers().values()
    for layer in layers:
        if layer.type() == 0 and layer.name() != "Communes":
            res.append(layer)
    return res
```

En se référant à la classe [QgsMapLayer](https://qgis.org/pyqgis/master/core/QgsMapLayer.html), on découvre que la méthode `type()` nous offre le moyen de **connaître le type de la couche** :

* **VectorLayer** : 0

* **RasterLayer** : 1

* **PluginLayer** : 2

* **MeshLayer** : 3

* **VectorTileLayer** : 4

La condition `if layer.type() == 0 and layer.name() != "Communes":` permet donc de s'assurer d'une part que la couche traitée est bel et bien de **type vectoriel**, et d'autre par que la couche traitée n'est pas la couche *Communes*.

* `get_extent()`

C'est la méthode qui va permettre de **récupérer les coordonnées de l'emprise** réglée par l'utilisateur :

**`smc.py`**
```python
def get_extent(self):
  mapcanvas = self.iface.mapCanvas()
  extent = mapcanvas.extent()
  return extent
```

La méthode se contente de **récupérer l'instance de [MapCanvas](https://qgis.org/pyqgis/master/gui/QgsMapCanvas.html)** et d'utiliser la méthode `extent()` pour pouvoir **récupérer les coordonées** de l'emprise.

* `select_features_in_area()`

Les tâches effectuées en amont ayant permis de récupérer des données qui sont nécessaires pour pouvoir répondre au besoin, cette dernière fonction va se charger **d'effectuer la sélection** de toutes les entités présentes dans l'emprise :

**`smc.py`**
```python
def select_features_in_area(layers, area):
  for layer in layers:
    layer.selectByRect(area)
```

Cette fonction très simple fait appel à la méthode `selectByRect` de la classe [QgsVectorLayer](https://qgis.org/pyqgis/master/core/QgsVectorLayer.html#qgis.core.QgsVectorLayer.selectByRect) et elle permet, à partir d'une couche vectorielle, de **sélectionner toutes les entités contenues au sein d'un rectangle**.

Dans notre cas, le rectangle n'est autre que **l'emprise** réglée par l'utilisateur.

### Retour utilisateur

Après **quelques mois d'utilisation**, les utilisateurs m'ont fait quelques **retours constructifs** quant à **l'utilisation réelle** de l'extension.

#### Point positif

L'extension **répond parfaitement au besoin primaire** des utilisateurs et leur permet de **gagner un temps précieux**.

#### Points négatifs

* **Sélection trop importante** : la plupart du temps, les utilisateurs ne souhaitent sélectionner des entités qu'au sein d'une, deux voir trois communes. La sélection rectangulaire englobe donc un grand nombre d'entités inutiles.
* **Fonds de plans** : il peut arriver que les utilisateurs aient besoin de sélectionner les fonds de plans. Or, dans la version actuelle du plugin il est impossible de le faire.

### Deuxième version

Afin de répondre aux **nouveaux besoins** des utilisateurs, il a été nécessaire de **repenser totalement** l'utilisation du plugin.

Très vite, la nécessité de fournir une **interface homme-machine** est apparue, car les nouvelles fonctionnalités à implémenter nécessecitent obligatoirement des **actions de la part de l'utilisateur**.

Bien que le fonctionnement de l'extension soit **plus complexe**, l'idée derrière reste **similaire** à celle de la première version :

1. **Emprise** : L'utilisateur règle l'emprise sur les communes qui l'intéressent.
2. **Interface utilisateur** : Au lancement du plugin, une interface utilisateur listant ces communes apparaît.
3. **Actions utilisateur** : L'utilisateur peut alors sélectionner les communes sur lesquelles il souhaite effectuer la sélection. Une case à cocher permet d'indiquer à l'extension si elle doit intégrer les fonds de plans dans la sélection.
4. **Lancement de la sélection** : Un bouton *Valider* permet de lancer la sélection.

![SMC v2 preview](../assets/images/smc/v2-preview.gif)

#### Structure

***

Au niveau de l'organisation, cette nouvelle version a nécessité l'ajout de **nouveaux éléments** : 

```shell
-- $REPERTOIRE_QGIS_PLUGINS
  |-- SMC/
    |-- utils/
      |-- __init.py__
      |-- ui.py
    |-- README.md
    |-- __init.py__
    |-- icon.png
    |-- metadata.txt
    |-- pb_tool.cfg
    |-- resources.py
    |-- resources.qrc
    |-- smc.py
    |-- smc_dialog.py
    |-- smc_dialog_base.ui
```

* `smc_dialog_base.ui` : la structure de l'interface utilisateur.
* `smc_dialog.py` : la classe représentant l'interface utilisateur.
* `utils/ui.py` : un ensemble de fonctions facilitant la manipulation de l'interface utilisateur lors de l'execution du plugin.

La **majorité du fonctionnement** de l'extension se trouve toujours au sein du fichier `smc.py`.

#### Code

***

Nous nous contenterons ici de présenter les **différences majeures** entre les deux versions, n'hésitez donc pas à revoir [les extraits de code](./smc.html#code) de la première version.


**Interface utilisateur**

La plus grande différence est l'apparition d'une interface utilisateur au moment où le plugin est lancé. Son rôle est de permettre l'interaction entre l'utilisateur et l'extension.

Afin de rendre cette interaction possible, j'ai eu recours à [PyQt](https://doc.qt.io/qtforpython/) (la version Python de [Qt](https://qt.io) - *un célèbre ensemble de librairies C++*).

![logo-qt](../assets/images/logos/qt.png)

PyQt étant **nativement intégré** à QGIS, je n'ai pas eu à me soucier de la moindre installation.

J'ai commencé par **concevoir l'interface** à l'aide de [Qt Designer](https://doc.qt.io/qt-5/qtdesigner-manual.html), un logiciel permettant de créer des interfaces utilisateurs composées **d'éléments manipulables à l'aide de Qt** ([Qt Widgets](https://doc.qt.io/qt-5/qtwidgets-index.html)).

![SMC v2 QtDesigner](../assets/images/smc/v2-designer.png)

L'interface utilisateur est composée d'une **table** ([QTableWidget](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QTableWidget.html)) dans laquelle seront listées les **communes visibles dans l'emprise**, d'une **case à cocher** ([QCheckBox](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QCheckBox.html)) permettant d'indiquer s'il faut **inclure les fonds de plans** ainsi que d'un **boutton** *Valider* pour **lancer la sélection** et un **boutton** *Annuler* pour **fermer la fenêtre** ([QPushButton](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QPushButton.html)).

Au sein du fichier `utils/ui.py`, on peut retrouver des fonctions qui aideront à créer les éléments à insérer dans la **table** :

**`utils/ui.py`**
```python
from qgis.PyQt.QtWidgets import QTableWidgetItem
from qgis.PyQt.QtCore import Qt

def create_label(text):
    item = QTableWidgetItem(text)
    item.setFlags(Qt.NoItemFlags)
    item.setTextAlignment(Qt.AlignCenter)
    return item

def create_checkbox():
    item = QTableWidgetItem()
    item.setFlags(Qt.ItemIsUserCheckable | Qt.ItemIsEnabled)
    item.setCheckState(Qt.Unchecked)
    return item

def create_rows(communes):
    rows = []
    for c in communes:
        label, checkbox = create_label(c.attribute("nom")), create_checkbox()
        rows.append(dict(label=label, checkbox=checkbox))
    return rows
```

* `create_label()` : crée un objet ([QTableWidgetItem](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QTableWidgetItem.html)) qui sera utilisé pour afficher le nom d'une commune.
* `create_checkbox()` : crée un objet ([QTableWidgetItem](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QTableWidgetItem.html)) qui sera utilisé pour afficher une case à cocher.
* `create_rows()` : à partir d'une liste de communes, crée une liste d'objets ([QTableWidgetItem](https://doc.qt.io/qtforpython/PySide2/QtWidgets/QTableWidgetItem.html)) représentant une ligne à insérer dans la table listant les communes.


La fonction `create_rows()` est appelée au sein de la méthode `fill_table()` :

**`smc.py`**
```python
 def fill_table(self, communes):
      rows, table = sorted(ui.create_rows(communes), key=lambda k: k["label"]), self.dlg.tw_communes
      table.setRowCount(len(rows))
      for index, row in enumerate(rows):
          table.setItem(index, 0, row["label"])
          table.setItem(index, 1, row["checkbox"])
```

Voici l'interface telle qu'elle a été proposée puis validée par les utilisateurs :

![SMC v2 UI](../assets/images/smc/v2-ui.png)

Elle répond aux besoins de **simplicité d'utilisation** et de **pertinence de la sélection** puisqu'elle offre aux utilisateurs la possibiltié de **tout configurer** à l'aide de simples **cases à cocher**.

**Sélection**

Le traitement de la sélection **diffère légèrement** de la première version pour **deux raisons majeures** :

1. **Traitement pré-selection**

Il est nécessaire de **récupérer** et **prendre en compte les choix de l'utilisateur**.

De ce fait, des **étapes supplémentaires** permettant notamment de récupérer la liste des communes sélectionnées ont du être ajoutées :

**`smc.py`**
```python
def selected_communes_names(self):
    res, table = [], self.dlg.tw_communes
    for row in range(table.rowCount()):
        is_selected = table.item(row, 1).checkState() == Qt.Checked
        if is_selected:
            res.append(table.item(row, 0).text())
    return res

def selected_communes(self, communes):
    selected_communes_names = self.selected_communes_names()
    return [c for c in list(communes.getFeatures()) if c.attribute("nom") in selected_communes_names]
```

* **`selected_communes_names()`** : se charge de récupérer les noms des communes sélectionnées par l'utilisateur depuis la table listant les communes.
* **`selected_communes()`** : se charge de récupérer les entités correspondantes (objets `QgsFeature`, voir [l'API](https://qgis.org/pyqgis/master/core/QgsFeature.html?highlight=qgsfeature#module-QgsFeature)) depuis une liste de noms de communes.

Ce traitement est nécessaire puisque nous allons avoir besoin de la **géométrie des communes choisies** afin d'effectuer la **sélection des entités**.

2. **Méthode de sélection**

La sélection est gérée par la méthode `select()` :

**`smc.py`**
```python
 def select(self, communes):
      QApplication.setOverrideCursor(Qt.WaitCursor)
      layers = [l for l in QgsProject.instance().mapLayers().values() if l.type() == 0 and l.name() != "Communes"]
      if self.dlg.cb_exclude.checkState() == Qt.Checked:
          root = QgsProject.instance().layerTreeRoot()
          basemaps_nodes = root.findGroup("Fonds de plan").findLayers()
          basemaps_layers = [node.layer() for node in basemaps_nodes]
          layers = [l for l in QgsProject.instance().mapLayers().values() if l.type() == 0 and l not in basemaps_layers]
      for l in layers:
          for c in self.selected_communes(communes):
              expression = "within($geometry, geom_from_wkt('{wkt}'))".format(wkt=c.geometry().asWkt())
              l.selectByExpression(expression, 1)
      QApplication.restoreOverrideCursor()
      self.dlg.close()
```

Dans un premier temps, on souhaite déterminer la **liste des couches** à partir desquelles on va **effectuer la sélection**. 

On récupère donc la liste de toutes les **couches vectorielles** du projet (à l'exception de la couche *Communes*), à laquelle on ajoute les couches *Fonds de plans* si l'utilisateur le désire.

Dans un second temps, on entame **la sélection des entités**. On **boucle sur la liste des couches** que l'on vient de déterminer, et pour chacune d'entre elle on **boucle sur la liste des communes** sélectionnées par l'utilisateur.

C'est à ce moment que la méthode de sélection est **totalement différente** de celle employée dans la première version de l'extension. En effet, il s'agit cette fois-ci d'une **sélection par expression** (voir la [documentation](https://docs.qgis.org/3.10/fr/docs/user_manual/working_with_vector/expression.html?highlight=expression)).

***De manière silmplifiée*** : pour chaque couche `L` et pour chaque commune `C`, on crée une **expression** visant toutes les **entités** de `L` dont la **géométrie est contenue** au sein de `C`. On se contente alors **d'ajouter à la sélection** toutes les entités visées.

## Conclusion

En travaillant à **deux reprises** sur ce projet lors de mon année au sein du service SIG, j'ai pu apprendre **beaucoup de choses**.

### Utilisation d'API

Grâce à l'API de [PyQGIS](https://qgis.org/pyqgis/3.0/) et l'API de [PyQt](https://doc.qt.io/qtforpython/), j'ai été en mesure de développer un plugin simple qui **répond entièrement** aux besoins définis par les utilisateurs.

Cependant, le début du développement et la prise en main de [l'API Python](https://qgis.org/pyqgis/3.0/) de QGIS s'avéra **assez difficile** puisque mon travail sur la première version de l'extension fut ma **première expérience** avec une **API d'une telle ampleur**.

J'ai donc commencé par produire du code qui s'est trouvé être une **mauvaise réecriture** d'outils existants dans l'API.

En voyant que je me dirigeais vers un code assez **compliqué à lire et manipuler**, j'ai décidé de prendre du temps pour **analyser la documentation** de l'API. Par chance, elle se trouve être de bonne qualité, ce qui m'a permis d'arriver au résultat présenté.

Lors du développement de la deuxième version de l'extension, j'ai alors été capable de **trouver rapidement** les informations que je cherchais, en parcourant la **documentation** des deux API citées précédemment.

Ce projet m'aura donc appris à **naviguer dans la documentation d'une API**.

### L'importance du retour utilisateur

Le fait d'avoir pu recevoir un **retour constructif** de la part des utilisateurs m'a bien fait comprendre qu'il est **très difficile** de concevoir un produit **comblant les besoins actuels et futurs** de ses utilisateurs.

C'est pour cette raison qu'il s'avère nécessaire d'effectuer un **bon travail d'analyse** et de réfléchir aux **potentiels besoins futurs** des utilisateurs avant de commencer le travail de développement.

### Etat d'avancement


Le projet SMC est **terminé** au moment où je rédige ce rapport, puisque l'extension a été **livrée aux utilisateurs finaux**.

Ces derniers m'ont affirmé qu'elle **répondait parfaitement à leurs besoins** et que le résultat c**orrespondait à ce qu'ils attendaient**.

De plus, l'extension **n'est pas figée** et sera capable de **s'adapter** à une éventuelle évolution du projet.

En effet, elle est conçue pour fonctionner même lorsque les utilisateurs auront envie **d'ajouter, supprimer ou bien modifier des couches** au sein du projet.