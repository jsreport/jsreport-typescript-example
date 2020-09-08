{#asset helpers.js @encoding=utf8}

function jsStringEscape (string) {
    return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
        // Escape all characters not included in SingleStringCharacters and
        // DoubleStringCharacters on
        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
        switch (character) {
            case '"':
            case "'":
            case '\\':
                return '\\' + character
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n'
            case '\r':
                return '\\r'
            case '\u2028':
                return '\\u2028'
            case '\u2029':
                return '\\u2029'
        }
    })
}

function getJSON (data) {
    const validDataStr = jsStringEscape(JSON.stringify(data))
    return `'${validDataStr}'`
}

function getPeerNameSectionName (peerName, sectionName) {
    return `${peerName}-${sectionName}`
}

function getLastScoreOfPeer (scoresByPeer, peerName) {
    if (scoresByPeer == null) {
        return
    }
    
    return scoresByPeer[peerName][scoresByPeer[peerName].length - 1].value
}

function addClassIfEqual (value1, value2, className, alternativeClassName) {
    if (value1 === value2) {
        return className
    } else {
        if (alternativeClassName != null && typeof alternativeClassName !== 'object') {
            return alternativeClassName
        } else {
            return ''
        }
    }
}

function addAnalystsRecommendationClass (value) {
    const classMap = {
        "Sell": "cell-recommendation-sell",
        "Reduce": "cell-recommendation-reduce",
        "Hold": "cell-recommendation-hold",
        "Buy": "cell-recommendation-buy",
        "Strong Buy": "cell-strong-buy "
    }

    const className = classMap[value]
    
    if (className != null) {
        return className
    }
    
    return ''
}

function isEmpty (value, options) {
    if (value == null) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
}

function isPositive (value) {
    return value >= 0 ? true : false
}

function getPeerScoreAtTime (scoresByPeer, peer, exchangeDate, byPastMonths) {
    let selectedDate = moment(exchangeDate)
    
    if (byPastMonths != null) {
        selectedDate.subtract(byPastMonths, 'months')
    }
    
    const scores = scoresByPeer[peer]
    const found = scores.find((s) => s.month === selectedDate.format('YYYY-MM'))
    
    if (found) {
        return found.value
    }
}

function getAverageResultsForAnalysis (analysisByPeer) {
    if (!Array.isArray(analysisByPeer)) {
        return
    }
    
    const results = analysisByPeer.reduce((acu, item) => {
        acu.averageScore = (acu.averageScore || 0) + (item.averageScore || 0)
        acu.price = (acu.price || 0) + (item.price || 0)
        acu['1MoReturnPercentage'] = (acu['1MoReturnPercentage'] || 0) + (item['1MoReturnPercentage'] || 0)
        acu['3MoReturnPercentage'] = (acu['3MoReturnPercentage'] || 0) + (item['3MoReturnPercentage'] || 0)
        acu['1YrReturnPercentage'] = (acu['1YrReturnPercentage'] || 0) + (item['1YrReturnPercentage'] || 0)
        acu.marketCap = (acu.marketCap || 0) + (item.marketCap || 0)
        acu.trailingPE = (acu.trailingPE || 0) + (item.trailingPE || 0)
        acu.forwardPE = (acu.forwardPE || 0) + (item.forwardPE || 0)
        acu.dividendYieldPercentage = (acu.dividendYieldPercentage || 0) + (item.dividendYieldPercentage || 0)
        acu.netMarginPercentage = (acu.netMarginPercentage || 0) + (item.netMarginPercentage || 0)
        acu.ltgForecastPercentage = (acu.ltgForecastPercentage || 0) + (item.ltgForecastPercentage || 0)
        
        acu.analystsRecommendationAction = acu.analystsRecommendationAction || {}
        acu.analystsRecommendationAction[item.analystsRecommendationAction] = (acu.analystsRecommendationAction[item.analystsRecommendationAction] || 0) + 1
        
        acu.analystsCount = (acu.analystsCount || 0) + (item.analystsCount || 0)
        
        return acu
    }, {})
    
    results.averageScore = Number((results.averageScore / getNonEmptyItemsCount(analysisByPeer, 'averageScore')).toFixed(1))
    results.ticker = 'Average'
    results.price = results.price / getNonEmptyItemsCount(analysisByPeer, 'price')
    results['1MoReturnPercentage'] = results['1MoReturnPercentage'] / getNonEmptyItemsCount(analysisByPeer, '1MoReturnPercentage')
    results['3MoReturnPercentage'] = results['3MoReturnPercentage'] / getNonEmptyItemsCount(analysisByPeer, '3MoReturnPercentage')
    results['1YrReturnPercentage'] = results['1YrReturnPercentage'] / getNonEmptyItemsCount(analysisByPeer, '1YrReturnPercentage')
    results.marketCap = results.marketCap / getNonEmptyItemsCount(analysisByPeer, 'marketCap')
    results.trailingPE = results.trailingPE / getNonEmptyItemsCount(analysisByPeer, 'trailingPE')
    results.forwardPE = results.forwardPE / getNonEmptyItemsCount(analysisByPeer, 'forwardPE')
    results.dividendYieldPercentage = results.dividendYieldPercentage / getNonEmptyItemsCount(analysisByPeer, 'dividendYieldPercentage')
    results.netMarginPercentage = results.netMarginPercentage / getNonEmptyItemsCount(analysisByPeer, 'netMarginPercentage')
    results.ltgForecastPercentage = results.ltgForecastPercentage / getNonEmptyItemsCount(analysisByPeer, 'ltgForecastPercentage')
    
    results.analystsRecommendationAction = Object.entries(results.analystsRecommendationAction).reduce((major, [action, value]) => {
        if (major.value == null) {
            major.action = action
            major.value = value
        } else if (value > major.value) {
            major.action = action
            major.value = value
        }
        
        return major
    }, {})
    
    results.analystsRecommendationAction = results.analystsRecommendationAction.action
    
    results.analystsCount = results.analystsCount / getNonEmptyItemsCount(analysisByPeer, 'analystsCount')
    
    function getNonEmptyItemsCount (items, field) {
        return items.filter((item) => item[field] != null).length
    }
    
    return results
}

function getItemsGroupedBy (items, groupCount) {
    const results = []
    let newItem = []
    
    if (!Array.isArray(items)) {
        return
    }
    
    items.forEach((item, idx) => {
        newItem.push(item)
        
        if (
            newItem.length === groupCount || 
            (items.length - 1) === idx
        ) {
            results.push(newItem)
            newItem = []
        }
    })
    
    return results
}
