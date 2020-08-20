<template>
    <div class="schema">
        <div class="interface">
            <div class="header" style="min-height: 50px"></div>
            <div class="main">
                <div v-for="p in parts"
                 :key="p.name"
                 :class="p.name">
                <div v-for="c in p.children"
                     :key="c.name"
                     :class="c.name">
                </div>
            </div>
            </div>
        </div>
        <ul class="cartouche">
            <li>
                <span class="symbole header"></span>
                En-tête
            </li>
            <li v-for="s in symbols" :key="s">
                <span :class="`symbole ${s}`"></span>
                {{ firstLetterToUppercase(s) }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            parts: [
                { name: 'menu', children: [ { name: 'couches' }, { name: 'légende' } ] },
                { name: 'carte'},
                { name: 'formulaire' }
            ]
        }
    },
    computed: {
        symbols () {
            return this.parts.map(p => {
                let children = []
                if (p.children) children = p.children.map(c => c.name)
                return [p.name, ...children]
            }).flat(2)
        }
    },
    methods: {
        firstLetterToUppercase (word) { return word.charAt(0).toUpperCase() + word.slice(1) }
    }
}
</script>

<style scoped>
    
    .header {
        border: solid 1px rgba(0, 128, 128);
        background-color: rgba(0, 128, 128, 0.3);
    }
    .main {
        min-height: 300px;
        display: grid;
    }
    .menu {
        border: solid 4px orange;
        grid-column: 1 / 4;
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .couches {
        background-color: rgba(128, 0, 128, 0.3);
    }
    .légende {
        background-color: rgba(0, 0, 128, 0.3);
    }
    .carte {
        border: solid 1px rgba(0, 128, 0);
        background-color: rgba(0, 128, 0, 0.3);
        grid-column: 4 / 12;
    }
    .formulaire {
        border: solid 1px rgba(255, 0, 0);
        background-color: rgba(255, 0, 0, 0.3);
        grid-column: 12 / 15;
    }
    .cartouche {
        padding: 0;
    }
    .cartouche li {
        list-style: none;
        display: flex;
        align-items: center;
    }
    .symbole {
        box-sizing: border-box;
        width: 30px;
        height: 10px;
        display: block;
        margin-right: 5px;
    }
</style>
