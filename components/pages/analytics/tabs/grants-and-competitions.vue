<template>
    <article class="tab-panel">
        <section class="block">
            <h2 class="title">Сведения о количестве грантов, конкурсов и объемах</h2>
            <div class="select-year-wrap">
                Период для отображения:
                <el-select 
                    v-model="year" 
                    class="el-select_default"
                    :popper-append-to-body="false"
                    placeholder="Выберете год"
                    @change="updateDataVolume"
                >
                    <el-option
                        v-for="item in requestData.requsetDataYears"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="slider-wrap">
                <VueSlickCarousel v-bind="slickOptions">
                    <div class="slide">
                        <div class="slide-wrap">
                        <div class="header-slide">
                            <div class="header-name">Конкурсов объявлено</div>
                            <div class="header-year">{{ year }}</div>
                        </div>
                        <div class="body-slide">
                            <div class="body-data">{{ requestData.requestDataVolume.competitions_announced }}</div>
                        </div>
                        <div class="footer-slide"></div>
                        </div>
                    </div>
                    <div class="slide">
                        <div class="slide-wrap">
                        <div class="header-slide">
                            <div class="header-name">Грантов выдано</div>
                            <div class="header-year">{{ year }}</div>
                        </div>
                        <div class="body-slide">
                            <div class="body-data">{{ requestData.requestDataVolume.grants_issued }}</div>
                        </div>
                        <div class="footer-slide"></div>
                        </div>
                    </div>
                    <div class="slide">
                        <div class="slide-wrap">
                        <div class="header-slide">
                            <div class="header-name">Объем финансирования</div>
                            <div class="header-year">{{ year }}</div>
                        </div>
                        <div class="body-slide">
                            <div class="body-data">{{ requestData.requestDataVolume.funding_volume }} <span class="suffix">млрд.</span></div>
                        </div>
                        <div class="footer-slide"></div>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </section>
        <section class="selects-section" :style="{ height: selectsHeight + 'px' }">
            <div class="selects-wrap">
                <div class="selects-title">
                    <div>Праметры отображения данных</div>
                    <div v-show="width < 992" class="selects-dropdown" @click="isFiltersShow = !isFiltersShow"></div>
                </div>
                <div v-show="isFiltersShow" class="selects-block">
                    <a-row>
                        <a-col span="24" :md="{ span: 8 }">
                            <div class="select-group">
                                <div class="label">Источники финансирования:</div>
                                <el-select
                                    v-model="financeVolume"
                                    :popper-append-to-body="false"
                                    placeholder="Все источники"
                                    @change="selectFinanceVolume"
                                    class="select-filter">
                                    <el-option
                                        label="Все источники"
                                        value="all">
                                    </el-option>
                                    <el-option
                                        v-for="item in requestData.requestFinancingVolume"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </a-col>
                        <a-col span="24" :md="{ span: 8 }">
                            <div class="select-group">
                                <div class="label">Организации:</div>
                                <el-select
                                    v-model="fundVolume"
                                    :popper-append-to-body="false"
                                    placeholder="Все организации"
                                    @change="selectFundVolume"
                                    class="select-filter"
                                    filterable
                                    no-match-text="Не найдено">
                                    <el-option
                                        label="Все организации"
                                        value="all">
                                    </el-option>
                                    <el-option
                                        v-for="item in funds"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </a-col>
                        <a-col span="24" :md="{ span: 8 }">
                            <div class="select-group">
                                <div class="label">Вид исследования:</div>
                                <el-select
                                    v-model="researchVolume"
                                    :popper-append-to-body="false"
                                    placeholder="Все виды"
                                    @change="selectResearchVolume"
                                    class="select-filter">
                                    <el-option
                                        label="Все виды"
                                        value="all">
                                    </el-option>
                                    <el-option
                                        v-for="item in requestData.requestResearchingVolume"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </section>
        <section class="block block-table">
            <h2 class="title">Объем финансирования научных проектов в разрезе источников финансирования и организаций</h2>
            <div class="table-wrap">
                <table>
                    <tr>
                        <td>Организация</td>
                        <td>Конкурсов объявлено</td>
                        <td>Грантов выдано</td>
                        <td>Объем финансирования</td>
                    </tr>
                    <template v-if="paginationData.length != 0">
                        <tr v-for="item in paginationData" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td><span class="mobile-table-info">Конкурсов объявлено</span> {{ item.competitions_announced }}</td>
                            <td><span class="mobile-table-info">Грантов выдано</span> {{ item.grants_issued }}</td>
                            <td><span class="mobile-table-info">Объем финансирования</span> {{ moneyFormat(item.funding_volume) }} ₽</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>Не найдено</tr>
                    </template>
                </table>
            </div>
            <a-pagination v-model="currentPage" :total="funds.length" :page-size="pageSize" show-less-items />
        </section>
        <section class="block block-table">
            <h3 class="title">По источникам финансирования</h3>
            <pie-chart pieId='financeChart' :pieData="financeVolumeData" ref="financePie"></pie-chart>
        </section>
        <section class="block block-table">
            <h3 class="title">По видам исследований</h3>
            <pie-chart pieId='researchChart' :pieData="researchVolumeData"></pie-chart>
        </section>
    </article>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import pieChart from '../chart/pie'

