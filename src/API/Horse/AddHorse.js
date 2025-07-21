const URL = "https://jawad-gbvq.onrender.com/api/v1/horse/add/";

const AddHorse = async (setloading, setError, data, getAllStables, stableId, setAddModel) => {
  setloading(true)
  const lang = localStorage.getItem("lang") || "ar"
  const token = localStorage.getItem("jawadToken")
  try {
    const response = await fetch(`${URL}${stableId}`, {
      method: 'POST',
      headers: {
        "accept-language": `${lang}`,
        "authorization": `jawJQ${token}`
      },
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      setloading(false);
      setAddModel(false)
      getAllStables()
    } else {
      if (response.status == 401) {
        setError(result.message)
        setloading(false);
        console.log(result.message);

      } else if (response.status == 400) {
        setError(result.message)
        setloading(false);
        console.log(result.message);

      }
      else if (response.status == 500) {
        console.log(result.message);
      }
      setloading(false)
    }
  } catch (error) {
    setError('An error occurred');
    setloading(false)
    console.log(error);

  }
}
export default AddHorse;