const RelaxingVideo = () => {
  return (
    <div className="w-full h-[300px] relative overflow-hidden rounded-xl">
      <video
        className="w-full h-full object-cover"
        src="https://res.cloudinary.com/dv8q9lnuf/video/upload/v1748008191/relax_ede2pz.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default RelaxingVideo;