export default function AnalyticsItem(props) {
    const {className, id, fill} = props

    return (
        <div className={className}><span>{fill}</span></div>
    )
}