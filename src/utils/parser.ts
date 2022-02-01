interface ReturnObject{
  position1: string
  position2: string
}

export const parser = async(data: string, delimiter: string): Promise<ReturnObject[]> => {

  const dataObjects: ReturnObject[] = []

  return new Promise((resolve, reject) => {
    const lines = data.split("\n")
    lines.forEach(line => {
      const [ position1, position2 ] = line.split(delimiter)
      position1.trim()
      position2.trim()
      dataObjects.push({
        position1,
        position2
      })
    })
    
    resolve( dataObjects )
  })
} 