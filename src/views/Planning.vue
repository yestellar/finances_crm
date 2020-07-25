<template lang="html">
  <div class="planning">
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">No categories yet. <router-link to="/categories">Add new category</router-link></p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          Spent {{category.spent | currency }} out of {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="category.progressColor"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('PlanningTitle')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(category => {
      const spent = records
        .filter(r => r.categoryId === category.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spent / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = category.limit - spent
      const tooltip = `${tooltipValue < 0 ? 'Overflowing' : 'Left'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...category,
        progressPercent,
        progressColor,
        spent,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>

<style lang="css" scoped>
</style>
