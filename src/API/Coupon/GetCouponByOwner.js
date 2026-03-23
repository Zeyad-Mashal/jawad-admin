const URL = "https://jawad-gbvq.onrender.com/api/v1/coupon/get/";

const GetCouponByOwner = async (ownerId, type) => {
  const token = localStorage.getItem("jawadToken");

  try {
    const response = await fetch(`${URL}685ebadc42f93b3d7279a8cf?type=${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'authorization': `jawJQ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return null;
    }

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default GetCouponByOwner;
