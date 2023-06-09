import {
  sortBySpread,
  sortByROBSa,
  sortByROBSb,
  sortByDepthRatio,
  sortByName,
  sortByExchangeName,
  sortByVolume,
  sortByVolatilityIndex,
} from './sortingFuncs.js'

// add cases to this when you add rows containing different data
function sortingLogic(sorting, array) {
    let sortedArray
    if (!sorting.field) return array
    switch (sorting.field) {
      case "spread":
        sortedArray = sortBySpread(array)
        break
      case "depth":
        sortedArray = sortByDepthRatio(array)
        break
      case "ROBSa":
        sortedArray = sortByROBSa(array)
        break
      case "ROBSb":
        sortedArray = sortByROBSb(array)
        break
      case "exchange":
        sortedArray = sortByExchangeName(array)
        break
      case "name":
        sortedArray = sortByName(array, sorting.ascending) 
        break
      case "volume":
        sortedArray = sortByVolume(array)
        break
      case "volatilityIndex":
        sortedArray = sortByVolatilityIndex(array)
        break
      default:
        sortedArray = sortByName(array)
        break
    }
    return sorting.ascending ? sortedArray : sortedArray.reverse()
  }

export default sortingLogic