import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
            theme.colorScheme === "dark" ? theme.white : theme.colors.dark[8],
        opacity: 0.85,

        "&:hover": {
            opacity: 1,
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
    },

    active: {
        opacity: 1,
        "&, &:hover": {
            backgroundImage: theme.fn.gradient({
                from: theme.colors.blue[8],
                to: theme.colors.blue[5],
                deg: 45,
            }),
            color: theme.white,
        },
    },
}));
