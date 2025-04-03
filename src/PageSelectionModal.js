import { useState,useRef ,useEffect} from "react";

export default function PageSelectionModal() {
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectAllPages,setSelectAllPages]=useState(false)
  const [marginTop, setMarginTop] = useState(-105); 

  const pages = ["Page 1", "Page 2", "Page 3", "Page 4", "Page 5", "Page 6"];
  const cardScrollThreshold = 50;
  const checkboxesScrollRef = useRef(null);

  const touchStartY = useRef(0); // Store initial touch Y position

  const Checkmark = () => (
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="23" height="23" rx="6" fill="#5087F8"/>
<path d="M3.68 11.592L9.22879 16.5272C9.24925 16.5454 9.28055 16.5437 9.29899 16.5235L19.32 5.52" stroke="white" stroke-linecap="round"/>
</svg>

);


  const checkboxesClasses = `
  appearance-none w-[23px] h-[23px] rounded-[6px] border cursor-pointer transition relative

  /* Unchecked State */
  group-hover:border-[#E3E3E3]

  /* Checked State */
  checked:bg-[#2469f6] checked:border-[#2469f6]

  /* Before: Extra Checkmark Hover Effect */
  before:absolute before:content-['✓']
   before:invisible before:text-[20px] before:text-[#E3E3E3] 
  before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
  group-hover:before:visible

  /* Remove Hover Effect Once Checked */
  checked:group-hover:before:invisible

  /* After: Main Checkmark */
  after:absolute after:content-['✓'] 
  after:invisible after:text-[20px] after:text-white 
  after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
  checked:after:visible

  /* Checked Hover Effect */
  checked:group-hover:bg-[#5087f8] group-hover:checked:border-[#5087f8]
`;


    // Toggle selection of individual pages
  const togglePage = (page,e) => {

    e.currentTarget.style.cursor = "default";
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

 // Toggle "All pages" selection
  const handleClick = (item,e) => {
    e.currentTarget.style.cursor = "default";
   
    setSelectAllPages(!selectAllPages);
    
  };

  
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
       className={`w-[370px] h-[326px] border-[1px border-[#EEEEEE]] rounded-[6px] bg-white pt-[10px]
         pb-[10px] flex flex-col font-montserrat text-[14px]  leading-[130%] tracking-normal align-middle 
          card-container `}
      >
         {/* Select All Section */}

        <div  
         className={`flex justify-between items-center pr-[15px] 
          pl-[22px] py-[8px] group h-[42px]` }
        
         onClick={(e) => handleClick("all-pages",e)// Makes the whole item clickable
         }
         onMouseEnter={(e) => e.currentTarget.style.cursor ="pointer"}
         name="all-pages"
         >
          <span className="font-normal">All pages</span>
          <input
            type="checkbox"
            name={"all-pages"}
            checked={selectAllPages}
            onChange={() => setSelectAllPages(!selectAllPages)}
            className={checkboxesClasses}
          />

        </div>
                {/* Divider */}

        <div className=" px-[15px] py-[10px] ">
          <div className="border-t-[0.7px] border-[#CDCDCD]"></div>
        </div>

            {/* Pages List */}
        <div className="overflow-scroll no-scrollbar  cursor-pointer  h-[164px]"
        ref={checkboxesScrollRef}
        >
          {pages.map((page) => (
            <div
            name={page}
            key={page} 
            className=" flex justify-between items-center last:border-none
             h-[42px] mt-[-1px] ml-[-1px]  pr-[15px] pl-[22px] py-[8px] rounded-lg group"

              onClick={(e) => togglePage(page,e)} // Makes the whole item clickable

              onMouseEnter={(e) => e.currentTarget.style.cursor ="pointer"}
            >
              <span>{page}</span>
              <input
                type="checkbox"
                name={page}
                onChange={() => togglePage(page)}
                checked={selectedPages.includes(page)}
                onClick={() => togglePage(page)}

                className={checkboxesClasses}
              />

            </div>
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
