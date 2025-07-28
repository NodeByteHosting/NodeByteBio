import { Feature, DataCard } from "types/services"
import { MINECRAFT_FAQ } from "./mcFaqs";

import {
    Cpu,
    Database,
    Shield,
    HardDrive,
    MemoryStick,
    Globe,
    Settings,
    PlugIcon,
    Settings2Icon,
    TabletSmartphone,
    User
} from "lucide-react";

export const briefRustFeatures: Feature[] = [
    { text: "AMD Processor", icon: <Cpu /> },
    { text: "DDR4 RAM", icon: <MemoryStick /> },
    { text: "SSD Storage", icon: <HardDrive /> },
    { text: "BytePanel", icon: <Settings /> },
    { text: "Mod Supported", icon: <PlugIcon /> },
    {
        text: "FyfeWeb Net",
        icon: <Globe />,
        link: "https://fyfeweb.com /our-network"
    },
    { text: "10 Databases", icon: <Database /> },
    { text: "99.6% Uptime", icon: <Shield /> }
];

export const RUST_DATA_CARDS: DataCard[] = [
    {
        faqs: MINECRAFT_FAQ,
        title: "Starter",
        price: "£5.75 GBP",
        location: "Newcastle",
        featuresBrief: [...briefRustFeatures],
        featuresFull: [
            { text: "AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "8 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            {
                text: "FyfeWeb DDoS Protection",
                icon: <Shield />,
                link: "https://fyfeweb.com /our-network"
            },
            { text: "150GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "BytePanel ", icon: <Settings2Icon /> },
            { text: "Mod Support", icon: <PlugIcon /> },
            { text: "Rust+ Support", icon: <TabletSmartphone /> },
            { text: "Recommended for 40 Players", icon: <User /> },
            { text: "10 MySQL Databases", icon: <Database /> },
            { text: "99.6% Uptime SLA", icon: <Shield /> },
        ],
        link: "https://billing.nodebyte.host/store/minecraft-server-hosting",
        outOfStock: false,
        limitedQuantity: false,
        limitedTime: false,
        recommended: false,
        featured: false
    },
    {
        faqs: MINECRAFT_FAQ,
        title: "Standard",
        price: "£8.95 GBP",
        location: "Newcastle",
        featuresBrief: [...briefRustFeatures],
        featuresFull: [
            { text: "AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "12 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            {
                text: "FyfeWeb DDoS Protection",
                icon: <Shield />,
                link: "https://fyfeweb.com /our-network"
            },
            { text: "200GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "BytePanel ", icon: <Settings2Icon /> },
            { text: "Mod Support", icon: <PlugIcon /> },
            { text: "Rust+ Support", icon: <TabletSmartphone /> },
            { text: "Recommended for 75 Players", icon: <User /> },
            { text: "10 MySQL Databases", icon: <Database /> },
            { text: "99.6% Uptime SLA", icon: <Shield /> }
        ],
        link: "https://billing.nodebyte.host/store/minecraft-server-hosting",
        outOfStock: false,
        limitedQuantity: false,
        limitedTime: false,
        recommended: false,
        featured: false,
    },
    {
        faqs: MINECRAFT_FAQ,
        title: "Performance",
        price: "£12.75 GBP",
        location: "Newcastle",
        featuresBrief: [...briefRustFeatures],
        featuresFull: [
            { text: "AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "16 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            {
                text: "FyfeWeb DDoS Protection",
                icon: <Shield />,
                link: "https://fyfeweb.com /our-network"
            },
            { text: "250GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "BytePanel ", icon: <Settings2Icon /> },
            { text: "Mod Support", icon: <PlugIcon /> },
            { text: "Rust+ Support", icon: <TabletSmartphone /> },
            { text: "Recommended for 100 Players", icon: <User /> },
            { text: "10 MySQL Databases", icon: <Database /> },
            { text: "99.6% Uptime SLA", icon: <Shield /> }
        ],
        link: "https://billing.nodebyte.host/store/minecraft-server-hosting",
        outOfStock: false,
        limitedQuantity: false,
        limitedTime: false,
        recommended: false,
        featured: true,
    },
    {
        faqs: MINECRAFT_FAQ,
        title: "Premium",
        price: "£15.00 GBP",
        location: "Newcastle",
        featuresBrief: [...briefRustFeatures],
        featuresFull: [
            { text: "AMD Ryzen™ 9 5900X", icon: <Cpu /> },
            { text: "32 Gigabytes of DDR4 RAM", icon: <MemoryStick /> },
            {
                text: "FyfeWeb DDoS Protection",
                icon: <Shield />,
                link: "https://fyfeweb.com /our-network"
            },
            { text: "350GB NVMe Solid State Drive", icon: <HardDrive /> },
            { text: "1GB/s Network Speeds", icon: <Globe /> },
            { text: "BytePanel ", icon: <Settings2Icon /> },
            { text: "Mod Support", icon: <PlugIcon /> },
            { text: "Rust+ Support", icon: <TabletSmartphone /> },
            { text: "Recommended for 200 Players", icon: <User /> },
            { text: "10 MySQL Databases", icon: <Database /> },
            { text: "99.6% Uptime SLA", icon: <Shield /> }
        ],
        link: "https://billing.nodebyte.host/store/minecraft-server-hosting",
        outOfStock: false,
        limitedQuantity: false,
        limitedTime: false,
        recommended: false,
        featured: false,
    }
];

