export const intervalFunction = async (callback: Function, stopCondition: Function , delay = 100) => {
  const interval = setInterval(() => {
    if(stopCondition()){
      clearInterval(interval)
    }
    callback()
  }, delay)
}