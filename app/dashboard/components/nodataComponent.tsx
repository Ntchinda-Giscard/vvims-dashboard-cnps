import { Button, ThemeIcon } from "@mantine/core";
import { IconArrowRight, IconExclamationMark } from "@tabler/icons-react";
import Link from "next/link";
import classes from "@/app/dashboard/components/css/dashboard.module.css";

function NoDataComponent({comment, link, button_msg}:any) {
    return ( <>
        <div className="flex flex-col w-full h-full items-center">
            <ThemeIcon radius="xl" size="xl">
                <IconExclamationMark style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <p className={classes.noDataTitle}> No Data </p>
            <p className={classes.noDataDesc}> {comment} </p>

            <Button
                component={Link}
                href={link}
                variant="light"
                rightSection={<IconArrowRight size={14} />}
                mt={10}
            >
                {button_msg}
            </Button>
        </div>
    </> );
}

export default NoDataComponent;