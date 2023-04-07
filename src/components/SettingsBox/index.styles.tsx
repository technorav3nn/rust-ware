import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.fn.lighten("gray", 0.11),

        [theme.fn.smallerThan("md")]: {
            minWidth: "90%",
        },
        [theme.fn.largerThan("md")]: {
            minWidth: "40%",
        },

        userSelect: "none",
        WebkitUserSelect: "none",
    },
    title: {
        lineHeight: 1,
    },
}));
