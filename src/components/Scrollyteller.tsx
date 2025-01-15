import ScrollyTellerItem, { ScrollyTellerItemProps } from "./ScrollyTellerItem";

export interface ScrollyTellerProps {
  scrollyItems: ScrollyTellerItemProps[];
}

const ScrollyTeller = ({ scrollyItems }: ScrollyTellerProps) => {
  return (
    <div>
      <div className="h-screen"><h1 className="text-center text-9xl font-bold ">SMOOTH STICKY SCROLL</h1></div>
      <div className="scrolly-teller scroll-smooth">
        {scrollyItems.map((item) => (
          <ScrollyTellerItem {...item} />
        ))}
      </div>
    </div>
  );
};

export default ScrollyTeller;
