export function calcAverages(data, hook) {
    if (!data || (data.length < 1)) return
        let count = 0
        let ROBSbTotal = []
        let ROBSaTotal = []
        let spreadTotal = []
        let depthTotal = []
        for (let i = 0; i < data.length; i++) {
          data[i].ROBS?.ROBSb && ROBSbTotal.push(data[i].ROBS.ROBSb)
          data[i].ROBS?.ROBSb && ROBSaTotal.push(data[i].ROBS.ROBSb)
          data[i].depthData?.data?.spread && (spreadTotal.push(data[i].depthData.data.spread))
          data[i].depthData?.data?.depthRatio && (depthTotal.push(data[i].depthData.data.depthRatio) && count++)
        }
        ROBSbTotal.sort()
        ROBSaTotal.sort()
        spreadTotal.sort()
        depthTotal.sort()
        
        const ROBSbAvg = ROBSbTotal[Math.round(ROBSbTotal.length/2)]
        const ROBSaAvg = ROBSaTotal[Math.round(ROBSaTotal.length/2)]
        const spreadAvg = spreadTotal[Math.round(spreadTotal.length/2)]
        const depthAvg = depthTotal[Math.round(depthTotal.length/2)]
        hook(prev => {
          return {...prev, ROBSbAvg, ROBSaAvg, spreadAvg, depthAvg}
        })
}