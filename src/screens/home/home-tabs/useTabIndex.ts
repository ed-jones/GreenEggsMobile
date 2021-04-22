import { useState } from "react";

export default function useTabIndex() {
    const [selectedIndex, onSelect] = useState(0);
    return { selectedIndex, onSelect };
}
