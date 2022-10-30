import { useState } from "react"


export const useIsLoggedIn = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)


return isLoggedIn;
}