export default {
    components: {
        VueSlickCarousel,
        'pie-chart': pieChart
    },
    props: {
        requestData: Object
    },
    data() {
        return {
            width: 0,

            currentPage: 1,
            pageSize: 10,
            year: this.requestData.requsetDataYears[0],

            selectsElem: null,
            selectsHeight: 0,
            isFiltersShow: true,

            financeVolume: '',
            fundVolume: '',
            researchVolume: '',

            financeVolumeData: this.requestData.requestFinancingVolume,
            researchVolumeData: this.requestData.requestResearchingVolume,

            slickOptions: {
                slidesToShow: 3,
                arrows: false,
                swipe: false,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                        slidesToShow: 1,
                        arrows: true,
                        swipe: true,
                        }
                    }
                ]
            }
        }
    },
    computed: {
        funds() {
            let funds = this.requestData.requestFunds
            let newValue = []
            funds.map(i => {
                let item = this.requestData.requestFundsVolume.filter(j => {
                    if(j.fund_id == i.id) {
                        const item = {
                            name: i.name,
                            id: i.id,
                            competitions_announced: j.volume.competitions_announced,
                            funding_volume: j.volume.funding_volume,
                            grants_issued: j.volume.grants_issued
                        }
                        newValue.push(item)
                    }
                })
            })
            return newValue.sort((a, b) => b.funding_volume - a.funding_volume)
        },
        paginationData() {
            const start = (this.currentPage - 1) * this.pageSize,
                    end = start + this.pageSize;
            return this.funds.slice(start, end)
        }
    },
    methods: {
        updateDataVolume() {
            this.$emit('update-data-volume', this.year)
        },
        async selectFinanceVolume(value) {
            if(this.financeVolume == 'all') {
                this.financeVolume = ''
                this.financeVolumeData = this.requestData.requestFinancingVolume
            } else {
                this.financeVolumeData = this.requestData.requestFinancingVolume.filter(i => i.name == value)
            }
            this.filterFundsVolume()

        },
        selectFundVolume() {
            if(this.fundVolume == 'all') {
                this.fundVolume = ''
                // this.financeVolumeData = this.requestData.requestResearchingVolume
            }
            this.filterFundsVolume()
        },
        selectResearchVolume(value ) {
            if(this.researchVolume == 'all') {
                this.researchVolume = ''
                this.researchVolumeData = this.requestData.requestResearchingVolume
            } else {
                this.researchVolumeData = this.requestData.requestResearchingVolume.filter(i => i.name == value)
            }
            this.filterFundsVolume()
        },
        filterFundsVolume() {            
            const requestData = {
                fund_id: this.fundVolume,
                financing_source: this.financeVolume,
                research_type: this.researchVolume
            }
            this.$emit('filter-funds-volume', requestData)
        },
        moneyFormat(n) {
            return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
        }
    },
    mounted() {
        this.updateDataVolume()

        this.selectsElem = document.querySelector('.selects-wrap')
        this.selectsHeight = this.selectsElem.offsetHeight

        const self = this
        window.addEventListener('scroll', e => {
            let h = pageYOffset
            if(h > 350) {
                self.selectsElem.classList.add('fixed')
            } else {
                self.selectsElem.classList.remove('fixed')
            }
        })
        this.width = window.innerWidth
        window.addEventListener('resize', e => {
            self.width = window.innerWidth
            self.selectsHeight = self.selectsElem.offsetHeight
            if(self.width < 992) {
                self.isFiltersShow = false
            } else {
                self.isFiltersShow = true
            }
        })
        
    }
}
</script>

