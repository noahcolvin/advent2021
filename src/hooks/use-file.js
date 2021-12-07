const useFile = () => {
  const fetchDataForDay = async day => {
    const rawData = await fetch(`/Input/Input${day}.txt`)
    const textData = await rawData.text()
    const splitData = textData.split('\n')
    return splitData
  }

  return { fetchDataForDay }
}

export default useFile