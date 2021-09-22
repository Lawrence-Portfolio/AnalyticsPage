<template>
    <article class="analytics">
        <section class="container">
            <a-row>
                <a-tabs>
                    <a-tab-pane key="grunts" tab="Гранты и конкурсы">
                        <grants-and-competitions
                            :requestData="gruntsProps" 
                            @update-data-volume="updateDataVolumeByYear" 
                            @filter-funds-volume="requestFilterFundsVolume"
                        ></grants-and-competitions>
                    </a-tab-pane>
                    <a-tab-pane key="sci_comm_org" tab="Научные и коммерческие организации">
                        <sci-com-org
                            :requestData="sciCommOrgProps"
                            @filter-count-proj-by-country="filterCountProjByCountry"
                            @filter-count-proj-by-region="filterCountProjByRegion"
                        ></sci-com-org>
                    </a-tab-pane>
                    <a-tab-pane key="sci_acti" tab="Научная деятельность">
                        <scientific-activity :requestData="sciActivProps"></scientific-activity>
                    </a-tab-pane>
                    <a-tab-pane key="researchers" tab="Исследователи">
                        <researchers :requestData="researchersProps"></researchers>
                    </a-tab-pane>
                </a-tabs>
            </a-row>
        </section>
    </article>
</template>
<script>
import configRequest from '@/middleware/configRequest'

import grantsAndCompetitions from '@/components/pages/analytics/tabs/grants-and-competitions'
import sciСomOrg from '@/components/pages/analytics/tabs/scientific-and-commercial-organizations'
import scientificActivity from '@/components/pages/analytics/tabs/scientific-activity'
import researchers from '@/components/pages/analytics/tabs/researchers'
const getAsyncData = async (ctx) => {
    console.log(ctx)
    const [totalFunds] = await Promise.all([ctx.app.$axios.$get(configRequest.gikProps.listFunds)])

    const [
        requsetDataYears,
        requestFunds,
        requestFundsVolume,
        requestFinancingVolume,
        requestResearchingVolume,

        requestScientificDirections,

        requestCountries,
        requestCountFundsByCountries,
        requestCountOrganizationsByCountries,

        requestResearchersByCountries,
        requestVacanciesByCountries,


        requestRegions,
        requestCountFundsByRegions,
        requestCountOrganizationsByRegions,

        requestResearchersByRegions,
        requestVacanciesByRegions,

        requestCountRids,
        requestCountPublicationsByYears

    ] = await Promise.all([
        ctx.app.$axios.$get(configRequest.gikProps.listYears),
        ctx.app.$axios.$get(configRequest.gikProps.listFunds + '?per_page=' + totalFunds.meta.total),
        ctx.app.$axios.$get(configRequest.gikProps.listFundsVolume),
        ctx.app.$axios.$get(configRequest.projectProps.listFinancingVolume),
        ctx.app.$axios.$get(configRequest.projectProps.listResearchingVolume),

        ctx.app.$axios.$get(configRequest.projectProps.listScientificDirections),

        ctx.app.$axios.$get(configRequest.gikProps.listCountries),
        ctx.app.$axios.$get(configRequest.gikProps.listFundsByCountries),
        ctx.app.$axios.$get(configRequest.orgProps.listOrganizationsByCountries),

        ctx.app.$axios.$get(configRequest.cpiProps.listResearchersByCountries),
        ctx.app.$axios.$get(configRequest.cpiProps.listVacanciesByCountries),

        ctx.app.$axios.$get(configRequest.gikProps.listRegions),
        ctx.app.$axios.$get(configRequest.gikProps.listFundsByRegions),
        ctx.app.$axios.$get(configRequest.orgProps.listOrganizationsByRegions),

        ctx.app.$axios.$get(configRequest.cpiProps.listResearchersByRegions),
        ctx.app.$axios.$get(configRequest.cpiProps.listVacanciesByRegions),

        ctx.app.$axios.$get(configRequest.projectProps.listCountRids),
        ctx.app.$axios.$get(configRequest.cpiProps.listCountPublicationsByYears)
    ])
    return {
        requsetDataYears: requsetDataYears.data,
        requestFunds: requestFunds.data,
        requestFundsVolume: requestFundsVolume.data,
        requestFinancingVolume: requestFinancingVolume.data,
        requestResearchingVolume: requestResearchingVolume.data,

        requestScientificDirections: requestScientificDirections.data,

        requestCountries: requestCountries.data.sort((a, b) => a.name < b.name ? -1 : 1),
        requestCountFundsByCountries: requestCountFundsByCountries.data,
        requestCountOrganizationsByCountries: requestCountOrganizationsByCountries.data,

        requestResearchersByCountries: requestResearchersByCountries.data,
        requestVacanciesByCountries: requestVacanciesByCountries.data,


        requestRegions: requestRegions.data.sort((a, b) => a.name < b.name ? -1 : 1),
        requestCountFundsByRegions: requestCountFundsByRegions.data,
        requestCountOrganizationsByRegions: requestCountOrganizationsByRegions.data,

        requestResearchersByRegions: requestResearchersByRegions.data,
        requestVacanciesByRegions: requestVacanciesByRegions.data,

        requestCountRids: requestCountRids.data,
        requestCountPublicationsByYears:  requestCountPublicationsByYears.data
    }
}

