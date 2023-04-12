import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
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
