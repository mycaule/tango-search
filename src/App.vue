<template>
  <ais-index
    app-id="BO057QIXYN"
    api-key="45c9e8d9a8eecb029dc8ef6b0916e719"
    index-name="tango"
  >
    <div class="container">
      <ais-search-box></ais-search-box>
      <div class="columns">
        <div class="column col-3">
          <div class="form-group">
            <label class="form-label" for="weekday">Jour</label>
            <ais-refinement-list attribute-name="date.weekday" id="weekday"></ais-refinement-list>
          </div>

          <div class="form-group">
            <label class="form-label" for="tags">Type</label>
            <ais-refinement-list attribute-name="tags" id="tags"></ais-refinement-list>
          </div>

          <div class="form-group">
            <label class="form-label" for="price">Prix</label>
            <ais-range-input attribute-name="price" id="price"/>
          </div>

          <div class="form-group">
            <label class="form-label" for="venue">Lieu</label>
            <ais-refinement-list attribute-name="name" id="venue" limit="30"></ais-refinement-list>
          </div>
        </div>
        <div class="column col-8">
          <ais-results class="columns">
            <template slot-scope="{ result }">
              <div class="column col-4">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title h5"><ais-highlight :result="result" attribute-name="name"></ais-highlight></div>
                    <div class="card-subtitle text-gray">
                      {{result.price}}€</div>
                  </div>
                  <div class="card-footer">
                    <b>{{result.date.weekday}} {{result.date.day}} {{toMonth(result.date.month)}}</b><br>
                    <b><a target="_blank" :href="`https://www.google.com/calendar/render?action=TEMPLATE&text=${result.name}&dates=${beginDate(result)}/${endDate(result)}&details=${result.price} euros&location=${result.location.address}, ${result.location.postcode} ${result.location.city}, France&sf=true&output=xml`">{{result.time.begin}}</a></b>
                  </div>
                </div>
              </div>
            </template>
          </ais-results>

          <ais-pagination :padding="2"></ais-pagination>
          <ais-powered-by></ais-powered-by>
        </div>
      </div>
    </div>
  </ais-index>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toMonth,
      beginDate,
      endDate
    }
  }
}

const toMonth = (num) => (num === 1) ? 'janvier' :
  (num === 2) ? 'fevrier' :
  (num === 3) ? 'mars' :
  (num === 4) ? 'avril' :
  (num === 5) ? 'mai' :
  (num === 6) ? 'juin' :
  (num === 7) ? 'juillet' :
  (num === 8) ? 'août' :
  (num === 9) ? 'septembre' :
  (num === 10) ? 'octobre' :
  (num === 11) ? 'novembre' :
  (num === 12) ?'décembre' : '???'

// -TODO smart date like yesterday, today, tomorrow...

const beginDate = (res) => {
  const date = res.date
  const time = res.time.begin.split(':')

  const dateJS = new Date(date.year, date.month-1, date.day, time[0], time[1])
  return dateJS.toISOString().replace(/(\.000|:|-)/g,'')
}

const endDate = (res) => {
  const date = res.date
  const time = res.time.end.split(':')

  const dateJS = new Date(date.year, date.month-1, (time[0][0] === '0') ? date.day + 1 : date.day, time[0], time[1])
  return dateJS.toISOString().replace(/(\.000|:|-)/g,'')
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
