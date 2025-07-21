const URL = "https://jawad-gbvq.onrender.com/api/v1/horse/get/";

const GetHorse = async (setloading, setError, setAllHorses, stableId) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    try {
        const response = await fetch(`${URL}${stableId}?page=1`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "accept-language": `${lang}`,
                "x-is-dashboard": "true"
            },
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setAllHorses(result.horses)
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
export default GetHorse;