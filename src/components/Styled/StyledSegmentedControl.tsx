import {
    createStyles,
    SegmentedControl,
    SegmentedControlProps,
} from "@mantine/core";

function rem(px: number) {
    return `${px / 16}rem`;
}

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        boxShadow: theme.shadows.lg,
        border: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[1]
        }`,
    },

    indicator: {
        backgroundColor: theme.fn.gradient({
            from: theme.colors.blue[5],
            to: theme.colors.pink[7],
        }),
    },

    label: {
        "&, &:hover": {
            "&[data-active]": {
                color: theme.white,
            },
        },
    },
}));

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
