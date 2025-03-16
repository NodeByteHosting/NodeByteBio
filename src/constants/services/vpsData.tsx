import { DataCard, DataItem } from "types/services";
import { VPS_FAQ } from "./vpsFaqs";

import {
    Cpu,
    Shield,
    HardDrive,
    MemoryStick,
    Globe,
    Settings,
    LineChart
} from "lucide-react";

export const VPS_DATA_ITEMS_MARQUEE: DataItem[] = [
    { title: "Ubuntu" },
    { title: "Debian" },
    { title: "CentOS" },
    { title: "Fedora" },
    { title: "Windows Server" },
];

export const VPS_DATA_CARDS: DataCard[] = [
    {
        faqs: VPS_FAQ,
        title: "Small",
        price: "£9.25 GBP",
        location: "Newcastle",
        link: "https://billing.nodebyte.host/store/vps-hosting",
        featuresBrief: [
            { text: "AMD Processor", icon: <Cpu /> },
            { text: "DDR4 RAM", icon: <MemoryStick /> },
            { text: "FyfeWeb DDOS", icon: <Shield /> },
            { text: "SSD Storage", icon: <HardDrive /> },
            { text: "Intuitive Panel", icon: <Settings /> },
            { text: "99.6% Uptime", icon: <LineChart /> },
        ],
        featuresFull: [
            { text: "2 vCPU Core AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "4 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            { text: "FyfeWeb DDoS Protection", icon: <Shield />, link: "https://fyfeweb.com/our-network" },
            { text: "64GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "Virtualizor Control Panel ", icon: <Settings /> },
        ],
        marqueeItems: [...VPS_DATA_ITEMS_MARQUEE],
        outOfStock: false,
        stockCount: 4,
        limitedQuantity: true,
        limitedTime: false,
        recommended: false,
        featured: false
    },
    {
        faqs: VPS_FAQ,
        title: "Meduim",
        price: "£13.75 GBP",
        location: "Newcastle",
        link: "https://billing.nodebyte.host/store/vps-hosting",
        featuresBrief: [
            { text: "AMD Processor", icon: <Cpu /> },
            { text: "DDR4 RAM", icon: <MemoryStick /> },
            { text: "FyfeWeb DDOS", icon: <Shield /> },
            { text: "SSD Storage", icon: <HardDrive /> },
            { text: "Intuitive Panel", icon: <Settings /> },
            { text: "99.6% Uptime", icon: <LineChart /> },
        ],
        featuresFull: [
            { text: "3 vCPU Core AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "6 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            { text: "FyfeWeb DDoS Protection", icon: <Shield />, link: "https://fyfeweb.com/our-network" },
            { text: "96GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "Virtualizor Control Panel ", icon: <Settings /> },
        ],
        marqueeItems: [...VPS_DATA_ITEMS_MARQUEE],
        outOfStock: false,
        stockCount: 4,
        limitedQuantity: true,
        limitedTime: false,
        recommended: true,
        featured: false
    },
];
