import React from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { IconGps } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface SearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchBox: React.FC<SearchProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  // Toggle search dialog
  const toggleSearch = () => {
    onOpenChange(!open);
  };

  return (
    <div className="w-[36px]">
      <Button
        variant="ghost"
        size="icon"
        className="flex cursor-pointer flex-row items-center justify-center dark:hover:bg-neutral-700 lg:mr-2"
        onClick={toggleSearch}
      >
        <IconGps className="h-full w-full flex-shrink-0 text-black dark:text-white" />
      </Button>

      {/* Search dialog */}
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                router.push('/clients/manage-clients'); // Ensure navigation completes
                onOpenChange(false); // Then close the dialog
              }}
            >
              Manage Clients
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/influencers/manage-influencers'); // Ensure navigation completes
                onOpenChange(false); // Then close the dialog
              }}
            >
              Manage Influencers
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/campaigns/all-campaigns'); // Ensure navigation completes
                onOpenChange(false); // Then close the dialog
              }}
            >
              All Campaigns
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/campaigns/pending-services'); // Ensure navigation completes
                onOpenChange(false); // Then close the dialog
              }}
            >
              Pending Services
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

const Search: React.FC<SearchProps> = ({ open, onOpenChange }) => {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return <SearchBox open={open} onOpenChange={onOpenChange} />;
};

export default Search;
