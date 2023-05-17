
export function colorPicker(value, relativeTo, reverse = false) {
    const colorArray = ["#ff0000", "#c1523c", "#d28d31", "#cb983a", "#bfd044", "#57ff62"]
    if (!value || !relativeTo) return "grey"
    if (reverse) {
       if (value > relativeTo) return colorArray[0]
       if (value > 1/3 * relativeTo) return colorArray[1]
       if (value > 1/9 * relativeTo) return colorArray[2]
       if (value > 1/27 * relativeTo) return colorArray[3]
       if (value > 1/81 * relativeTo) return colorArray[4]
       if (value <= 1/81 * relativeTo) return colorArray[5]
    }
    if (value > 81 * relativeTo) return colorArray[5]
    if (value < relativeTo) return colorArray[0]
    if (value < 3 * relativeTo) return colorArray[1]
    if (value < 9 * relativeTo) return colorArray[2]
    if (value < 27 * relativeTo) return colorArray[3]
    if (value <= 81 * relativeTo) return colorArray[4]
    
    return "white"
}