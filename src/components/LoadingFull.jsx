import React, { useEffect } from "react"

export default function LoadingFull({ isLoading }) {
  useEffect(() => {}, [isLoading])
  return (
    <div className={`loading-full-container ${isLoading ? "" : "fade-out"}`}>
      <img src="../navakij-logo.png"></img>
    </div>
  )
}
