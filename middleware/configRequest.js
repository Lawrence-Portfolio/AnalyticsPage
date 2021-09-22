export default {
    gikProps: {
        listYears: 'http://gik.cpi.com-dev.ru/api/analytics/years',
        listFunds: 'http://gik.cpi.com-dev.ru/api/funds',
        listFundsVolume: 'http://gik.cpi.com-dev.ru/api/analytics/data_organizations_volume',
        
        listDataVolume: 'http://gik.cpi.com-dev.ru/api/analytics/data_volume',

        listCountries: 'http://gik.cpi.com-dev.ru/api/dictionary/countries',
        listFundsByCountries: 'http://gik.cpi.com-dev.ru/api/analytics/count_funds_by_countries ',

        listRegions: 'http://gik.cpi.com-dev.ru/api/dictionary/regions',
        listFundsByRegions: 'http://gik.cpi.com-dev.ru/api/analytics/count_funds_by_regions', 
        
    },
    projectProps: {
        listScientificDirections: 'http://project.cpi.com-dev.ru/api/dictionary/scientific_directions',

        listFinancingVolume: 'http://project.cpi.com-dev.ru/api/analytics/data_financing_volume',
        listResearchingVolume: 'http://project.cpi.com-dev.ru/api/analytics/data_researching_volume',

        listProjectsByCountries: 'http://project.cpi.com-dev.ru/api/analytics/count_projects_by_countries',
        listProjectsByRegions: 'http://project.cpi.com-dev.ru/api/analytics/count_projects_by_regions', 

        listCountRids: 'http://project.cpi.com-dev.ru/api/analytics/count_rids',
    },
    orgProps: {
        listOrganizationsByCountries: 'http://org.cpi.com-dev.ru/api/analytics/count_organizations_by_countries',
        listOrganizationsByRegions: 'http://org.cpi.com-dev.ru/api/analytics/count_organizations_by_regions',
    },
    cpiProps: {
        listResearchersByCountries: 'http://cpi.cpi.com-dev.ru/api/analytics/count_researchers_by_countries',
        listResearchersByRegions: 'http://cpi.cpi.com-dev.ru/api/analytics/count_researchers_by_regions',
        listVacanciesByCountries: 'http://cpi.cpi.com-dev.ru/api/analytics/count_vacancies_by_countries',
        listVacanciesByRegions: 'http://cpi.cpi.com-dev.ru/api/analytics/count_vacancies_by_regions',

        listCountPublicationsByYears :'http://cpi.cpi.com-dev.ru/api/analytics/count_publications_by_years'
    }
}