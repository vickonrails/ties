import { DialogProps } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../dialog"

const ConnectionDeleteModal = ({ open, ...rest }: DialogProps) => {
    return (
        <Dialog open={open} {...rest}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this connection
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectionDeleteModal