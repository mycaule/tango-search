<template>
  <ais-index app-id="BO057QIXYN" api-key="45c9e8d9a8eecb029dc8ef6b0916e719" index-name="tango">
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <ul class="menu">
            <!-- menu header text -->
            <li class="divider" data-content="JOUR"></li>
            <li class="menu-item">
              <ais-refinement-list attribute-name="date.weekday"></ais-refinement-list>
            </li>

            <li class="divider" data-content="TYPE"></li>
            <li class="menu-item">
              <ais-refinement-list attribute-name="tags"></ais-refinement-list>
            </li>

            <li class="divider" data-content="PRIX"></li>
            <li class="menu-item">
              <ais-range-input attribute-name="price"/>
            </li>

            <li class="divider" data-content="LIEU"></li>
            <li class="menu-item">
              <ais-refinement-list attribute-name="name" limit="30"></ais-refinement-list>
            </li>

            <li class="divider"></li>
            <li class="menu-item">
              <ais-powered-by></ais-powered-by>
            </li>
          </ul>
        </div>
        <div class="column col-8">
          <ais-search-box>
            <div class="input-group">
              <ais-input placeholder="Chercher un évènement" :classNames="{'ais-input': 'form-input'}"/>
              <ais-clear :classNames="{'ais-clear': 'btn btn-default'}">
                <span class="icon icon-stop" aria-hidden="true"></span>
              </ais-clear>
              <button class="btn btn-primary input-group-btn" type="submit">
                <span class="icon icon-search" aria-hidden="true"></span>
              </button>
            </div>
          </ais-search-box>
          <ais-results class="columns">
            <template slot-scope="{ result }">
              <div class="column col-4">
                <div class="card bg-gray">
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
