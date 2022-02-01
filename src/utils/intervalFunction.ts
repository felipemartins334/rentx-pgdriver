export const intervalFunction = async (callback: Function, stopCondition: Function , delay = 250) => {
  const interval = setInterval(() => {
    if(stopCondition()){
      clearInterval(interval)
    }
    callback()
  }, delay)
}