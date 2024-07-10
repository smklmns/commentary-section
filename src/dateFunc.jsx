
const dateFunc = (dateOfPost) => {
  

  let today = new Date()
  let convertBack = new Date(dateOfPost)

   let miliSeconds = today.getTime() - convertBack.getTime()

   
  let result = Math.round(miliSeconds / (24*60*60*1000))

  if(result === 0) {
    return "today"
  }
  if(result < 7) {
    return result === 1 ? result + ' ' + 'day ago' : result + ' ' + 'days ago'
  }
  if(result > 6 && result < 31) {
    let weeks = Math.floor(result / 7)
    return weeks === 1 ? weeks + " " + "week ago" : weeks + " " + "weeks ago"
  }
  if(result >= 31 && result < 365) {
    let months = Math.floor(result / 30)
    return months === 1 ? months + " " + "month ago" : months + " " + "months ago"
  }
  if(result >= 365) {
    let years = Math.floor(result / 365)
    return years === 1 ? years + " " + "year ago" : years + " " + "years ago"
  }
    
}

export default dateFunc