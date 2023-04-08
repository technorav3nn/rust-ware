import { Box, Button, Center, Paper, Transition } from "@mantine/core";
import { useState } from "react";
import ScriptLibraryTab from "../components/Scripts/ScriptLibraryTab";
import { StyledSegmentedControl } from "../components/Styled/StyledSegmentedControl";
import { AnimatePresence, motion } from "framer-motion";

function Scripts() {
    const [tab, setTab] = useState("library");

    return (
        <>
            <Center>
                <StyledSegmentedControl
                    data={[
                        { label: "Library", value: "library" },
                        { label: "Saved Scripts", value: "saved-scripts" },
                    ]}
                    onChange={setTab}
                    mt={"sm"}
                    color="blue"
                    value={tab}
                />
            </Center>
            {tab === "library" && <ScriptLibraryTab />}
            {tab === "saved-scripts" && (
                <AnimatePresence>
                    <motion.div
                        key="detail"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={{
                            initial: {
                                opacity: 0,
                            },
                            in: {
                                opacity: 1,
                                transition: {
                                    opacity: {
                                        duration: 0.4,
                                        // delay: 0.4,
                                    },
                                },
                            },
                            out: {
                                opacity: 0,
                                transition: {
                                    opacity: {
                                        duration: 0.4,
                                    },
                                },
                            },
                        }}
                    >
                        Sex
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}

export default Scripts;
