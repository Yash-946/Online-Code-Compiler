"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const SaveFile = ({ isOpen, onClose, onSave }) => {
    const [filenames, setFilenames] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // onSave(filename);
        // setFilename("");
        onClose();
    };

    if (!isOpen) return null;



    // To open the popup:
    {/* <button onClick={() => setIsPopupOpen(true)}>
  Open Popup
</button> */}

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-xl relative"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-foreground">
                        Enter File Name
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={filenames}
                            onChange={(e) => setFilenames(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                            placeholder="Enter file name"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <motion.button
                            type="button"
                            onClick={onClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 border border-input rounded-md text-sm font-medium text-foreground hover:bg-muted"
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!filenames.trim()}
                            className="px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

