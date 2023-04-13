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
        backgroundImage: theme.fn.gradient({
            from: theme.colors.blue[5],
            to: theme.colors.blue[7],
        }),
    },

    control: {
        border: "0 !important",
    },

    label: {
        "&, &:hover": {
            "&[data-active]": {
                color: theme.white,
            },
        },
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
}));
