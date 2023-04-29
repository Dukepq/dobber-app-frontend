export default function AnalyticsColumns(props) {
    return (
        <div className={`col col-${props.id}`}>
            <div className={`row row-1 row-1-col-${props.id ?? 1}`}>{props.name}</div>
            <div className={`row row-2 row-2-col-${props.id ?? 1}`}>{props.exchange}</div>
            <div className={`row row-3 row-3-col-${props.id ?? 1}`}>{props.ROBSa?.toFixed(3)}</div>
            <div className={`row row-4 row-4-col-${props.id ?? 1}`}>{props.ROBSb?.toFixed(3)}</div>
            <div className={`row row-5 row-5-col-${props.id ?? 1}`}>{props.depthRatio?.toFixed(3)}</div>
            <div className={`row row-6 row-6-col-${props.id ?? 1}`}>{(props.spread * 100).toFixed(3)}%</div>
        </div>
    )
}