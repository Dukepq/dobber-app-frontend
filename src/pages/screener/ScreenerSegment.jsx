export default function ScreenerSegment(props) {
    const {data} = props
    const market = data.find((item) => item?.depthData?.pair == props?.pair)
    return (
        <div className="segment-wrapper">
            <div className="segment-header">
                <h3>{props.pair}</h3>
                <p className="day-volume">{`${Number(props.volumeQuote) ? Number(props.volumeQuote).toLocaleString('de-DE', {style: "currency", currency: "EUR"}) : "..."}`}</p>
            </div>
            <div className="segment-chunk">
                <p className="segment-name">ROBSa</p>
                <p className="segment-data">{market?.ROBS?.ROBSa?.toFixed(2)}</p>
            </div>
            <div className="segment-chunk">
                <p className="segment-name">ROBSb</p>
                <p className="segment-data">{market?.ROBS?.ROBSb?.toFixed(2)}</p>
            </div>
            <div className="segment-chunk">
                <p className="segment-name">Recent Volume</p>
                <p className="segment-data">{Number(((Number(market?.volumeData?.averageVolume)) * (Number(market?.depthData?.data?.price))).toFixed(2)).toLocaleString('de-DE', {style: "currency", currency: "EUR"})}</p>
                
            </div>
        </div>
    )
}