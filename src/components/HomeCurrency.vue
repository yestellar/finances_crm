<template lang="html">
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rates</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Сurrency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="currency in currencies" :key="currency">
            <td>{{currency}}</td>
            <td>{{rates[currency].toFixed(4)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-currency',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>

<style lang="css" scoped>
</style>
