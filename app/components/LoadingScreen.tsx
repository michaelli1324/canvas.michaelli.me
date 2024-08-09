import { Loader } from "lucide-react";

const LoadingScreen = () => (
  <div className='loading-screen'>
    <div className='loading-content'>
      <Loader className='loading-spinner' size={48} />
      <p>Preparing your creative space...</p>
    </div>
  </div>
);

export default LoadingScreen;
