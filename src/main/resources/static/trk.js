new Vue({
  el: '#q-app',
  data: function () {
    return {
      version: Quasar.version,
        players: [
                { id: "1", 
                  name: "Lionel Messi", 
                  description: "Argentina's superstar" },
                { id: "2", 
                  name: "Christiano Ronaldo", 
                  description: "World #1-ranked player from Portugal" }
            ]
    }
  },
  methods: {
  	notify: function () {
      this.$q.notify('Running on Quasar v' + this.$q.version)
    }
	}
});

Vue.component('player-card', {
    props: ['player'],
    template: `<div class="card">
        <div class="card-body">
            <h6 class="card-title">
                {{ player.name }}
            </h6>
            <p class="card-text">
                <div>
                    {{ player.description }}
                </div>
            </p>
        </div>
        </div>`
});