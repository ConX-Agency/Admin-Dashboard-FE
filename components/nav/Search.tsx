import React from 'react';
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from '@/components/ui/command';
import { IconSearch } from "@tabler/icons-react";

interface SearchProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SearchBox: React.FC<SearchProps> = ({ open, onOpenChange }) => {
    // Toggle search dialog
    const toggleSearch = () => {
        onOpenChange(!open);
    };

    return (
        <div>
            {/* Desktop Clickable search element */}
            <div
                className="border border-neutral-300 dark:border-neutral-600 rounded-md p-2 py-1 w-max 
                flex flex-row cursor-pointer items-center dark:bg-neutral-800 bg-neutral-100 lg:flex xxxs:hidden"
                onClick={toggleSearch}
            >
                <IconSearch className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[14px] text-black dark:text-white">Search Anything Here...</span>
                <span className="ml-4 flex flex-row text-[12px] px-2 py-1 border bg-neutral-200 dark:bg-neutral-700 rounded-sm 
                text-black dark:text-white">
                    ⌘K
                </span>
            </div>

            {/* Mobile Clickable search element */}
            <div
                className="flex flex-row cursor-pointer items-center 
                    xxxs:flex lg:hidden h-[36px] w-[36px] justify-center"
                onClick={toggleSearch}
            >
                <IconSearch className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
            </div>

            {/* Search dialog */}
            <CommandDialog open={open} onOpenChange={onOpenChange}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
};

const Search: React.FC<SearchProps> = ({ open, onOpenChange }) => {
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);

    return <SearchBox open={open} onOpenChange={onOpenChange} />;
};

export default Search;
