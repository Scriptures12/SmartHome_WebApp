import { useState } from "react";

const OAuth = () => {
    const [loading] = useState(false);
  return (
      <button type="button"
      className=" bg-red-600 hover:bg-red-700 text-white max-w-lg font-semibold py-2 px-4 rounded-lg uppercase disabled:bg-[#cbd5e1]"
      disabled={loading}
    >
        Continue with Google
    </button>
  )
}

export default OAuth