<style lang="scss">
    @import '../../../../assets/scss/variables.scss';
    @media(min-width: 576px) {
        .selects-wrap.fixed {
            max-width: 540px;
        }
    }
    @media(min-width: 768px) {
        .selects-wrap.fixed {
            max-width: 720px;
        }
    }
    @media(min-width: 992px) {
        .selects-wrap.fixed {
            max-width: 960px;
        }
    }
    @media(min-width: 1200px) {
        .selects-wrap.fixed {
            max-width: 1120px;
        }
    }
    .analytics {
        position: relative;
        .selects-wrap.fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            // max-width: 1140px;
            margin: 0 auto;
            z-index: 1000;
        }
        .selects-section {
            margin-bottom: 30px;
        }
        .ant-pagination {
            margin-top: 30px;
        }
        .block {
            margin-bottom: 30px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .select-year-wrap {
            margin-bottom: 20px;
        }
        .block-table .title {
            margin-bottom: 30px;
        }
        .slider-wrap {
            margin: 0 -15px;
            .slick-arrow {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #1f2e6a;
                font-size: 0;
                border: 0;
                padding: 0;
                min-width: 37px;
                height: 48px;
                outline: none;
                &::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 9px);
                    left: calc(50% - 4.5px);
                    width: 9px;
                    height: 18px;
                    background-image: url(../../../../assets/img/svg/angle-left.svg);
                }
            }
            .slick-arrow.slick-next {
                transform: rotate(180deg);
            }
        }
        .slide-wrap {
            padding: 0 15px;
            .header-slide {
                padding: 8px 35px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #fff;
                background-color: $second_color;
            }
            .body-slide {
                padding: 9px 35px;
                font-size: 44px;
                font-weight: 700;
                color: #1F2E6A;
                background-color: rgba(235, 238, 243, 0.25);
            }
            .body-slide .suffix {
                font-weight: 400;
                font-size: 24px;
            }
            .footer-slide {
                height: 5px;
                background-color: $second_color;
            }
        }
        .selects-wrap {
            margin: 0 -25px;
        }
        .selects-dropdown {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 35px;
            height: 35px;
            background-color: #5b6fbe;
            &:before {
            content: "";
                position: absolute;
                width: 13px;
                height: 7px;
                background-image: url(../../../../assets/img/svg/angle-down-w.svg);
            }
        }
        .selects-title {
            display: flex;
            justify-content: space-between;
            padding: 10px 25px;
            font-weight: 700;
            color: #fff;
            background-color: $main_color;
        }
        .selects-block {
            padding: 30px 25px;
            background-color: #ebeef3;
            .ant-row {
                margin: 0 -15px;
            }
            .ant-col {
                padding: 0 15px;
            }
            .label {
                color: #a6aebf;
                margin-bottom: 20px;
            }
        }
        .select-filter {
            width: 100%;
            border: 1px solid $main_color;
            background-color: #fff;
            .el-input {
                padding-left: 15px;
                display: flex;
                height: 41px;
            }
            .el-input__inner {
                height: auto;
            }
            .el-input__suffix {
                height: auto;
                margin: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 35px;
                position: relative;
                right: 0;
                background-color: $main_color;
            }
            .el-input__icon {
                color: #fff!important;
            }
        }
        .table-wrap {
            table {
                border-bottom: 5px solid $second_color;
                display: flex;
                flex-direction: column;
                flex: 1 1;
            }
            tr {
                padding: 10px 35px;
                display: flex;
                &:first-child {
                    padding: 12px 35px;
                    color: #fff;
                    background-color: $second_color!important;
                }
                &:nth-child(odd) {
                    background-color: rgba(235,238,243,.5);
                } 
                &:nth-child(even) {
                    background-color: rgba(235,238,243,.25);
                }
                &:not(:first-child) {
                    td {
                        &:not(:first-child) {
                            font-weight: 700;
                            color: $main_color;
                        }
                    }
                }
            }
            td {
                padding: 0;
                flex: 1 1;
                &:first-child {
                    flex: 1 1 200px;
                }
                &:nth-last-child(-n+3) {
                    text-align: right;
                }
            }
        }
        .chart-table {
            overflow: hidden;
            position: relative;
            border-bottom: 5px solid $second_color;
            display: flex;
            .chart-table-left {
                margin: 50px 0px 10px;
                position: relative;
                min-width: 400px;
            }
            .chart-table-left.oneValue {
                 margin: 45px 0px 5px;
            }
            .chart-table-right {
                flex: 1 1;
            }
            .chart-table-row {
                padding: 10px 40px;
                display: flex;
                justify-content: space-between;
                &:nth-child(even) {
                    background-color: rgba(235,238,243,.5);
                }
                &:not(:first-child) {
                    .chart-table-value {
                        font-weight: 700;
                        color: $main_color;
                    }
                }
            }
            .chart-table-header {
                position: relative;
                color: #fff;
                .chart-table-name,
                .chart-table-value {
                    position: relative;
                    z-index: 1;
                }
                &::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 2000px;
                    background-color: $second_color;
                }
            }
            .chart-table-name {
                max-width: 350px;
                display: flex;
            }
        }
    }
    @media(min-width: 992px) {
        .analytics {
            .mobile-table-info {
                display: none;
            }
        }
    }
    @media(max-width: 1199px) {
        .analytics .table-wrap td:first-child {
            flex: 1 1 70px;
        }
    }
    @media(max-width: 991px) {
        .analytics {
            .slider-wrap {
                margin: 0 -25px;
                .slick-slider {
                    display: flex;
                    align-items: center;
                }
            }
            .slide-wrap {
                padding: 0;
            }
            .chart-table {
                flex-direction: column;
                .chart-table-left {
                    margin: 0 0 30px 0;
                    min-width: auto;
                    max-width: 200px;
                }
            }
            .pie-chart-wrap {
                position: relative;
            }
            .selects-title {
                padding: 5px 25px;
                align-items: center;
            }
            .selects-block {
                position: absolute;
                left: 0;
                right: 0;
                top: calc(100%);
            }
            .selects-wrap {
                position: relative;
            }
            .table-wrap {
                .mobile-table-info {
                    font-weight: 400;
                }
                tr {
                    padding: 10px 20px;
                    flex-direction: column;
                    &:first-child {
                        padding: 12px 20px;
                        td:nth-last-child(-n+3) {
                            display: none;
                        }
                    }
                    &:not(:first-child)  {
                        td {
                            &:first-child {
                                margin-bottom: 20px;
                            }
                            &:not(:first-child) {
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                    
                }
                td {
                    &:nth-last-child(-n+3) {
                        text-align: left;
                    }
                    &:first-child {
                        flex: 1 1 auto;
                    }
                }
            }
        }
    }
    @media(max-width: 767px) {
        .analytics {
            .chart-table {
                .chart-table-row {
                    flex-direction: column;
                    &:first-child {
                        .chart-table-value {
                            display: none;
                        }
                    }
                }
                .chart-table-name {
                    max-width: 100%;
                }
                .chart-table-value {
                    margin-left: 28px;
                }
            }
            .selects-block {
                .ant-col {
                    margin-bottom: 20px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    @media(max-width: 575px) {
        .analytics {
            .table-wrap {
                margin: 0 -25px;
            }
            
            
            .slider-wrap {
                margin: 0 -25px;
                tr {
                    padding: 10px 20px;
                    &:first-child {
                       padding: 12px 20px; 
                    }
                }
            }
            .slide-wrap {
                padding: 0;
            }
            .chart-table {
                 margin: 0 -25px;
                .chart-table-row {
                    padding: 10px 20px;
                }
            }
        }        
    }
</style>
