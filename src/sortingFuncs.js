export const sortBySpread = (array) => {
    const sorted = array?.sort((x, y) => {
      return y.depthData?.data?.spread - x.depthData?.data?.spread
    })
    return sorted
  }

  export const sortByROBSa = (array) => {
    const sorted = array?.sort((x, y) => {
      return x.ROBS?.ROBSa - y.ROBS?.ROBSa
    })
    return sorted
  }
  
  export const sortByROBSb = (array) => {
    const sorted = array?.sort((x, y) => {
      return x.ROBS?.ROBSb - y.ROBS?.ROBSb
    })
    return sorted
  }

  export const sortByDepthRatio = (array) => {
    const sorted = array?.sort((x, y) => {
      return y.depthData?.data?.depthRatio - x.depthData?.data?.depthRatio
    })
    return sorted
  }

  export const sortByName = (array) => {
    const sorted = array?.sort((a, b) => {
      console.log(a?.depthData?.pair.toUpperCase() < b?.depthData?.pair.toUpperCase())
      if (a?.depthData?.pair.toUpperCase() < b?.depthData?.pair.toUpperCase()) return -1
      if (a?.depthData?.pair.toUpperCase() > b?.depthData?.pair.toUpperCase()) return 1
      return 0
    })
    return sorted
  }

  export const sortByExchangeName = (array) => {
    const sorted = array?.sort((a, b) => {
      if (a?.depthData?.exchange.toUpperCase() < b?.depthData?.exchange.toUpperCase()) return -1
      if (a?.depthData?.exchange.toUpperCase() > b?.depthData?.exchange.toUpperCase()) return 1
      return 0
    })
    return sorted
  }
