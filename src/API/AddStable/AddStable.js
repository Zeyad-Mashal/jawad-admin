const URL = "https://jawad-gbvq.onrender.com/api/v1/stable/add";

const AddStable = async (setloading, setError, data) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept-language": `${lang}`,
                "authorization": `jawJQ${token}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
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
    }
}
export default AddStable;