import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.fn.lighten("gray", 0.11),
    },

    item: {
        "& + &": {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        "& *": {
            cursor: "pointer",
        },
    },

    title: {
        lineHeight: 1,
    },
}));
