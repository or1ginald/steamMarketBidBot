


const extractName = (url) => {
    const re = "https://steamcommunity.com/market/listings/"
    return url.replace(re, '').replaceAll("%20", ' ').replaceAll("%26", '&').split("/")[1]
}

module.exports = extractName;