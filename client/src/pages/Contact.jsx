/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => setMessage(e.target.value);
  
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="my-8 flex flex-col gap-2 w-full">
          <p className="text-base xl:text-lg">Contact <b>{landlord.username}</b> for the <b>{listing.name}</b></p>
          <textarea name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...' 
            className="w-full border border-slate-500 rounded-lg p-3 text-base xl:text-lg">
          </textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`} className="w-full bg-slate-700 text-white text-center rounded-lg p-2 text-base xl:text-lg font-semibold">Send Message</Link>
        </div>
      )}
    </>
  )
}
