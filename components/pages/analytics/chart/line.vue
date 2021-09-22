<template>
    <div class="line-chart-wrap">
        <canvas :id="chartId"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js'

export default {
    props: {
        chartData: Object,
        chartId: String
    },
    methods: {
        lineChartInit() {
            let lineChart = document.getElementById(this.chartId);
            let lineChartObj = new Chart(lineChart, this.chartData)
        }
    },
    mounted() {
        this.lineChartInit()
    }
}
</script>
<style lang="scss">
    .analytics {
        .line-chart-wrap {
            height: 400px;
        }
    }
</style>