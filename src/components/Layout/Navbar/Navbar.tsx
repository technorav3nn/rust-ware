import {
    createStyles,
    Navbar as MantineNavbar,
    Stack,
    Tooltip,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { MdCode, MdSettings, MdTerminal, MdDescription } from "react-icons/md";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { HiPlay } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAVBAR_TOP_ITEMS, NAVBAR_BOTTOM_ITEMS } from "./index.data";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        opacity: 0.85,

        "&:hover": {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: "gray",
                }).background!,
                0.1
            ),
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
        },
    },
}));

interface NavbarLinkProps {
    icon: IconType;
    label: string;
    to?: string;
    iconSize?: number;
    onClick?: (e: React.MouseEvent) => void;
}

export const NavbarLink = ({
    icon: Icon,
    label,
    to,
    onClick,
    iconSize,
}: NavbarLinkProps) => {
    const { classes, cx } = useStyles();

    const [active, setActive] = useState(false);
    const [hovered, setHovered] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (onClick) {
            return;
        }
        if (to === location.pathname) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [to, location.pathname]);

    const NavButton = () => (
        <Tooltip
            label={label}
            position="right"
            color="gray"
            transitionProps={{ transition: "slide-right", duration: 200 }}
            sx={{
                transform: hovered ? "translateX(100px)" : "",
            }}
        >
            <UnstyledButton
                className={cx(classes.link, {
                    [classes.active]: active,
                })}
                onMouseEnter={() => setHovered(true)}
            >
                <Icon size={iconSize ?? 30} />
            </UnstyledButton>
        </Tooltip>
    );

    return onClick ? (
        <NavButton />
    ) : (
        <Link to={to!}>
            <NavButton />
        </Link>
    );
};

export const Navbar = () => (
    <div data-tauri-drag-region>
        <MantineNavbar
            width={{ base: 70 }}
            p="md"
            sx={() => ({
                alignItems: "center",
            })}
            pt={30}
        >
            <MantineNavbar.Section grow data-tauri-drag-region>
                <Stack justify="center" spacing={4}>
                    <div data-tauri-drag-region>
                        {NAVBAR_TOP_ITEMS.map((item, i) => (
                            <NavbarLink
                                icon={item.icon}
                                label={item.label}
                                to={item.to}
                                key={i}
                            />
                        ))}
                    </div>
                </Stack>
            </MantineNavbar.Section>
            <MantineNavbar.Section>
                <div data-tauri-drag-region />
                <Stack justify="center" spacing={4}>
                    {NAVBAR_BOTTOM_ITEMS.map((item, i) => (
                        <NavbarLink
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                            onClick={item.onClick}
                            key={i}
                        />
                    ))}
                </Stack>
            </MantineNavbar.Section>
        </MantineNavbar>
    </div>
);
