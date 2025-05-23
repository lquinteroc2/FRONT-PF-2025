interface YouTubePlayerProps {
    videoId: string
    width?: string | number
    height?: string | number
    autoPlay?: boolean
    muted?: boolean
    loop?: boolean
    className?: string
  }
  
  export default function YouTubePlayer({
    videoId,
    width = "100%",
    height = "auto",
    autoPlay = true,
    muted = true,
    loop = true,
    className = "",
  }: YouTubePlayerProps) {
    // Construir los parámetros de la URL
    const params = new URLSearchParams({
      autoplay: autoPlay ? "1" : "0",
      mute: muted ? "1" : "0",
      loop: loop ? "1" : "0",
      playlist: loop ? videoId : "LzD7Fw18lQI", // Necesario para que loop funcione
    }).toString()
  
    return (
      <div className={className} style={{ width, height }}>
        <iframe
          width="401px"
          height="713px"
          src={`https://www.youtube.com/embed/${videoId}?${params}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video"
        ></iframe>
      </div>
    )
  }

{/* <iframe width="401" height="713" src="https://www.youtube.com/embed/LzD7Fw18lQI" title="Videos cortos para tus videos #31 Hombre caminando al aire libre" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}