export default {
    components: {
        'grants-and-competitions': grantsAndCompetitions,
        'sci-com-org' :sciСomOrg,
        'scientific-activity' :scientificActivity,
        'researchers': researchers
    },
    async asyncData(ctx) {
        return getAsyncData(ctx)
    },
    data() {
        return {
            requestDataVolume: {},
            requestCountProjectsByCountries: [],
            requestCountProjectsByRegions: [],
            colors: ['#ED694B', '#174275', '#215AA1', '#3478D9', '#569CE4', '#81B8EE', '#A6AEBF']
        }
    },
    computed: {
        gruntsProps() {
            return {
                requsetDataYears: this.requsetDataYears,
                requestFunds: this.requestFunds,
                requestFundsVolume: this.requestFundsVolume,
                requestDataVolume: this.requestDataVolume,
                
                requestFinancingVolume: this.requestFinancingVolume.sort((a, b) => b.sum - a.sum).map((i, index) => {
                    return {
                        name: i.financing_source,
                        value: i.sum,
                        color: this.colors[index]
                    }
                }),
                requestResearchingVolume: this.requestResearchingVolume.sort((a, b) => b.sum - a.sum).map((i, index) => {
                    return {
                        name: i.activity_type,
                        value: i.sum,
                        color: this.colors[index]
                    }
                }),
            }
        },
        sciCommOrgProps() {
            return {
                requestScientificDirections: this.requestScientificDirections,

                requestCountries: this.requestCountries,
                requestCountFundsByCountries: this.requestCountFundsByCountries,
                requestCountOrganizationsByCountries: this.requestCountOrganizationsByCountries,
                requestCountProjectsByCountries: this.requestCountProjectsByCountries,

                // requestResearchersByCountries: this.requestResearchersByCountries,
                // requestVacanciesByCountries: this.requestVacanciesByCountries,


                requestRegions: this.requestRegions,
                requestCountFundsByRegions: this.requestCountFundsByRegions,
                requestCountOrganizationsByRegions: this.requestCountOrganizationsByRegions,
                requestCountProjectsByRegions: this.requestCountProjectsByRegions,

                // requestResearchersByRegions: this.requestResearchersByRegions,
                // requestVacanciesByRegions: this.requestVacanciesByRegions,
            }
        },
        sciActivProps() {
            return {
                requestCountRids: this.requestCountRids,
                requestCountPublicationsByYears:  this.requestCountPublicationsByYears
            }
        },
        researchersProps() {
            return {
                requestCountries: this.requestCountries,
                requestResearchersByCountries: this.requestResearchersByCountries,
                requestVacanciesByCountries: this.requestVacanciesByCountries,

                requestRegions: this.requestRegions,
                requestResearchersByRegions: this.requestResearchersByRegions,
                requestVacanciesByRegions: this.requestVacanciesByRegions,
            }
        }
    },
    methods: {
        async updateDataVolumeByYear(year) {
            const data = await this.$axios.$get(configRequest.gikProps.listDataVolume + '?publish_year=' + year)
            data.data.funding_volume = (data.data.funding_volume / 1000000000).toFixed(1)
            
            this.requestDataVolume = data.data
        },
        async requestFilterFundsVolume(requestData) {

            for (var propName in requestData) {
                if (
                    requestData[propName] === null || 
                    requestData[propName] === undefined || 
                    requestData[propName] === '' 
                ) {
                    delete requestData[propName];
                }
            }

            let newRequestData = Object.keys(requestData).map(function(key) {
                return key + '=' + requestData[key]
            }).join('&');

            if(newRequestData == '') {
                const data = await this.$axios.$get(configRequest.gikProps.listFundsVolume)
                this.requestFundsVolume = data.data
            } else {
                const data = await this.$axios.$get(configRequest.gikProps.listFundsVolume + '?' + newRequestData)
                this.requestFundsVolume = data.data
            }
        },
        async filterCountProjByCountry(value) {
            const data = await this.$axios.$get(configRequest.projectProps.listProjectsByCountries + '?scientific_direction=' + value)
            this.requestCountProjectsByCountries = data.data
        },
        async filterCountProjByRegion(value) {
            const data = await this.$axios.$get(configRequest.projectProps.listProjectsByRegions + '?scientific_direction=' + value)
            this.requestCountProjectsByRegions = data.data
        }
        
    }
}


