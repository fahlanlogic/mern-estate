import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => (state.user)); 
  return (
    <div className="mx-auto max-w-md h-screen flex items-center lg:max-w-xl">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center">Profile</h1>
        <form className="flex flex-col justify-center gap-4">
          <img src={currentUser.avatar} alt="" className="self-center my-10 w-24 h-24 rounded-full object-cover"/>
          <input type="text" placeholder="Username" className="border rounded-full px-3 py-2" />
          <input type="email" placeholder="Email" className="border rounded-full px-3 py-2" />
          <input type="password" placeholder="Password" className="border rounded-full px-3 py-2" />
          <button className="bg-pink-500 text-white font-semibold rounded-full px-3 py-2 hover:bg-pink-700 transition">Update</button>
        </form>
        <div className="flex justify-between mt-4">
          <span className="font-medium">Delete account?</span>
          <span className="font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  )
}
