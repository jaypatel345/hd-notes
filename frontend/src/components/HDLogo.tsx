// src/components/HDLogo.tsx
import logo from "../assets/icon.png";

const HDLogo = () => {
  return (
    <div className="absolute top-5 left-5 flex items-center space-x-2">
      <div className="flex items-center justify-center">
        <img src={logo} alt="HD Logo" className="w-[32px] h-[32px]" />
      </div>
      <span className="text-[#232323] font-semibold text-[24px]">HD</span>
    </div>
  );
};

export default HDLogo;