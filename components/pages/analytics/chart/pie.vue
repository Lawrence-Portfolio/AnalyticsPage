<template>
    <div class="chart-table">
        <div class="chart-table-left" :class="{oneValue: pieData.length == 1}">
            <div class="pie-chart-wrap">
                <div v-if="pieData.length > 1" class="chart-value">{{ chartCurValue }}<span v-if="chartCurValue">%</span></div>
                <canvas class="pie-chart" :id="pieId"></canvas>
            </div>
        </div>
        <div class="chart-table-right" :id="`${pieId}Legend`">
            <!-- <div class="chart-table-row chart-table-header" >
                <div class="chart-table-name">Источник</div>
                <div class="chart-table-value">Объем финансирования</div>
            </div>
            <div ></div> -->
            <!-- <div class="chart-table-row" v-for="item in financeVolumeData" :key="item.value">
                <div class="chart-table-name">
                    <div class="color-block" :style="{background: item.color}"></div>
                    <div>{{ item.name }}</div>
                </div>
                <div class="chart-table-value">{{ moneyFormat(item.value) }} ₽</div>
            </div> -->
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js'
export default {
    props: {
        pieData: Array,
        pieId: String
    },
    data() {
        return {
            chartElem: null,
            chartElemObj: null,
            chartCurValue: null
        }
    },
    methods: {
        async chartInit() {
            let self = this

            if(this.chartElemObj) {
                await this.chartElemObj.destroy()
            }

            this.chartElem = document.getElementById(this.pieId)
            this.chartElemObj = new Chart(this.chartElem, {
                type: 'doughnut',
                data: {
                    labels: this.pieData.map(i => i.name),
                    datasets: [
                        {
                            data: this.toPercentages(this.pieData.map(i => i.value)),
                            label: this.pieData.map(i => this.moneyFormat(i.value)),
                            backgroundColor: this.pieData.map(i => i.color),
                            borderColor: 'rgba(166, 174, 191, 0)',
                            borderWidth: 3,
                            lineTension: 0,
                            pointStyle: 'rect',
                            pointRadius: 10,
                            pointHoverRadius: 15
                        }
                    ]
                },
                options: {
                    legend: { display: false },
                    legendCallback(chart) {
                        let text = []

                        text.push(`
                            <div class="chart-table-row chart-table-header">
                                <div class="chart-table-name">Источник</div>
                                <div class="chart-table-value">Объем финансирования</div>
                            </div>
                        `)
                        for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                            text.push(
                                `
                                    <div class="chart-table-row legend-pie-item" data-legend="${i}">
                                        <div class="chart-table-name">
                                            <div class="color-block" style="background: ${chart.data.datasets[0].backgroundColor[i]}"></div>
                                            <div class="table-item-name">${chart.data.labels[i]}</div>
                                        </div>
                                        <div class="chart-table-value">${chart.data.datasets[0].label[i]} ₽</div>
                                    </div>
                                `
                            )
                        }
                        

                        // text.push(`</div>`)
                        return text.join("");
                        
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function(tooltipItem, data) {
                                return ' ' + data['datasets'][0]['label'][tooltipItem['index']] + ' ₽';
                            },
                            afterLabel: function(tooltipItem, data) {
                                return ' ' + data['datasets'][0]['data'][tooltipItem['index']] + ' %';
                            }
                        }
                    },
                    onClick: (e) => {
                        self.updateChartCurValue(e)
                    }
                }
            })
            // this.chartCurValue = this.toPercentages(this.pieData.map(i => i.value))[0]
            document.getElementById(`${this.pieId}Legend`).innerHTML = this.chartElemObj.generateLegend()
            let legendItems = document.querySelectorAll(`#${this.pieId}Legend .legend-pie-item`)

            let chart = this.chartElemObj
            let updateDataset = function(e, datasetIndex) {
                let meta = chart.getDatasetMeta(0);   
                let result = (meta.data[datasetIndex].hidden == true) ? false : true;
                if(result == true) {
                    
                    meta.data[datasetIndex].hidden = true;
                    e.target.classList.add('show')
                } else {
                    meta.data[datasetIndex].hidden = false;
                    e.target.classList.remove('show')
                }
                self.chartCurValue = null
                chart.update();  
            }

            legendItems.forEach(i => {
                let index = i.getAttribute('data-legend')
                i.addEventListener('click', (e) => updateDataset(e, index))
            })
        },
        updateChartCurValue(e) {
            let self = this

            let getSectionIndex = self.chartElemObj.getElementsAtEvent(e)[0]['_index']
            let value = self.chartElemObj.config.data.datasets[0].data[getSectionIndex]
            if(self.chartCurValue == value) {
                self.chartCurValue = null
            } else {
                self.chartCurValue = value
            }
        },
        toPercentages(list) {
            let total = 0;
            for(let i = 0; i < list.length; i++) {
                total += list[i];
            }
            return list.map(function(x) {
                return parseFloat((x * 100 / total).toFixed(1));
            });
        },
        moneyFormat(n) {
            return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
        }
    },
    mounted() {
        this.chartInit()
    },
    watch: {
        pieData() {
            this.chartInit()
        }
    }
}
</script>
<style lang="scss">
    @import '../../../../assets/scss/variables.scss';
    .analytics {
        .chart-value {
            position: absolute;
            font-weight: 700;
            color: $main_color;
        }
        .pie-chart-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
        .pie-chart {
            position: relative;
        }
        .oneChartValue {
            font-size: 12px;
            padding: 5px;
            z-index: 1;
            color: #fff;
            border-radius: 50%;
        }
        .chart-table-name,
        .color-block,
        .table-item-name,
        .chart-table-value {
            pointer-events: none;
        }
        .legend-pie-item {
            cursor: pointer;
            // position: relative;
            // &::before {
            //     display: none;
            //     content: '';
            //     position: absolute;
            //     left: 0;
            //     right: 0;
            //     top: 21px;
            //     height: 1px;
            //     background-color: #000;
            // }
        }
        .legend-pie-item.show {
            text-decoration: line-through;
            // display: block;
        }
    }
</style>