import { useEffect } from "react";
import { AuthForm } from "../../components/LoginModal/AuthForm";
import { useAuthStore } from "../../store/auth";
import { invoke } from "@tauri-apps/api/tauri";
import { closeAllModals, openModal } from "@mantine/modals";
import { useRouter } from "next/router";

export function AuthLayout() {
    const openAuthModal = () => {
        openModal({
            title: "You must be authenticated to continue.",
            withCloseButton: false,
            closeOnClickOutside: false,
            closeOnEscape: false,
            centered: true,
            children: <AuthForm />,
        });
    };

    useEffect(() => {
        openAuthModal();
    }, []);

    return <></>;
}
