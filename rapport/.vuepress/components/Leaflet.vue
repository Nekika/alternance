<template>
    <div id="mapid"></div>
</template>

<script>
export default {
    data () {
        return {
            map: null,
            popup: null
        }
    },
    methods: {
        onMapClick: function (e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mymap);
        }
    },
    mounted () {
        this.map = L.map('mapid').setView([48.6833, 6.2], 12)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);

        L.marker([48.6833, 6.2]).addTo(this.map)
            .bindPopup("<b>Bonjour !</b><br />Voici une popup.").openPopup();

        L.circle([48.6833, 6.22], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(this.map).bindPopup("Voici un cercle.");

        L.polygon([
            [48.682, 6.15],
            [48.684, 6.17],
            [48.680, 6.19],
        ]).addTo(this.map).bindPopup("Voici un polygone.");

        this.popup = L.popup();

        this.map.on('click', this.onMapClick);
    }
}
</script>

<style scoped>
#mapid {
    width: 100%;
    height: 400px;
}
</style>
