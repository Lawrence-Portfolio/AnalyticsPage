<template>
    <section class="tab-panel  scientific-activity">
        <h2 class="title">Сведения о результатах научной деятельности</h2>
        <div class="legend-wrap">
            <div class="legend-item">
                <div class="color-block" :style="{ background: 'rgb(166, 174, 191)' }"></div>
                <div class="legend-name" :style="{ color:  'rgb(166, 174, 191)' }">Итого</div>
            </div>
            <div class="legend-item">
                <div class="color-block" :style="{ background: 'rgb(91, 111, 190)' }"></div>
                <div class="legend-name" :style="{ color: 'rgb(91, 111, 190)' }">Зарегистрировано РИД</div>
            </div>
            <div class="legend-item">
                <div class="color-block" :style="{ background: 'rgb(31, 46, 106)' }"></div>
                <div class="legend-name" :style="{ color: 'rgb(31, 46, 106)' }">Научных публикаций</div>
            </div>
        </div>
        <line-chart :chartData="chartData" chartId="lineChart"></line-chart>
    </section>
</template>
<script>
import lineChart from '../chart/line'

export default {
    components: {
        'line-chart': lineChart
    },
    props: {
        requestData: Object
    },
    data() {
        return {
            chartData: {}
        }
    },
    methods: {
        chartDataValues() {
            let totalYears = [...this.requestData.requestCountRids.map(i => i.year), ...this.requestData.requestCountPublicationsByYears.map(i => i.year)]
            totalYears = totalYears.filter((item, index) => {
                return totalYears.indexOf(item) === index
            })
            totalYears = totalYears.sort().splice(-1 * 5)
            console.log(totalYears)

            let totalValues = totalYears.map(i => {
                return { year: i, count: 0 }
            })
            totalValues.filter(i => {
                this.requestData.requestCountRids.filter(j => {
                    if(i.year == j.year) {
                        i.count = i.count + j.count
                    }
                })
            })
            totalValues.filter(i => {
                this.requestData.requestCountPublicationsByYears.filter(j => {
                    if(i.year == j.year) {
                        i.count = i.count + j.count_publications
                    }
                })
            })
            this.chartData = {
                type: 'line',
                data: {
                    labels: totalYears,
                    datasets: [
                        {
                            label: 'Итого',
                            data: totalValues.map(i => {
                                return { x: i.year, y: i.count }
                            }),
                            backgroundColor: ['rgba(255, 255, 255, 0)'],
                            borderColor: ['#A6AEBF'],
                            borderWidth: 3,
                            lineTension: 0,
                            pointStyle: 'rect',
                            pointBackgroundColor: '#A6AEBF',
                            pointBorderColor: 'rgba(166, 174, 191, 0)',
                            pointRadius: 10,
                            pointHoverRadius: 15
                        },
                        {
                            label: 'Зарегестрированно РИД',
                            data: this.requestData.requestCountRids.map(i => {
                                return { x: i.year, y: i.count }
                            }),
                            backgroundColor: ['rgba(255, 255, 255, 0)'],
                            borderColor: ['#5B6FBE'],
                            borderWidth: 3,
                            lineTension: 0,
                            pointStyle: 'rect',
                            pointBackgroundColor: '#5B6FBE',
                            pointBorderColor: 'rgba(166, 174, 191, 0)',
                            pointRadius: 10,
                            pointHoverRadius: 15
                        }, 
                        {
                            label: 'Научных публикаций',
                            data: this.requestData.requestCountPublicationsByYears.map(i => {
                                return { x: i.year, y: i.count_publications }
                            }),
                            backgroundColor: ['rgba(255, 255, 255, 0)'],
                            borderColor: ['#1F2E6A'],
                            borderWidth: 3,
                            lineTension: 0,
                            pointStyle: 'rect',
                            pointBackgroundColor: '#1F2E6A',
                            pointBorderColor: 'rgba(166, 174, 191, 0)',
                            pointRadius: 10,
                            pointHoverRadius: 15
                        },
                    ]
                },
                options: {
                    legend: { display: false },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            }
        }
    },
    created() {
        this.chartDataValues()
    }
}
</script>
<style lang="scss">
    .analytics {
        .legend-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
        }
        .legend-item {
            display: flex;
            margin-left: 40px;
            &:first-child {
                margin-left: 0;
            }
        }
        .scientific-activity {
            .title {
                margin-bottom: 30px;
            }
        }
    }
    @media(max-width: 767px) {
        .analytics {
            .legend-wrap {
                flex-direction: column;
            }
            .legend-item {
                margin-left: 0;
                margin-bottom: 10px;
            }
        }
        
    }
</style>