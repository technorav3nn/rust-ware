import {
    createStyles,
    SegmentedControl,
    SegmentedControlProps,
} from "@mantine/core";
import { useStyles } from "./index.styles";

export function StyledSegmentedControl(props: SegmentedControlProps) {
    const { classes } = useStyles();
    return (
        <SegmentedControl
            radius="xl"
            size="sm"
            classNames={classes}
            color="blue"
            transitionTimingFunction="ease-in"
            {...props}
        />
    );
}
