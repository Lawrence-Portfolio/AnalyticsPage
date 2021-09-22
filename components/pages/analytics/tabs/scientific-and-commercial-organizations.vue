<template>
    <section class="tab-panel">
        <div>
            <h2 class="title">Сведения о количестве организаций и научных проектов</h2>
            <div class="select-map-wrap">
                Отображение
                <el-select 
                    v-model="map" 
                    :popper-append-to-body="false"
                    placeholder="Выберете тип карты"
                    class="select-map">
                    <el-option
                        v-for="item in maps"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <section class="map-data-section">
            <a-row v-show="map" type="flex">
                <a-col span="24" order="2" :lg="{ span: 8, order: 1 }" class="map-data-section-col">
                    <el-select 
                        v-model="country" 
                        :popper-append-to-body="false"
                        placeholder="Выберете страну"
                        @change="selectCountry"
                        filterable
                        no-match-text="Не найдено">
                        <el-option
                            v-for="item in requestData.requestCountries"
                            :key="item['iso-2']"
                            :label="item.name"
                            :value="item['iso-2']">
                        </el-option>
                    </el-select>
                    <div class="map-data-items">
                        <div class="map-data-item">
                            <div class="map-data-name">Научных и образовательных организаций</div>
                            <div class="map-data-value" v-for="item in requestData.requestCountOrganizationsByCountries.filter(i => i['iso-2'] == country)" :key="item['iso-2']">{{ item.count_organizations }}</div>
                        </div>
                        <div class="map-data-item">
                            <div class="map-data-name">Фондов и коммерческих организаций</div>
                            <div class="map-data-value" v-for="item in requestData.requestCountFundsByCountries.filter(i => i['iso-2'] == country)" :key="item['iso-2']">{{ item.count_funds }}</div>
                        </div>
                    </div>
                    <el-select
                        v-model="countryScientificDirections"
                      
                        placeholder="Все"
                        @change="filterCountProjByCountry">
                        <el-option
                            label="Все"
                            value="all">
                        </el-option>
                        <el-option
                            v-for="item in requestData.requestScientificDirections"
                            :key="item.code"
                            :label="`${item.code}: ${item.name}`"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    <div class="map-data-items">
                        <div class="map-data-item" v-for="item in requestData.requestCountProjectsByCountries.filter(i => i['iso-2'] == country)" :key="item['iso-2']">
                            <div class="map-data-name">Научных проектов</div>
                            <div class="map-data-value">{{ item.projects_count }}</div>
                        </div>
                    </div>
                </a-col>
                <a-col span="24" order="1" :lg="{ span: 16, order: 2 }">      
                    <div class="map-wrap" id="worldMap">
                        <world-map></world-map>
                    </div>
                </a-col>
            </a-row>
            <a-row type="flex" v-show="!map">
                <a-col  :lg="{ span: 8, order: 1 }" class="map-data-section-col">
                    <el-select 
                        v-model="region" 
                        :popper-append-to-body="false"
                        placeholder="Выберете регион"
                        @change="selectRegion">
                        <el-option
                            v-for="item in requestData.requestRegions"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                    <div class="map-data-items">
                        <div class="map-data-item">
                            <div class="map-data-name">Научных и образовательных организаций</div>
                            <div class="map-data-value" v-for="item in requestData.requestCountOrganizationsByRegions.filter(i => i.region_code == region)" :key="item.region_code">{{ item.count_organizations }}</div>
                        </div>
                        <div class="map-data-item">
                            <div class="map-data-name">Фондов и коммерческих организаций</div>
                            <div class="map-data-value" v-for="item in requestData.requestCountFundsByRegions.filter(i => i.region_code == region)" :key="item.region_code">{{ item.count_funds }}</div>
                        </div>
                    </div>
                    <el-select
                        v-model="regionScientificDirections"
                        :popper-append-to-body="false"
                        placeholder="Все"
                        @change="filterCountProjByRegion">
                        <el-option
                            label="Все"
                            value="all">
                        </el-option>
                        <el-option
                            v-for="item in requestData.requestScientificDirections"
                            :key="item.code"
                            :label="`${item.code}: ${item.name}`"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    <div class="map-data-items">
                        <div class="map-data-item" v-for="item in requestData.requestCountProjectsByRegions.filter(i => i.code == region)" :key="item.code">
                            <div class="map-data-name">Научных проектов</div>
                            <div class="map-data-value">{{ item.count_projects }}</div>
                        </div>
                    </div>
                </a-col>
                <a-col  :lg="{ span: 16, order: 2 }">
                    <div class="map-wrap" id="regionalMap">
                        <region-map></region-map>
                    </div>
                </a-col>
            </a-row>
        </section>
    </section>
