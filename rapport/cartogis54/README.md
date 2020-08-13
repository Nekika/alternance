---
title: CartoGIS54 - À propos
prev: /projets-annexes/smc
next: /cartogis54/client
sidebar: false
---

# CartoGIS54

**CartoGIS54** est le nom du projet principal sur lequel j'ai eu l'occasion de travailler en tant que seul et unique développeur lors de mon apprentissage au sein du **service SIG**.

Démarré en janvier 2020 dans le but de répondre à un seul besoin, ce projet a **évolué** de par l'envie de **rendre cet outil générique et applicable à d'autres problématiques**, ce qui le fait aujourd'hui tendre vers ce qui pourrait s'apparenter à un **framework permettant de créer rapidement des applications Web de cartographie**.

De ce fait, je ne présenterai pas le projet dans l'ordre chronologique de sa réalisation mais plutôt d'une manière permettant de **comprendre ce qu'est cet outil, comment a-t-il été développé et comment l'utiliser pour créer une application Web**.

## Principe

Cet outil prend la forme d'une **application Web standard** dont le code source est **téléchargeable librement** depuis [GitHub](https://github.com/infogeo54/CartoGIS54.git).

Il suffit alors de **l'installer**, de la **configurer** et la **compiler** avant de la **déployer** sur un serveur Web.

Pensée pour être utilisée en combinaison avec le couple **QGIS/QGIS Server**, l'application est capable de communiquer avec n'importe quel autre fournisseur de **flux WMS/WFS** (cf. [présentation de QGIS Server](/prerequis/qgis-server.html#flux-wms-wfs)) tel que **GeoServer**.

Il est néanmoins conseillé d'avoir recours à QGIS et QGIS Server puisqu'un **plugin QGIS permettant de faciliter la partie configuration de l'application a été développé en parallèle**.

Pour résumer, **CartoGIS54** est un **ensemble d'outils** prenant place dans un **écosytème SIG** et **facilitant le développement d'applications Web de cartographie**.


## Outils

### **[Application client](/cartogis54/client)**

Une **interface** permettant **d'intéragir avec des géodonnées depuis un navigateur Web.**

### **[Plugin QGIS](/cartogis54/plugin)**

Une **extension** facilitant **la configuration de l'application client en se basant sur la configuration du projet QGIS**.

## Exemple d'application

### **[Bourgs-Centres](/cartogis54/bourgs-centres)**

**Bourgs-Centres** est le projet à l'origine de la création de **CartoGIS54**. 

Il s'agit d'une solution permettant aux maires de certaines communes du **Département de Meurthe-et-Moselle** de **localiser** et de **saisir des informations à propos de projets d'amménagements futurs ou existants**.
