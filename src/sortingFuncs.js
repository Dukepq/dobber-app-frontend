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
    // array.sort((a, b) => {

    // })
  }

  export const sortByExchangeName = array => {
    // array.sort((a, b) => {
      
    // })
  }
