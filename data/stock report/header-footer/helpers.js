{#asset helpers.js @encoding=utf8}

function ifOnFirstPageOfGroup (page, options) {
    const isFirstPageOfGroup = page.items.find((p) => p.companyFirstPage === true) != null
    
    if (isFirstPageOfGroup) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
}

function ifContentPage (page, options) {
    const ignoreHeaderFooter = page.items.find((p) => p.ignoreHeaderFooter === true) != null
    
    if (!ignoreHeaderFooter) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
}

function getPageNumber (pages, pageIndex) {
    if (!pages || pageIndex == null) {
        return ''
    }
    
    const pagesToIgnore = pages.reduce((acu, page) => {
        const shouldIgnore = page.items.find((p) => p.ignorePageInCount === true) != null
        
        if (shouldIgnore) {
            acu.push(page)
        }
        
        return acu
    }, []).length
    
    const pageNumber = pageIndex + 1
    
    return pageNumber - pagesToIgnore
}

function getTotalPages (pages) {
    if (!pages) {
        return ''
    }
    
    const pagesToIgnore = pages.reduce((acu, page) => {
        const shouldIgnore = page.items.find((p) => p.ignorePageInCount === true) != null
        
        if (shouldIgnore) {
            acu.push(page)
        }
        
        return acu
    }, []).length
    
    return pages.length - pagesToIgnore
}

function getCurrentYear () {
    return new Date().getFullYear()
}