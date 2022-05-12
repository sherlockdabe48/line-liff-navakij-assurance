import React, { useEffect } from "react"

export default function Home({ isBackToHome, closeWindow }) {
  useEffect(() => {
    if (isBackToHome) {
      closeWindow()
    }
  }, [])
  return <div></div>
}