</template>
<script>
import worldMap from '../maps/world'
import regionMap from '../maps/region'

export default {
    components: {
        'world-map': worldMap,
        'region-map': regionMap
    },
    props: {
        requestData: Object
    },
    data() {
        return {
            map: true,
            maps:[{
                name: 'Карта мира',
                value: true
            }, {
                name: 'Субъекты РФ',
                value: false
            }],
            worldMap: null,
            regionMap: null,
            country:  '',
            countryScientificDirections: '',
            regionScientificDirections: '',
            region: '',
        }
    },
    methods: {
        selectCountry(id) {
            this.findCountry(id)
        },
        selectRegion(id) {
            this.findRegion(id)
        },
        findCountry(id) {
            this.requestData.requestCountries.filter(i => {
                if(i['iso-2'] === id) {
                    this.country = i['iso-2']
                }
            })
            this.worldMap.forEach(i => {
                if(i.id === this.country) {
                    i.classList.add('active-country-map')
                } else {
                    i.classList.remove('active-country-map')
                }
            })
        },
        findRegion(id) {
            this.requestData.requestRegions.filter(i => {
                if(i.code === id) {
                    this.region = i.code
                }
            })
            this.regionMap.forEach(i => {
                if(i.id === this.region) {
                    i.classList.add('active-country-map')
                } else {
                    i.classList.remove('active-country-map')
                }
            })
        },
        mapsInit() {
            const self = this
            this.worldMap = this.$el.querySelectorAll('#worldMap path')
            this.regionMap = this.$el.querySelectorAll('#regionalMap path')
            
            this.worldMap.forEach(i => {
                const id = i.id
                i.addEventListener('click', e => self.findCountry(id))
            })
            this.regionMap.forEach(i => {
                const id = i.id
                i.addEventListener('click', e => self.findRegion(id))
            })
        },
        removeMapListner() {
            const self = this

            this.worldMap.forEach(i => {
                i.removeEventListener('click', self.findCountry)
            })
            this.regionMap.forEach(i => {
                i.removeEventListener('click', self.findRegion)
            })
        },
        filterCountProjByCountry(value) {
            if(value == 'all') {
                this.countryScientificDirections = ''
                value = ''
            }
            this.$emit('filter-count-proj-by-country', value)
        },
        filterCountProjByRegion(value) {
            if(value == 'all') {
                this.regionScientificDirections = ''
                value = ''
            }
            this.$emit('filter-count-proj-by-region', value)
        }
    },
    mounted() {
        this.requestData.requestCountries.filter(i => {
            if(i['iso-2'] == 'RU') {
                this.country = i['iso-2']
            }
        })
        this.requestData.requestRegions.filter(i => {
            if(i.code == '77') {
                this.region = i.code
            }
        })
        this.mapsInit()
        this.findCountry(this.country)
        this.findRegion(this.region)
        this.filterCountProjByCountry(this.countryScientificDirections) 
        this.filterCountProjByRegion(this.regionScientificDirections)
    },
    beforeDestroy() {
        this.removeMapListner()
    }
}
</script>
<style lang="scss">
    @import '../../../../assets/scss/variables.scss';
    .analytics {
        .map-wrap {
            margin-left: 30px;
            path {
                fill: $second_color;
                cursor: pointer;
                &:hover {
                    fill: $main_color;
                }
            }
            .active-country-map {
                fill: $main_color;
            }
        }
        
        .select-map {
            max-width: 125px;
            .el-input__inner {
                font-weight: 700;
            }
        }
        .map-data-section {
            .el-select {
                width: 100%;
                background-color: $second_color;
            }
            .el-input__inner {
                height: auto;
                color: #fff;
                padding-left: 40px;
                background-color: transparent;
                &::placeholder {
                    color: #fff;
                }
            }
            .el-input {
                display: flex;
                height: 100%;
                height: 36px;
            }
            .el-input__suffix {
                display: flex;
                justify-content: center;
                align-items: center;
                height: auto;
                position: relative;
                margin: 3px;
                right: 0;
                min-width: 30px;
                background-color: $main_color;
            }
            .el-input__icon {
                color: #fff!important;
            }
        }
        .map-data-items {
            padding: 0 30px 0 35px;
            background-color: rgba(235,238,243,.25);
        }
        .map-data-item {
            border-bottom: 2px solid rgba(235,238,243,.5);
            padding: 20px 0;
            &:last-child {
                border-bottom: 0;
            }
            .map-data-value {
                color: $main_color;
                font-size: 44px;
                font-weight: 700;
            }
        }
        .map-data-section-col {
            margin-top: 30px;
        }
    }
    @media(max-width: 991px) {
        .analytics {
            .map-wrap {
                margin-left: 0;
            }
        }
    }
</style>