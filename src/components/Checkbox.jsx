import React, { useState } from 'react';

const CustomCheckbox = ({title}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle the checkbox state
  const handleCheckboxClick = (e) => {
    if (e && e.currentTarget)
    {
    e.currentTarget.style.cursor = "default";
    }
    setIsChecked(!isChecked);

  };


  // Handle hover state
  const handleMouseEnter = (e) => {
    if (e && e.currentTarget)
        {
    e.currentTarget.style.cursor = "pointer";
        }
    setIsHovered(true);
  };


  const handleMouseLeave = () => {
    setIsHovered(false);// Remove hover state
  };


  const fillColor=isChecked &&isHovered 
  ?'#5087f8' 
  :isChecked
  ?'#2469F6' 
  : 'white'

  const strokeColor = isChecked
  ? isHovered
    ? '#5087f8' // Hovered and checked
    : '#2469F6' // Checked but not hovered
  : isHovered
  ? '#AFAFAF' // Hovered and unchecked
  : '#CDCDCD'; // Default stroke color (unchecked)

  return (

    <div
      className="flex justify-between items-center pr-[15px] pl-[22px] py-[8px] group h-[42px]"
      onClick={(e)=>handleCheckboxClick(e)} // Toggle on click
      onMouseEnter={handleMouseEnter} // Hover enter
      onMouseLeave={handleMouseLeave} // Hover leave
    >

      <span className="font-montserrat">{title}</span>

      {/* Custom SVG Checkbox */}
      <div
        className={`w-[31px] h-[31px] cursor-pointer relative rounded-[6px] transition-all duration-300 group-hover:border-[#A2C5FF]`}
        onMouseEnter={(e)=>handleMouseEnter(e)} // Hover enter
        onMouseLeave={handleMouseLeave} // Hover leave
      >
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all"
        >

          {/* Background rectangle that changes when checked */}

          <rect
            x="3.5"
            y="3.5"
            width="23"
            height="23"
            rx="6"
            fill={fillColor}
            stroke={strokeColor} 
          />

          {/* Show the tick mark when checked */}
          {isChecked && (
            <path
              d="M7 15.6L13.0345 20.9672C13.055 20.9854 13.0863 20.9837 13.1047 20.9635L24 9"
              stroke="#FFFFFF" // White tick mark when checked
              strokeLinecap="round"
            />
          )}

          {/* Show  tick mark on hover if unchecked */}
          {!isChecked && isHovered && (
            <path
              d="M7 15.6L13.0345 20.9672C13.055 20.9854 13.0863 20.9837 13.1047 20.9635L24 9"
              stroke="#CDCDCD" // tick mark when unchecked and hovered
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default CustomCheckbox;
