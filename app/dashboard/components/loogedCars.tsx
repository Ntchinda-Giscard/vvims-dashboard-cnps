import car_f from '@/public/assets/cars_f.svg'
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import { IconInfoHexagon, IconCar, IconUserShare, IconUsersGroup, IconChevronRight } from "@tabler/icons-react";
import cx from "clsx";
import { Poppins } from "next/font/google";
import { Paper, Group, Stack, Badge, ThemeIcon } from '@mantine/core';
import Image from "next/image";
import Link from "next/link"

const font_heading = Poppins({ subsets: ["latin"], weight:["400"] });

function LoogedCars() {
    return ( <>
    <Paper
        withBorder
        p={15}
        w={"100%"}
        radius="lg"
        h={"100%"}
    >
        <div className="flex flex-row justify-between items-center">
            <p className={cx([classes.titleCars])}> Recently Logged In Vehicles </p>
            <div className="flex flex-row items-center">
                    <Link href={"#"} style={{fontSize: 12, color: "blue", fontWeight: 300}}> view all </Link>
                    <IconChevronRight stroke={1} style={{width: 10, height: 10, color: "blue"}} />
                </div>

        </div>
        <div className={"flex flex-col gap-3"}>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
        </div>
        
    </Paper>

    </> );
}

export default LoogedCars;


function CardItem(){
    return(
        <div className="flex flex-row w-full  gap-3 items-center">
        {/* <Image src={car_f} alt={"image"} /> */}
        <ThemeIcon radius="md" size={'md'} color= {"#73B7F0"}>
            <IconCar color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
        </ThemeIcon>
        <div className={"flex flex-row w-full items-center justify-between"}>
            <div className="flex flex-col">
                <p  className={cx([classes.cmake, font_heading.className])}> toyota yaris</p>
                <p className={cx([classes.license, font_heading.className])}>sw 000 99</p>
            </div>
            <div className="flex flex-col">
                <p className={cx([classes.time, font_heading.className])}> 03 minute ago </p>
                <Badge variant="light" size="xs" color="blue" radius="md">Badge</Badge>
            </div>
        </div>
    </div>
    )  
}