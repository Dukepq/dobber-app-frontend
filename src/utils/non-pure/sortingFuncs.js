export const sortBySpread = (array) => {
    const sorted = array?.sort((x, y) => {
      return y.depthData?.data?.spread - x.depthData?.data?.spread
    })
    return sorted
  }

  export const sortByROBSa = (array) => {
    const sorted = array?.sort((x, y) => {
      if ((x.ROBS?.ROBSa || Infinity) < (y.ROBS?.ROBSa || Infinity)) return -1
      if ((x.ROBS?.ROBSa || Infinity) > (y.ROBS?.ROBSa || Infinity)) return 1
      return 0
    })
    return sorted
  }
  
  export const sortByROBSb = (array) => {
    const sorted = array?.sort((x, y) => {
      if ((x.ROBS?.ROBSb || Infinity) < (y.ROBS?.ROBSb || Infinity)) return -1
      if ((x.ROBS?.ROBSb || Infinity) > (y.ROBS?.ROBSb || Infinity)) return 1
      return 0
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

  export const sortByVolume = (array) => {
    const sorted = array?.sort((a, b) => {
      return (a.volumeData.averageVolume * a.depthData.data.price) - (b.volumeData.averageVolume * b.depthData.data.price)
    })
    return sorted
  }

  export const sortByVolatilityIndex = (array) => {
    const sorted = array.sort((a, b) => {
      const tempA = a.volumeData?.volatilityArray?.reduce((acc, cur) => acc + cur)
      const tempB = b.volumeData?.volatilityArray?.reduce((acc, cur) => acc + cur)
      if ((tempA || -Infinity) < (tempB || -Infinity)) return -1
      if ((tempA || -Infinity) > (tempB || -Infinity)) return 1
      else return 0
    })
    return sorted
    
  }