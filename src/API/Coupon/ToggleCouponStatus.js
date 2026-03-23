const URL = "https://jawad-gbvq.onrender.com/api/v1/coupon/disable/";

const ToggleCouponStatus = async (setLoading, setError, couponId, onSuccess) => {
  setLoading(true);
  const token = localStorage.getItem("jawadToken");

  try {
    const response = await fetch(`${URL}${couponId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `jawJQ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      setError(null);
      onSuccess?.(result);
    } else {
      setError(result?.message || "Failed to toggle coupon status");
    }
  } catch (error) {
    setError("An error occurred");
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export default ToggleCouponStatus;
