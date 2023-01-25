import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { env } from "../../env";

const useAdmin = (token) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(token);
    const getAdmin = async () => {
      setAdminLoading(true);
      if (token) {
        try {
          const response = await axios.get(
            `${env.baseUrl}/api/authVerifyUser/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // ;
          // console.log(response);
          if (response.status === 200) {
            setAdmin(response.data.authenticate);
            JSON.stringify(localStorage.setItem("name", response.data.name));
            setAdminLoading(false);
          }
        } catch (error) {
          console.log(error);
          setAdmin(false);
          setAdminLoading(false);
          toast(error.response.data.msg);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        setAdmin(false);
        setAdminLoading(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    getAdmin();
  }, [navigate, token]);

  return { admin, adminLoading };
};

export default useAdmin;
