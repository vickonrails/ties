import { DialogProps } from "@radix-ui/react-dialog"
import { Connection } from "lib/types"
import { Button } from ".."
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../dialog"

const ConnectionDeleteModal = ({ open, onOpenChange, isDeleting = false, connection, onOk, ...rest }: DialogProps & { connection: Connection, onOk: () => void, isDeleting?: boolean }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
            <DialogContent>
                <DialogHeader className="mb-3">
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {connection?.fullname}?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant='outline' onClick={() => onOpenChange?.(false)}>Cancel</Button>
                    <Button loading={isDeleting} variant='destructive' onClick={() => onOk?.()}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectionDeleteModal