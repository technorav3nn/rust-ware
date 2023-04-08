import {
    createStyles,
    Navbar,
    Stack,
    Tooltip,
    UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { MdCode, MdSettings, MdTerminal, MdDescription } from "react-icons/md";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { HiPlay } from "react-icons/hi2";

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
            backgroundColor: theme.fn.variant({
                variant: "filled",
                color: "blue",
            }).background!,
        },
    },
}));

interface NavbarLinkProps {
    icon: IconType;
    label: string;
    to?: string;
    iconSize?: number;
    onClick?: () => void;
}

const NavbarLink = ({
    icon: Icon,
    label,
    to,
    onClick,
    iconSize,
}: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(false);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (onClick) {
            return;
        }
        if (to === router.pathname) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [to, router.pathname]);

    const NavButton = () => (
        <Tooltip
            label={label}
            position="right"
            color="blue"
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
        <Link href={to!}>
            <NavButton />
        </Link>
    );
};

export const AppNavbar = () => (
    <div data-tauri-drag-region>
        <Navbar
            width={{ base: 70 }}
            p="md"
            sx={(theme) => ({
                alignItems: "center",
            })}
            pt={30}
        >
            <Navbar.Section grow data-tauri-drag-region>
                <Stack justify="center" spacing={4}>
                    <div data-tauri-drag-region>
                        <NavbarLink icon={MdCode} label="Editor" to="/" />
                        <NavbarLink
                            icon={MdTerminal}
                            label="Console"
                            to="/console"
                        />
                        <NavbarLink
                            icon={MdDescription}
                            label="Scripts"
                            to="/scripts"
                        />
                    </div>
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <div data-tauri-drag-region />
                <Stack justify="center" spacing={4}>
                    <NavbarLink
                        icon={MdSettings}
                        label="Settings"
                        to="/settings"
                    />
                    {/* normal buttons, not links below */}
                    <NavbarLink
                        label="Execute"
                        onClick={() => {}}
                        iconSize={28}
                        icon={HiPlay}
                    />
                </Stack>
            </Navbar.Section>
        </Navbar>
    </div>
);
