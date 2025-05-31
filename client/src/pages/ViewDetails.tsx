import { useEffect } from "react";
// import Sidebar from "";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewDetails = () => {
  const { id } = useParams();
  const getEventDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `https://eventhub-qrau.onrender.com/get-event-by-id`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEventDetails();
  }, []);
  return (
    <div className="h-screen bg-[#1e1e1e] text-white pt-14 mx-auto px-5">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">{id}</div>
      </div>
    </div>
  );
};

export default ViewDetails;
