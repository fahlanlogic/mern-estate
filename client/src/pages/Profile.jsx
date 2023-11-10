import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => (state.user)); 
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-sm w-full px-3 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="h-screen flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-center text-slate-700">Profile</h1>
          <form className="flex flex-col justify-center gap-4">
            <img src={currentUser.avatar} alt="" className="self-center my-10 w-32 h-2w-32 rounded-full object-cover"/>
            <input type="text" placeholder="Username" className="border rounded-full px-3 py-2" />
            <input type="email" placeholder="Email" className="border rounded-full px-3 py-2" />
            <input type="password" placeholder="Password" className="border rounded-full px-3 py-2" />
            <button className="bg-pink-500 text-white font-semibold duration-300 rounded-full px-3 py-2 hover:bg-pink-700 transition">Update</button>
          </form>
          <div className="flex justify-between mt-4">
            <span className="font-medium text-slate-700">Delete account?</span>
            <span className="font-medium text-slate-700">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  )
}
