import {
    Navbar as MantineNavbar,
    Stack,
    Tooltip,
    UnstyledButton,
} from "@mantine/core";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVBAR_TOP_ITEMS, NAVBAR_BOTTOM_ITEMS } from "./index.data";
import { useStyles } from "./index.styles";

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
            sx={(theme) => ({
                transform: hovered ? "translateX(100px)" : "",
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[0],
            })}
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
