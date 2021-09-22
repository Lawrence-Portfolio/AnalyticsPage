<template>
    <section class="tab-panel">
        <h2 class="title">Сведения о количестве исследователей</h2>
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
                            <div class="map-data-name">Исследователей</div>
                            <div class="map-data-value" v-for="item in requestData.requestResearchersByCountries.filter(i => i['iso-2'] == country)" :key="item['iso-2']">{{ item.count_researchers }}</div>
                        </div>
                        <div class="map-data-item">
                            <div class="map-data-name">Открытых вакансий</div>
                            <div class="map-data-value" v-for="item in requestData.requestVacanciesByCountries.filter(i => i['iso-2'] == country)" :key="item['iso-2']">{{ item.count_vacancies }}</div>
                        </div>
                    </div>
                </a-col>
                <a-col span="24" order="1" :lg="{ span: 16, order: 2 }">      
                    <div class="map-wrap" id="worldMap">
                        <world-map></world-map>
                    </div>
                </a-col>
            </a-row>
            <a-row v-show="!map" type="flex">
                <a-col span="24" order="2" :lg="{ span: 8, order: 1 }" class="map-data-section-col">
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
                            <div class="map-data-name">Исследователей</div>
                            <div class="map-data-value" v-for="item in requestData.requestResearchersByRegions.filter(i => i.region_code == region)" :key="item.region_code">{{ item.count_researchers }}</div>
                        </div>
                        <div class="map-data-item">
                            <div class="map-data-name">Открытых вакансий</div>
                            <div class="map-data-value" v-for="item in requestData.requestVacanciesByRegions.filter(i => i.region_code == region)" :key="item.region_code">{{ item.count_vacancies }}</div>
                        </div>
                    </div>
                </a-col>
                <a-col span="24" order="1" :lg="{ span: 16, order: 2 }">
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