const URL = "https://jawad-gbvq.onrender.com/api/v1/auth/login";

const LoginApi = async (setloading, setError, data, router) => {
    setloading(true);
    const lang = localStorage.getItem("lang") || "ar";

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept-language": lang
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("jawadToken", result.token);
            setloading(false);
            router("/stable");
        } else {
            setError(result.message || "Login failed");
            console.error(result.message);
            setloading(false);
        }
    } catch (error) {
        console.error(error);
        setError("حدث خطأ في الاتصال بالسيرفر");
        setloading(false);
    }
};
export default LoginApi;
