import { Badge, Group, Paper, ThemeIcon } from '@mantine/core'
import Image from 'next/image'
import { ReactElement } from 'react'
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { IconInfoHexagon, IconCalendar, IconUserShare, IconUsersGroup } from "@tabler/icons-react";

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });
const font_amnt = Poppins({ subsets: ["latin"], weight:["700"] });
const font_perc = Poppins({ subsets: ["latin"], weight:["400"] });

interface dashboard_card{
    title: string
    amount: number
    perc: number
    bg_img: string
    img: string
}

const data = [
    { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: 0 },
    { icon: IconCalendar, title: "Total Request", desc: "Total leave of current month", value: 0},
    { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 0 },
    // { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: 4 },
];

function CardDashboard({title, amount, perc, bg_img, img}: dashboard_card) {
    return ( <>
        <div className="flex flex-col md:flex-row gap-2">
        {
            data.map((item, index) => (
                <div key={item?.desc} className={classes.card}>
                    <div className="flex flex-row justify-between items-center">
                        <ThemeIcon radius="xl" size="lg" color="rgba(247, 247, 247, 1)">
                            <item.icon color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
                        </ThemeIcon>
                        <span className={classes.value}> {item?.value} </span>
                    </div>
                    <div className="flex flex-col">
                        <p className={classes.title}> {item?.title} </p>
                        <p className={classes.desc}> {item?.desc} </p>
                    </div>
                </div>
            ))
        }
    </div>

    </> );
}

export default CardDashboard;