const URL = "https://jawad-gbvq.onrender.com/api/v1/stable/disable/";

const Disable = async (setloading, setError, stableId, getAllStables, setModel) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")
    try {
        const response = await fetch(`${URL}${stableId}`, {
            method: 'PUT',
            headers: {
                "accept-language": `${lang}`,
                "authorization": `jawJQ${token}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            getAllStables()
            setModel(false)
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
export default Disable;