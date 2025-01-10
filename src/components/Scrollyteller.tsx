import ScrollyTellerItem, { ScrollyTellerItemProps } from "./ScrollyTellerItem";

export interface ScrollyTellerProps {
    scrollyItems: ScrollyTellerItemProps[];
}

const ScrollyTeller = ({scrollyItems}: ScrollyTellerProps) => {
return (
    <div className="scrolly-teller scroll-smooth">
        {scrollyItems.map((item) => (
            <ScrollyTellerItem {...item} />
        ))}
    </div>
)
}

export default ScrollyTeller;