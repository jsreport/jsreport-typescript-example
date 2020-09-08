
function ifOnPdfMerge (root, options) {
    if (root.$pdf) {
        return options.fn(this)   
    }
    
    return options.inverse(this)
}

function getPagesBeforeTOC (root) {
    if (root.$pdf) {
        const pagesBefore = root.$pdf.pages.reduce((acu, page) => {
            const isPageBeforeTOC = page.items.find((p) => p.pageBeforeTOC === true) != null
            
            if (isPageBeforeTOC) {
                acu.push(page)
            }
            
            return acu
        }, [])
        
        return pagesBefore
    }
    
    return []
}

function addClassOnPdfMerge(root, c, ac) {
    if (root.$pdf) {
        return c
    }
    
    return ac != null ? ac : ''
}

function level(chapters, parent, opts) {
    let res = ''

    for (const ch of chapters) {
        res += opts.fn({
            ...ch,
            parent
        })

        if (ch.chapters) {
            res += '<ul>' + Handlebars.helpers.level(ch.chapters, ch.id, opts) + '</ul>'
        }
    }

    return res
}

function getPage(root, id) {
    if (!root.$pdf) {
        // the main template
        return ''
    }
    
    for (let i = 0; i < root.$pdf.pages.length; i++) {
        const item = root.$pdf.pages[i].items.find(item => item.id === id)
    
        if (item) {
            const pageNumber = i + 1
            
            const pagesToIgnore = root.$pdf.pages.reduce((acu, page) => {
                const shouldIgnore = page.items.find((p) => p.ignorePageInCount === true) != null
                
                if (shouldIgnore) {
                    acu.push(page)
                }
                
                return acu
            }, []).length
            
            return pageNumber - pagesToIgnore
        }
    }
}