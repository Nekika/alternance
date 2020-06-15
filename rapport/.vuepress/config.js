module.exports = {
    title: 'Suivi d\'alternance',
    description: 'Ce rapport présentera l\'institution et le service au sein desquels l\'alternance a été réalisée.',
    themeConfig: {
        sidebar: 'auto',
        nav: [
            { text: 'Accueil', link: '/' },
            { text: 'Présentation', link: '/presentation' },
            { text: 'Prérequis', link: '/prerequis/' },
            { text: 'Projets', link: '/projets/' },
            { text: 'Liens', link: '/liens' }
        ],
        smoothScroll: true
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' }],
        ['script', { src: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js' }]
    ]
}
