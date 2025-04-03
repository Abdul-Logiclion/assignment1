import { useState,useRef ,useEffect} from "react";
import CustomCheckbox  from "./Checkbox";
export default function PageSelectionModal() {
  
  const [marginTop, setMarginTop] = useState(-105); 

  const pages = ["Page 1", "Page 2", "Page 3", "Page 4", "Page 5", "Page 6"];
  const cardScrollThreshold = 50;
  const checkboxesScrollRef = useRef(null);

  const touchStartY = useRef(0); // Store initial touch Y position



  
  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault(); // Prevent default scroll behavior

      const contentElement = checkboxesScrollRef.current;
      if (!contentElement) return;

      const { scrollTop, scrollHeight, clientHeight } = contentElement;
      const isTopReached = scrollTop === 0;
      const isBottomReached = scrollTop + clientHeight === scrollHeight;

      // Allow card scrolling only when reaching top or bottom
      if (isTopReached || isBottomReached) {
        const scrollAmount = event.deltaY * 0.8; // Adjust multiplier for speed

        if (Math.abs(scrollAmount) > cardScrollThreshold) {
          setMarginTop((prevMargin) => {
            const newMarginTop = prevMargin - scrollAmount;
            return Math.max(-450, Math.min(newMarginTop, -105)); // Prevent overscrolling
          });
        }
      }
    };

    const handleWheel = (event) => {
      event.preventDefault(); // Prevent default scroll behavior

      if (checkboxesScrollRef.current) {
        const scrollAmount = event.deltaY * (event.deltaY > 0 ? 40 : 60); // Different speeds for up/down
        checkboxesScrollRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
      }
    };

    const handleTouchStart = (event) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault(); // Prevent default scroll behavior

      if (checkboxesScrollRef.current) {
        const touchMove = event.touches[0].clientY - event.touches[0].startY;
        checkboxesScrollRef.current.scrollBy({ top: touchMove, behavior: "smooth" });
      }
    };

    // Attach event listeners to window and scrollable element
    window.addEventListener("wheel", handleScroll, { passive: false });

    const scrollElement = checkboxesScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel, { passive: false });
      scrollElement.addEventListener("touchstart", handleTouchStart, { passive: true });
      scrollElement.addEventListener("touchmove", handleTouchMove, { passive: false });

    }

    // Cleanup function
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel);
        scrollElement.removeEventListener("touchstart", handleTouchStart);
        scrollElement.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white  ">
    
      <div
        style={{ marginTop: `${marginTop}px` }} 
        className={`w-[370px] sm:w-[400px] md:w-[500px] h-[326px] border-[1px border-[#EEEEEE]] rounded-[6px]
           bg-white pt-[10px] pb-[10px] flex flex-col font-montserrat text-[14px] leading-[130%] tracking-normal align-middle card-container`}

      >
         {/* Select All Section */}


         <CustomCheckbox title="All pages"/>
                {/* Divider */}

        <div className=" px-[15px] py-[10px]  ">
          <div className="border-t-[0.7px] border-[#CDCDCD]"></div>
        </div>

            {/* Pages List */}
        <div className="overflow-scroll no-scrollbar  cursor-pointer  h-[164px]"
        ref={checkboxesScrollRef}
        >
          {pages.map((page) => (
                     <CustomCheckbox title={page}/>
          ))}

        </div>

        {/* Divider */}
        <div className="px-[15px] py-[10px] h-[20px]">
          <div className="border-t-[0.7px] border-[#CDCDCD]"></div>
        </div>


       {/* Done Button */}

        <div className="px-[15px] py-[10px] h-[60px] ">

          <button className="w-full h-[40px] rounded-[4px] px-[10px] gap-[10px] py-[20px]
           bg-[#FFCE22] hover:bg-[#ffd84d]  
          flex items-center justify-center">
            Done
          </button>

        </div>
      </div>
    </div>
  );
}
