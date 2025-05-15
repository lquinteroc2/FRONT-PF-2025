const RelaxingVideo = () => {
  return (
    <div className="w-full h-[300px] relative overflow-hidden rounded-xl">
      <video
        className="w-full h-full object-cover"
        src="/videos/relax.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default RelaxingVideo;