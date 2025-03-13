
const Tech = () => {
  return (
    <div>
      {/* Powered by Cutting-Edge Technology Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-9 lg:pb-4 mx-auto">
        {/* Title */}
        <div className="w-2/3 sm:w-1/2 lg:w-1/3 mx-auto text-center mb-6">
          <h2 className="text-gray-600">Powered by Cutting-Edge Technology</h2>
        </div>
        {/* End Title */}

        <div className="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
          {/* Intersystems IRIS */}
          <img
            alt="Intersystems IRIS"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
            src="/iris.svg"
            style={{ objectFit: 'contain' }}
          />

          {/* qwen */}
          <img
            alt="qwen"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
            src="/qwen.png"
            style={{ objectFit: 'contain' }}
          />

          {/* tensorflow */}
          <img
            alt="tensorflow"
            className="py-3 lg:py-5 w-32 h-auto md:w-36 lg:w-40 mx-auto sm:mx-0"
            src="/tensorflow.png"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tech;
