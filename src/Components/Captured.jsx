import "../App.css";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useUserAuth } from "../context/UserAuthContext";
import CapturedCard from "./CapturedCard";

const Captured = () => {
  const [birdData, setbirdData] = useState([]);
  const [loading, setloading] = useState(true);
  const { user } = useUserAuth();
  const birdsCollectionRef = collection(db, `${user.reloadUserInfo.localId}`);

  useEffect(() => {
    setloading(true);
    const getbirds = async () => {
      const data = await getDocs(birdsCollectionRef);
      const birdData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setbirdData(JSON.parse(birdData[0].birds));
      setloading(false);
    };
    getbirds();
  }, []);
  if (loading) return <div>loading...</div>;

  return (
    <>
      <h3 className="captureTitle">Birds you have captured</h3>
      <div className="capturedScreen1">
      <section className="all-birds">
        {birdData.map((bird, index) => {
          console.log(bird)
          if (
            bird.birdImage !==
            "/static/media/emptyBird.f3797a16e0d1b452c6c3.png"
          ){
            return (
              <div key={bird + index} className="all-birds">
                <CapturedCard bird={bird} />
              </div>
            );}
        })}
      </section>
      </div>
    </>
  );
};

export default Captured;
