import { useState } from "react";
import { Button } from "@heroui/button";
import { Trash } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

interface DeleteClientButtonProps {
  itemId: number;
  onDeleteClient: (id: number) => Promise<void>;
}

export default function DeleteClientButton({ itemId, onDeleteClient }: DeleteClientButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDelete = async () => {
    console.log('Clicou em deletar para item:', itemId);
    setIsDeleting(true);
    try {
      await onDeleteClient(itemId);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setIsDeleting(false);
      setIsPopoverOpen(false);
    }
  };

  return (
    <Popover 
      isOpen={isPopoverOpen} 
      onOpenChange={setIsPopoverOpen}
      backdrop="blur" 
      placement="bottom-end" 
      showArrow={true}
    >
      <PopoverTrigger>
        <Trash 
          className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700" 
          onClick={() => {
            setIsPopoverOpen(true);
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Deseja deletar o cliente?</div>
          <div className="text-tiny">Esta ação é irreversível.</div>
          <div className="flex gap-2 justify-end mt-2 w-full">
            <Button 
              isLoading={isDeleting} 
              isDisabled={isDeleting} 
              fullWidth 
              color="danger" 
              variant="solid" 
              size="sm" 
              onPress={handleDelete}
            >
              {isDeleting ? '' : 'Deletar'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
