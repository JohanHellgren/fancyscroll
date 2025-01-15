import ScrollyTellerItem, { ScrollyTellerItemProps } from "./ScrollyTellerItem";

export interface ScrollyTellerProps {
  scrollyItems: ScrollyTellerItemProps[];
}

const ScrollyTeller = ({ scrollyItems }: ScrollyTellerProps) => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center"><h1 className="text-center text-9xl font-bold text-[#143275]">SMOOTH STICKY SCROLL</h1></div>
      <div className="scrolly-teller scroll-smooth">
        {scrollyItems.map((item, index) => (
          <div>
            <ScrollyTellerItem {...item} />
            {index % 2 != 0 && <div className="h-screen flex items-center justify-center"><h1 className="text-center text-9xl font-bold text-[#143275]">DIVIDER</h1></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollyTeller;