// import VSelect from 'vue-select'
// export default {
//     components: {
//         VSelect
//     },
//     data() {
//         return {
//             width: null,
//             selectedPage: {
//                 label: 'Гранты и конкурсы',
//                 code: '/analytics/grants-and-competitions/'
//             },
//             links: [
//                 {
//                     label: 'Гранты и конкурсы',
//                     code: '/analytics/grants-and-competitions'
//                 },
//                 {
//                     label: 'Научные и коммерческие организации',
//                     code: '/analytics/scientific-and-commercial-organizations'
//                 },
//                 {
//                     label: 'Научная деятельность',
//                     code: '/analytics/scientific-activity'
//                 },
//                 {
//                     label: 'Исследователи',
//                     code: '/analytics/researchers'
//                 }
//             ]
//         }
//     },
//     methods: {
//         updateWidth() {
//         this.width = window.innerWidth;
//         },
//     },
//     created() {
//         this.updateWidth()
//         window.addEventListener('resize', this.updateWidth);
//         this.$router.push('/analytics/grants-and-competitions')
//     },
//     beforeDestroy() {
//         window.removeEventListener('resize', this.updateWidth);
//     },
//     watch: {
//         selectedPage(value) {
//             this.$router.push(value.code);
//         }
//     }
// }
</script>

<style lang="scss">
    @import '../assets/scss/variables.scss';
    .analytics {
        font-family: 'Open Sans', sans-serif;
        background-color: #E5E5E5;
        font-size: 14px;
        color: #000;
        .color-block {
            display: inline-block;
            min-width: 16px;
            height: 16px;
            margin-right: 10px;
            margin-top: 4px;
        }
        .container {
            margin: 0 auto;
        }
        .ant-tabs {
            color: #000;
        }
        .ant-tabs-bar {
            margin: 0;
            border: none;
            background-color: #fff;
        }
        .ant-tabs-tab {
            color: #fff;
            font-weight: 700;
            background-color: $second_color;
            margin-right: 2px;
            transition: all .2s ease-in-out;
            padding: 7px 25px;
            &:hover {
                color: $main_color;
                background-color: #fff;
            }
        }
        .ant-tabs-tab-active {
            color: $main_color;
            background-color: #fff;
        }
        .title {
            font-size: 20px;
            font-weight: 700;
            color: $main_color;
        }
        .ant-tabs-ink-bar {
            display: none!important;
        }
        .tab-panel {
            background-color: #fff;
            padding: 40px 25px;
        }
        .el-select_default .el-input__inner {
            max-width: 65px;
            font-weight: 700;
        }
        .el-input__inner {
            border: none;
            color: $main_color;
            padding: 0;
        }
        .el-input__icon {
            font-weight: 700;
            color: $main_color!important;
        }
        .el-scrollbar__wrap {
            overflow: auto;
        }
        .el-select-dropdown {
            width: 100%;
            left: 0 !important;
            margin: 0;
            position: absolute!important;
            top: calc(100% + 1px)!important;
            border: none;
            border-radius: 0;
            .popper__arrow {
                display: none;
            }
        }
        .el-select-dropdown__item.selected {
            color: $main_color;
        }
        .el-select-dropdown__item {
            padding: 0 10px;
        }
        .el-scrollbar {
            height: auto;
        }
        .el-select-dropdown__list {
            padding: 5px 0 20px;
        }
    }
    @media (min-width: 576px) {
        .analytics {
            .container {
                max-width: 540px;
            }
        }
    }
    @media (min-width: 768px) {
        .analytics {
            .container {
                max-width: 720px;
            }
        }
    }
    @media (min-width: 992px) {
        .analytics {
            .container {
                max-width: 960px;
            }
        }
    }
    @media(min-width: 1200px) {
        .analytics {
            .container {
                max-width: 1120px;
            }
        }
    }
</style>