const URL = "https://jawad-gbvq.onrender.com/api/v1/photographer/get?page=1";

const GetPhotoGraphers = async (setloading, setError, setAllPhotoGraphers) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    try {
        const response = await fetch(URL, {
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
            setAllPhotoGraphers(result.photographers)
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
export default GetPhotoGraphers;