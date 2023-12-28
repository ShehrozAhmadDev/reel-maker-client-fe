import { useState } from "react";

const VideoUploadSection = () => {
  const [video, setVideo] = useState(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-white">Upload Video</h2>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <label
            htmlFor="videoUpload"
            className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg cursor-pointer"
          >
            {video ? (
              <video
                src={URL.createObjectURL(video)}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Upload
        </button>
      </div>
    </div>
  );
};

export default VideoUploadSection;
