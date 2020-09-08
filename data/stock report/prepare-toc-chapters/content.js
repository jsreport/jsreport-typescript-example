
function beforeRender (req, res) {
    req.data = req.data || {}
    
    if (!Array.isArray(req.data.companies)) {
        return
    }
    
    req.data.chapters = req.data.companies.map((item) => {
        return {
            id: item.peerName,
            title: `${item.company.fullName} - ${item.company.abbreviation}`,
            chapters: [{
                id: `${item.peerName}-average-score`,
                title: 'Average Score'
            }, {
                id: `${item.peerName}-highlights`,
                title: 'Highlights'
            }, {
                id: `${item.peerName}-prive-volume-charts`,
                title: 'Price and Volume Charts'
            }, {
                id: `${item.peerName}-business-summary`,
                title: 'Business Summary'
            }, {
                id: `${item.peerName}-indicator-components`,
                title: 'Indicator Components'
            }, {
                id: `${item.peerName}-optimized-score`,
                title: 'Optimized Score'
            }, {
                id: `${item.peerName}-peer-analysis`,
                title: 'Peer Analysis'
            }, {
                id: `${item.peerName}-peer-companies`,
                title: 'Peer Companies'
            }]
        }
    })
}