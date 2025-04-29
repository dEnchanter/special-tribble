import useMediaQuery from '@/hooks/useMediaQuery';
import { ReactNode } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Drawer, DrawerContent } from '../ui/drawer';


type CustomDialogProps = {
  open: boolean;
  toggleOpen: () => void;
  children: ReactNode;  // Accept any React node as children
  dialogWidth?: string;  // Optional width for the dialog
};

const CustomDialog = ({ open, toggleOpen, children, dialogWidth = 'sm:max-w-[425px]' }: CustomDialogProps) => {

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className={`bg-white overflow-y-auto scrollbar-hide max-h-[80vh] w-full max-w-4xl ${dialogWidth}`}>
        {children}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={toggleOpen}>
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDialog;
