<template>
  <ais-index
    app-id="BO057QIXYN"
    api-key="45c9e8d9a8eecb029dc8ef6b0916e719"
    index-name="coins"
  >
    <div class="container">
      <div class="columns">
        <div class="column col-12">
          <ais-search-box></ais-search-box>
        </div>
      </div>
      <div class="columns">
        <div class="column col-2">Filters
          <ais-range-input
            attribute-name="price"
          />
        </div>
        <div class="column col-10">
          <ais-results>
            <template slot-scope="{ result }">
              <h5>
                <ais-highlight :result="result" attribute-name="name"></ais-highlight>
                ({{ result.symbol }})
              </h5>
            </template>
          </ais-results>
        </div>
      </div>

      <ais-menu :attribute="symbol"></ais-menu>

    </div>

    <ais-pagination :padding="2"></ais-pagination>
    <!-- Search components go here -->
  </ais-index>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
