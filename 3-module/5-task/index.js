function getMinMax(str) {
 const arr = str
 .split(' ')
 .filter(item => parseFloat(item))
 .sort((a, b) => a - b)
 
 return {
   min: +arr[0],
   max: +arr[arr.length - 1]
 }
}
