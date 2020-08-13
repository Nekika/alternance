const prerequisItems = [
    { text: 'A propos', link: '/prerequis/' },
    { text: 'QGIS', link: '/prerequis/qgis' },
    { text: 'QGIS Server', link: '/prerequis/qgis-server' },
    { text: 'Lizmap', link: '/prerequis/lizmap' }
]

const projetsAnnexesItems = [
    { text: 'A propos', link: '/projets-annexes/' },
    { text: 'Modal', link: '/projets-annexes/modal' },
    { text: 'SMC', link: '/projets-annexes/smc' }
]

const cartogis54Items = [
    { text: 'A propos', link: '/cartogis54/' },
    { text: 'Application client', link: '/cartogis54/client' },
    { text: 'Plugin QGIS', link: '/cartogis54/plugin' },
    { text: 'Bourgs-Centres', link: '/prerequis/bourgs-centres' },
]

module.exports = {
    title: 'Suivi d\'alternance',
    description: 'Ce rapport présentera l\'institution et le service au sein desquels l\'alternance a été réalisée.',
    themeConfig: {
        sidebar: 'auto',
        nav: [
            { text: 'Accueil', link: '/' },
            { text: 'Présentation', link: '/presentation' },
            { text: 'Prérequis', items: prerequisItems },
            { text: 'Projets annexes', items: projetsAnnexesItems },
            { text: 'CartoGIS54', items: cartogis54Items },
            { text: 'Liens', link: '/liens' }
        ],
        smoothScroll: true
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' }],
        ['script', { src: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js' }]
    ]
}
