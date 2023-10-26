import { DialogProps } from "@radix-ui/react-dialog"
import { Button } from ".."
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../dialog"

const ConnectionDeleteModal = ({ open, onOpenChange, ...rest }: DialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
            <DialogContent>
                <DialogHeader className="mb-3">
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this connection
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant='outline' onClick={_ => onOpenChange?.(false)}>Cancel</Button>
                    <Button variant='destructive'>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectionDeleteModal