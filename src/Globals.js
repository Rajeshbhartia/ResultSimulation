let global = {}
export function setValue(key,value){
    global[key] = value
}

export function getValue(key){
    return global[key]
}