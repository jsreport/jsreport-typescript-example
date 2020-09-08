/*
    To run this example in your local installation you will probably need to put
    in your configuration either one of these two configurations:
    
    - { "allowLocalFilesAccess": true }
    - { "templatingEngines": { "allowedModules": ["moment"] } }
*/
const moment = require('moment')

function formatReportDate (date) {
    return moment(date).format('YYYY MMMM DD')
}